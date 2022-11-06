
import { makeTry } from "ts-try-catch-wrap";
import { access, mkdir, readdir, rmdir, rm, rename, readFile } from 'fs/promises';
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { config } from './config';
import AdmZip from 'adm-zip';
import glob from 'glob';
import { buildCpp } from "./buildCpp";
import { runTestCase } from "./runTestCase";

export const run = makeTry(promisify(exec));
export const findFiles = promisify(glob);
export const tryAccess = makeTry(access);
export const tryMkdir = makeTry(mkdir);
export const removeFile = makeTry(rm);
export const moveFile = makeTry(rename);
export const tryRm = makeTry(rm);
export const read = makeTry(readFile);
export const br = () => console.log('========================================');
export const BUILD_FAIL_LOG = 'build-fail.log';
export const TEST_FAIL_LOG = 'test-fail.log';
export const EMPTY_TEST_CASE_LOG = 'empty-test-case.log';

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

export const checkTestCase = async (testCasePath: string, testFolderNames: string[]) => {
    const testCaseFolders = await readdir(testCasePath);

    const hasAllTestCases = testFolderNames.filter(folderName => {
        return !testCaseFolders.includes(folderName);
    });

    return {
        hasAllTestCases: hasAllTestCases.length === 0,
        emptyTestCases: hasAllTestCases,
        path: testCasePath
    }
}


export const checkTestCases = async (folderName: string, testFolderNames: string[]) => {
    const folders = await (await readdir(folderName)).filter(isAssignSubmissionFile);

    const result = await Promise.all(folders.map(async (folder) => {
        const testCasesPath = `${folderName}/${folder}`;
        const testCaseResult = await checkTestCase(testCasesPath, testFolderNames);

        return {
            ...testCaseResult,
            folderName: folder,
        }
    }));

    return result;
}

export const buildTestCases = async (path: string) => {
    const testCasesFolders = await readdir(path);
}
