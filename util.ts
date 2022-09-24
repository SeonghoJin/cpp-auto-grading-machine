
import { makeTry } from "ts-try-catch-wrap";
import { access, mkdir, readdir, rmdir, rm, rename, readFile } from 'fs/promises';
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { config } from './config';
import AdmZip from 'adm-zip';
import glob from 'glob';

export const run = makeTry(promisify(exec));
export const findFiles = promisify(glob);
export const tryAccess = makeTry(access);
export const tryMkdir = makeTry(mkdir);
export const removeFile = makeTry(rm);
export const moveFile = makeTry(rename);
export const tryRm = makeTry(rm);
export const read = makeTry(readFile);
export const br = () => console.log('========================================');

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

    await Promise.allSettled(folders.map(async (folder) => {
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

    await Promise.allSettled(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;
        if (isAssignSubmissionFile(folder)) {
            await makeTry(async () => {
                const file = await readdir(`${folderPath}`);
                const filePath = `${folderPath}/${file}`;
                const zip = new AdmZip(filePath);
                await zip.extractAllTo(folderPath);
                console.log(`unzip ${folderPath}`);;
                await rm(filePath);
                console.log(`remove ${folderPath}`);
            })();
        }
    }))
});

export const moveAllCppFiles = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.allSettled(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;
        const files = [
            ...await findFiles(`${folderPath}/**/*.cpp`),
            ...await findFiles(`${folderPath}/**/*.h`),
            ...await findFiles(`${folderPath}/**/*.c`)
        ];

        await Promise.allSettled(files.map(async (file) => {
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

    await Promise.allSettled(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;

        const items = await readdir(folderPath);

        await Promise.allSettled(items.map(async (item) => {
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
    const hasNotCppFile = files.map(isCppFile).filter(isCpp => !isCpp).length > 0;
    if (hasNotCppFile) {
        throw new Error(`${foldername} has not cpp file`);
    }

    const compiler = 'g++';
    const buildFilename = `${foldername}/${config.BUILD_EXE_FILE}`
    const args = `-o ${buildFilename} -std=c++14`;
    const targetFiles = files.map((file) => `${foldername}/${file}`);
    const command = `${compiler} ${args} ${targetFiles.join(' ')}`;
    console.log(`build ${command}`);
    const result = await run(command);

    if (result.hasError) {
        console.log(`build fail command = ${command}`);
        console.log(`error`);
        console.log(result.err);

        return {
            result: 'fail',
            filename: foldername
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
                filename: path
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
        console.log(`test fail: because bad output file path`);
        return {
            input: inputFilePath,
            output: outputFilePath,
            result: 'fail',
            filename: buildFilePath
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
            filename: buildFilePath
        }
    }

    const test = formatString(result.stdout.toString());
    const answer = formatString(readOutputRes.result.toString())

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
        filename: buildFilePath
    }
});

export const formatString = (value: string) => {
    return value.replace(/(\s*)/g, "").replace(/\n|\r|\s*/g, "");
}

export const test = async (filePath: string) => {
    const inputFolderPath = `./${filePath}/${config.INPUT_FOLDER_NAME}`;
    const outputFolderPath = `./${filePath}/${config.OUTPUT_FOLDER_NAME}`;

    const inputFiles = await (await readdir(inputFolderPath)).filter(path => path[0] !== '.');
    const outputFiles = await (await readdir(outputFolderPath)).filter(path => path[0] !== '.');
    if (inputFiles.length !== outputFiles.length) {
        console.log(inputFiles);
        console.log(outputFiles);
        throw new Error('not match input and ouput');
    }

    const testFolders = (await readdir(`./${filePath}`)).map(file => {
        return `./${filePath}/${file}/${config.BUILD_EXE_FILE}`;
    }).filter(isAssignSubmissionFile);

    return await Promise.all(testFolders.map(async (testFolder) => {
        const result = await Promise.all(inputFiles.map(async (_, index) => {
            return await makeTry(async () => {
                const inputFilePath = `${inputFolderPath}/${inputFiles[index]}`;
                const outputFilePath = `${outputFolderPath}/${outputFiles[index]}`;
                if (inputFilePath == undefined || outputFilePath == undefined) {
                    throw new Error('input or output file path is undefined');
                }

                return await unit(testFolder, inputFilePath, outputFilePath)
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
            filename: testFolder
        };
    }));
}
