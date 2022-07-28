import { exec } from "node:child_process";
import { readdir, stat, mkdir, access } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';

type PromiseFunction = (...args: any[]) => Promise<any>;

type PromiseReturnType<T extends PromiseFunction> =
    T extends (...args: any[]) => Promise<infer Return>
    ? Return
    : never

type TryCatchAsyncWrapReturn<T extends PromiseFunction> = (...args: Parameters<T>) => Promise<{
    err: unknown,
    result: null
} | {
    err: null,
    result: PromiseReturnType<T>
}>

const hasStdout = (obj: any): obj is { stdout: string } => {
    if (!obj) {
        return false;
    }

    if (typeof obj.stdout !== 'string') {
        return false;
    }

    return true;
}

const hasStderr = (obj: any): obj is { stderr: string } => {
    if (!obj) {
        return false;
    }

    if (typeof obj.stderr !== 'string') {
        return false;
    }

    return true;
}

const tryCatchAsyncWrap = <T extends PromiseFunction>(callback: T): TryCatchAsyncWrapReturn<T> => {
    return async (...args: Parameters<typeof callback>) => {
        try {
            const result = await callback(...args);
            return {
                result,
                err: null
            }
        } catch (err: unknown) {
            return {
                result: null,
                err
            }
        }
    }
}

const run = promisify(exec);
const errAccess = tryCatchAsyncWrap(access);
const errMkdir = tryCatchAsyncWrap(mkdir);
const DEFAULT_TEST_DIRECTORY = '__test__';
const DEFAULT_TEST_FILE = 'test';
const br = () => console.log('========================================');
const UNSAFE__FOLDER__NAME__HARD__CODE = 'add-test-example';

const isTestFile = (testFile: string) => {
    const splitedTestFile = testFile.split('.');
    const test = splitedTestFile.at(-2);

    if (test === DEFAULT_TEST_FILE) {
        return true;
    }

    return false;
}

const removeExt = (fileName: string) => {
    const fileNameRemovedExt = fileName.split('.').at(0);

    if (fileNameRemovedExt === undefined) {
        throw new Error("filename is undefined");
    }
    return fileNameRemovedExt;
}

const makeFolderIfNotExists = async (folderName: string) => {
    const { err } = await errAccess(folderName);
    if (err === null) {
        return;
    }
    await errMkdir(folderName);
}

const readTestDirectory = async (testDirectory: string) => {
    const foldersAndFiles = await readdir(testDirectory);

    const testFolderName = foldersAndFiles.find(
        (item) => item === DEFAULT_TEST_DIRECTORY
    );

    if (testFolderName === undefined) {
        throw new Error(`${testDirectory} doesn't have a folder with a${DEFAULT_TEST_DIRECTORY} name`)
    }

    const testFolderPath = join(testDirectory, testFolderName);
    const testFolderStat = await stat(testFolderPath);

    if (testFolderStat.isDirectory() === false) {
        throw new Error(`${testFolderPath} is not directory, so can't start test`);
    }

    const testFiles = (await readdir(testFolderPath)).filter(isTestFile);
    return testFiles;
}

const test = async (filename: string) => {
    const compile = 'g++';
    const buildFilename = join('build', removeExt(filename));
    const args = `-o ${buildFilename} -std=c++14 -lgtest`;
    const mainTestFile = 'test.cpp';
    const testFileName = join(DEFAULT_TEST_DIRECTORY, filename);
    const UNSAFE__command = `cd ${UNSAFE__FOLDER__NAME__HARD__CODE} && ${compile} ${args} ${mainTestFile} ${testFileName} && ${buildFilename}`;

    await makeFolderIfNotExists(`${UNSAFE__FOLDER__NAME__HARD__CODE}/build`);
    const result = await run(UNSAFE__command);

    return result;
}

const wrapErrTest = tryCatchAsyncWrap(test);

const main = async () => {
    const testFiles = await readTestDirectory(UNSAFE__FOLDER__NAME__HARD__CODE);

    const results = await Promise.all(
        testFiles.map(async (testFile) => {
            const { err, result } = await wrapErrTest(testFile);
            return {
                testFile,
                err,
                ...result
            };
        })
    );

    results.forEach(({ testFile, stderr, stdout, err }) => {

        if (err) {
            console.error(`${testFile} is failed`);

            if (hasStderr(err)) {
                console.error(err.stderr);
            }

            if (hasStdout(err)) {
                console.error(err.stdout);
            }

            br();
            return;
        }

        console.error(`${testFile} is sucessed`);
        console.log(`test file name = ${testFile}`);
        console.log(`stderr = `);
        console.log(stderr)
        console.log(`stdout = `);
        console.log(stdout);
        br();
        return;
    })
};

main();