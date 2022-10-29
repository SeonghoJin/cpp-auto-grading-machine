
import { makeTry } from "ts-try-catch-wrap";
import { access, mkdir, readdir, rmdir, rm, rename, readFile } from 'fs/promises';
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { config } from './config';
import AdmZip from 'adm-zip';
import glob from 'glob';
import { attendance } from "./attendance";
import { writeFileSync } from "fs";

export const run = makeTry(promisify(exec));
export const findFiles = promisify(glob);
export const tryAccess = makeTry(access);
export const tryMkdir = makeTry(mkdir);
export const removeFile = makeTry(rm);
export const moveFile = makeTry(rename);
export const tryRm = makeTry(rm);
export const read = makeTry(readFile);
export const br = () => console.log('========================================');
const BUILD_FAIL_LOG = 'build-fail.log';
const TEST_FAIL_LOG = 'test-fail.log';
const EMPTY_TEST_CASE_LOG = 'empty-test-case.log';

export const isOnlineTextFolder = (filename: string) => {
    return filename.includes('onlinetext')
}

export const isAssignSubmissionFile = (filename: string) => {
    return filename.includes('_assignsubmission_file_');
}

export const hasCodeProperty = (obj: any): obj is { code: string } => {
    return typeof obj.code === 'string';
}

export const removeAllOnlineTextFolder = makeTry(async (foldername: string) => {
    const folders = await readdir(foldername);

    await Promise.all(folders.map(async (folder) => {
        if (isOnlineTextFolder(folder)) {
            await makeTry(async () => {
                const path = `./${foldername}/${folder}`;
                console.log(`remove ${path}`);
                await rmdir(path, {
                    recursive: true
                });
            })();
        }
    }));
});

export const unZipAssignSubmission = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.all(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;
        if (isAssignSubmissionFile(folder)) {
            await makeTry(async () => {
                const file = await readdir(`${folderPath}`);
                const filePath = `${folderPath}/${file}`;
                const zip = new AdmZip(filePath);
                zip.extractAllTo(folderPath);
                console.log(`unzip ${folderPath}`);;
                await rm(filePath);
                console.log(`remove ${filePath}`);
            })();
        }
    }))
});

export const moveAllCppFiles = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.all(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;
        const files = [
            ...await findFiles(`${folderPath}/**/*.cpp`),
            ...await findFiles(`${folderPath}/**/*.h`),
            ...await findFiles(`${folderPath}/**/*.c`)
        ];

        await Promise.all(files.map(async (file) => {
            const filename = file.split('/').at(-1);
            if (filename == undefined) {
                console.error(`filename is undefinend #e001`);
                return;
            }

            console.log(`move ${file} ${filename}`);
            await moveFile(file, `${folderPath}/${filename}`);
        }));
    }));
});

export const removeAllFolders = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.all(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;

        const items = await readdir(folderPath);

        await Promise.all(items.map(async (item) => {
            if (!isCppFile(item) && isAssignSubmissionFile(folderPath)) {
                const path = `${folderPath}/${item}`;
                console.log('remove ' + path);
                const { hasError, err } = await tryRm(`${path}`, {
                    recursive: true
                });

                if (hasError) {
                    console.log(`remove fail ${path}`);
                    console.error(err);
                    console.log('continue remove job');
                }
            }
        }));
    }));
});

export const buildCpp = makeTry(async (foldername) => {
    const files = await readdir(foldername);

    const compiler = 'g++';
    const buildFilename = `${foldername}/${config.BUILD_EXE_FILE}`
    const args = `-o ${buildFilename} -std=c++14`;
    const targetFiles = files.filter((file) => {
        const extension = file.split('.').at(-1);
        if (extension === 'cpp') {
            return true;
        }

        if (extension === 'c') {
            return true;
        }

        return false;
    }).map((file) => `${foldername}/${file}`);
    const command = `${compiler} ${args} ${targetFiles.join(' ')}`;
    console.log(`build ${command}`);
    const result = await run(command);

    if (result.hasError) {
        console.log(`build fail command = ${command}`);
        console.log(`error`);
        console.log(result.err);

        return {
            result: 'fail',
            filename: foldername,
            reason: (result.err as any).stderr ?? ''
        };
    }

    console.log(`build success ${foldername}`);
    return {
        result: 'success',
        filename: foldername
    }
})

export const buildFiles = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    return await Promise.all(folders.map(async (folder) => {
        const path = `./${foldername}/${folder}`;
        const result = await buildCpp(`${path}`);

        if (result.hasError) {
            return {
                result: 'fail',
                filename: path,
                reason: result.err
            }
        }

        return result.result;
    }));
})

export const isCppFile = (filename: string) => {
    const extension = filename.split('.').at(-1);

    return extension === 'cpp' || extension === 'c' || extension === 'h'
}

export const unit = makeTry(async (buildFilePath: string, inputFilePath: string, outputFilePath: string) => {
    const readOutputRes = await read(outputFilePath, 'utf-8');

    if (readOutputRes.hasError) {
        return {
            input: inputFilePath,
            output: outputFilePath,
            result: 'fail',
            filename: buildFilePath,
            reason: `test fail: because bad output file path`
        }
    }

    const { result, err, hasError } = await run(`${buildFilePath} < ${inputFilePath}`);
    if (hasError || result.stderr !== '') {
        console.log(`test fail ${buildFilePath} ${inputFilePath}`);
        console.log(err);
        return {
            input: inputFilePath,
            output: outputFilePath,
            result: 'fail',
            filename: buildFilePath,
            reason: `test fail ${buildFilePath} ${inputFilePath}\n${err}`
        }
    }

    const test = formatString(result.stdout.toString());
    const answer = formatString(readOutputRes.result.toString())

    console.log('test start');
    console.log(`${buildFilePath} ${inputFilePath} ${outputFilePath}`);
    console.log(`user output: ${test}`);
    console.log(`answer output: ${answer}`);

    if (test === answer) {
        console.log(`test success ${buildFilePath} ${inputFilePath}`);
        return {
            input: inputFilePath,
            output: outputFilePath,
            result: 'success',
            filename: buildFilePath
        }
    }

    console.log(`test fail ${buildFilePath} ${inputFilePath}`);

    return {
        input: inputFilePath,
        output: outputFilePath,
        result: 'fail',
        filename: buildFilePath,
        reason: `input: ${inputFilePath}\noutput: ${outputFilePath}\n__user: ${test}\nanswer: ${answer}\n\n`
    }
});

export const formatString = (value: string) => {
    return value.replace(/(\s*)/g, "").replace(/\n|\r|\s*/g, "").toLowerCase();
}

export const extractHangul = (value: string) => {
    return value.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi, "");
}

export const removeHangul = (value: string) => {
    return value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
}

export const runTestCase = async (exeFilePath: string, inputFolderPath: string, outputFolderPath: string) => {
    const inputFiles = (await readdir(inputFolderPath)).filter(path => path[0] !== '.');
    const outputFiles = (await readdir(outputFolderPath)).filter(path => path[0] !== '.');

    if (inputFiles.length !== outputFiles.length) {
        console.log(inputFiles);
        console.log(outputFiles);
        throw 'not match input and ouput';
    }

    const result = await Promise.all(inputFiles.map(async (_, index) => {
        return await makeTry(async () => {
            const inputFilePath = `${inputFolderPath}/${inputFiles[index]}`;
            const outputFilePath = `${outputFolderPath}/${outputFiles[index]}`;
            if (inputFilePath == undefined || outputFilePath == undefined) {
                throw 'input or output file path is undefined';
            }
            return await unit(exeFilePath, inputFilePath, outputFilePath)
        })();
    }));

    const isFail = result.reduce((before, res) => {
        if (before === true) {
            return true;
        }
        if (res.hasError) {
            return true;
        }
        if (res.result.result?.result !== 'success') {
            return true;
        }
        return false;
    }, false);

    return {
        result: !isFail,
        filename: exeFilePath,
        reason: result.map(res => res.result?.result?.reason).join('\n\n')
    };
}

export const test = async (filePath: string) => {
    const inputFolderPath = `./${config.INPUT_FOLDER_NAME}`;
    const outputFolderPath = `./${config.OUTPUT_FOLDER_NAME}`;

    const testFolders = (await readdir(`./${filePath}`)).map(file => {
        return `./${filePath}/${file}/${config.BUILD_EXE_FILE}`;
    }).filter(isAssignSubmissionFile);

    return await Promise.all(testFolders.map(async (testFolder) => {
        return await runTestCase(testFolder, inputFolderPath, outputFolderPath);
    }));
}

export const formatMultiTest = async (folderName: string, testFolderNames: string[]) => {
    const folders = await (await readdir(folderName)).filter(isAssignSubmissionFile);

    await Promise.all(folders.map(async (folder) => {
        const testCasesPath = `${folderName}/${folder}`;

        await Promise.all(testFolderNames.map(async (testFolderName) => {

            const testCaseFolder = await findFiles(`${testCasesPath}/*/**/${testFolderName}`);

            if (testCaseFolder.length !== 1) {
                return;
            }

            console.log('move folder', testCaseFolder[0], `${testCasesPath}/${testFolderName}`);
            await moveFile(testCaseFolder[0], `${testCasesPath}/${testFolderName}`);
        }));
    }));
}

export const removeAllExcludeTestFolder = async (folderName: string, testFolderNames: string[]) => {
    const folders = await (await readdir(folderName)).filter(isAssignSubmissionFile);

    await Promise.all(folders.map(async (folder) => {
        const testCasesPath = `${folderName}/${folder}`;
        const testCaseFolders = await readdir(testCasesPath);

        await Promise.all(testCaseFolders.map(async (testCaseFolder) => {
            if (testFolderNames.includes(testCaseFolder) === false) {
                const folder = `./${testCasesPath}/"${testCaseFolder}"`
                console.log('remove folder', folder);
                const command = `rm -rf ${folder}`;
                const result = await run(command);
                console.log(command);
                console.log(result.err);
            }
        }));
    }));
}

export const checkTestCases = async (folderName: string, testFolderNames: string[]) => {
    const folders = await (await readdir(folderName)).filter(isAssignSubmissionFile);

    const result = await Promise.all(folders.map(async (folder) => {
        const testCasesPath = `${folderName}/${folder}`;
        const testCaseFolders = await readdir(testCasesPath);

        const hasAllTestCases = testFolderNames.filter(folderName => {
            return !testCaseFolders.includes(folderName);
        });

        return {
            hasAllTestCases: hasAllTestCases.length === 0,
            folderName: folder,
            emptyTestCases: hasAllTestCases,
            path: testCasesPath
        }
    }));

    return result;
}

export const buildTestCases = async (path: string) => {
    const testCasesFolders = await readdir(path);
}

export const makeBuildFailLog = (buildFails: {
    result: string;
    filename: any;
    reason?: undefined;
}[]) => {
    const buffer: string[] = [];
    try {
        buildFails.forEach(fail => {
            const studentName = extractHangul(fail.filename).normalize('NFC');
            const maskedStudentName = maskingName(studentName);
            const studentNumber = maskingStudentNumber(attendance?.[studentName] ?? 123456);

            buffer.push(`학생이름: ${maskedStudentName}\n학번: ${studentNumber}`);
            buffer.push(`빌드 실패 이유:`);
            buffer.push(removeHangul((fail?.reason ?? '').normalize('NFC')));
            buffer.push('---------------------------');
        })
        writeFileSync(`${config.UNSAFE__FOLDER__NAME__HARD__CODE}/${BUILD_FAIL_LOG}`, buffer.join('\n'));
    } catch (e) {
        console.log(e);
    }
}

export const maskingNameIfLengthIsThree = (name: string) => {
    if (name.length !== 3) {
        console.log([...name]);
        console.log(name.trim());
        console.log(name.length);
        throw 'length is not three';
    }

    const maskedName = [...name];
    maskedName[0] = '*';
    maskedName[2] = '*';
    return maskedName.join('');
}

export const maskingName = (name: string) => {

    if (name.length == 2) {
        name += '*';
    }

    return maskingNameIfLengthIsThree(name);
}

export const maskingStudentNumber = (studentNumber: number) => {
    const str = studentNumber.toString();
    const maskedStr = [...str];

    maskedStr[0] = '*';
    maskedStr[1] = '*';
    maskedStr[5] = '*';

    return maskedStr.join('');
}

export const makeTestFailLog = async (testFails: {
    result: boolean;
    filename: string;
    reason: string;
}[]) => {
    const buffer: string[] = [];
    try {
        testFails.forEach(fail => {
            const studentName = extractHangul(fail.filename).normalize('NFC');
            const maskedStudentName = maskingName(studentName);
            const studentNumber = maskingStudentNumber(attendance?.[studentName] ?? 123456);

            buffer.push(`학생이름: ${maskedStudentName}\n학번: ${studentNumber}`);
            buffer.push(`테스트 실패 이유:`);
            buffer.push(removeHangul((fail?.reason ?? '').normalize('NFC')));
            buffer.push('---------------------------');
        })

        writeFileSync(`${config.UNSAFE__FOLDER__NAME__HARD__CODE}/${TEST_FAIL_LOG}`, buffer.join('\n'));
    } catch (e) {
        console.log(e);
    }
}

export const makeEmptyTestCaseLog = async (emptyTestCases: {
    hasAllTestCases: boolean;
    folderName: string;
    emptyTestCases: string[];
    path: string;
}[]) => {
    const buffer: string[] = [];
    try {
        emptyTestCases.forEach(empty => {
            const studentName = extractHangul(empty.folderName).normalize('NFC');
            const maskedStudentName = maskingName(studentName);
            const studentNumber = maskingStudentNumber(attendance?.[studentName] ?? 123456);

            buffer.push(`학생이름: ${maskedStudentName}\n학번: ${studentNumber}`);
            buffer.push(`없는 테스트 케이스: `);
            buffer.push(removeHangul((empty.emptyTestCases.join('\n')).normalize('NFC')));
            buffer.push('---------------------------');
        })

        writeFileSync(`${config.UNSAFE__FOLDER__NAME__HARD__CODE}/${EMPTY_TEST_CASE_LOG}`, buffer.join('\n'));
    } catch (e) {
        console.log(e);
    }
}