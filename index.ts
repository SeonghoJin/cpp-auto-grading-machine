import {
    br,
    buildFiles,
    isAssignSubmissionFile,
    moveAllCppFiles,
    moveFile,
    removeAllFolders,
    removeAllOnlineTextFolder,
    tryMkdir,
    unZipAssignSubmission,
    test,
    formatMultiTest,
    removeAllExcludeTestFolder,
    checkTestCases,
    buildTestCases,
    unit,
    runTestCase,
} from "./util";
import { readdir } from 'fs/promises';
import { config } from './config';
import './monkyPatch';

const {
    UNSAFE__FOLDER__NAME__HARD__CODE
} = config;

const isMulti = config.MULTI.length !== 0;

const checkSingleTest = async () => {
    console.log('extract all cpp files');
    await moveAllCppFiles(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

    console.log('remove all trash folder');
    await removeAllFolders(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

    console.log('build start');
    const allBuildResult = await buildFiles(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

    if (allBuildResult.hasError) {
        console.log('all build fail');
        console.log(allBuildResult.err);
        console.log('exit');
        return;
    }

    const buildFailFolders = allBuildResult.result.filter((res) => {
        if (!isAssignSubmissionFile(res.filename)) {
            return false;
        }

        return res.result === 'fail';
    });

    console.log('make build fail folder');
    const buildFailFolderName = `${UNSAFE__FOLDER__NAME__HARD__CODE}/build-fail`;
    const makeBuildFailFolderResult = await tryMkdir(buildFailFolderName);

    if (makeBuildFailFolderResult.hasError) {
        console.log('make build file error');
        console.log(makeBuildFailFolderResult.err);
    }

    console.log('move build fail folder');
    await Promise.allSettled(buildFailFolders.map(async ({ filename }) => {
        const folderName = filename.split('/').at(-1);
        if (folderName === undefined) {
            throw new Error('folderName is undefined, #e002');
        }

        console.log(`move ${filename} to ${buildFailFolderName}/${folderName}`);
        const result = await moveFile(filename, `./${buildFailFolderName}/${folderName}`)

        if (result.hasError) {
            console.log(result.err);
        }
    }));

    console.log(`start test | target ${UNSAFE__FOLDER__NAME__HARD__CODE}`);
    const testResult = await test(UNSAFE__FOLDER__NAME__HARD__CODE);

    const failTests = testResult.filter(t => t.result === false).map(t => t.filename);

    console.log('make test fail folder');
    const testFaileFolder = `${UNSAFE__FOLDER__NAME__HARD__CODE}/test-fail`;
    const makeTestFailFolder = await tryMkdir(`${testFaileFolder}`);

    if (makeTestFailFolder.hasError) {
        console.log('make test file error');
        console.log(makeTestFailFolder.err);
    }

    console.log('move test fail folder');
    await Promise.allSettled(failTests.map(async (filename) => {
        const folderName = filename.split('/').at(-2);
        const splitedTargetFileName = filename.split('/');
        const targetFileName = splitedTargetFileName.slice(0, splitedTargetFileName.length - 1).join('/');
        if (folderName === undefined) {
            throw new Error('folderName is undefined, #e003');
        }

        console.log(`move ${targetFileName} to ${testFaileFolder}/${folderName}`);
        const result = await moveFile(targetFileName, `./${testFaileFolder}/${folderName}`)

        if (result.hasError) {
            console.log(result.err);
        }
    }));
}

const checkMultiTest = async () => {
    const testFolderNames = config.MULTI;

    console.log('format multi test');
    await formatMultiTest(UNSAFE__FOLDER__NAME__HARD__CODE, testFolderNames);

    console.log('remove origin test folder');
    await removeAllExcludeTestFolder(UNSAFE__FOLDER__NAME__HARD__CODE, testFolderNames);

    console.log('check test case');
    const checkTestCaseResult = await checkTestCases(UNSAFE__FOLDER__NAME__HARD__CODE, testFolderNames);

    console.log('make empty test case folder');
    const testCaseFolder = `${UNSAFE__FOLDER__NAME__HARD__CODE}/empty-test-case`;
    const makeEmptyTestCaseFolder = await tryMkdir(`${testCaseFolder}`);

    if (makeEmptyTestCaseFolder.hasError) {
        console.log('make empty test case folder error');
        console.log(makeEmptyTestCaseFolder.err);
    }

    console.log('move empty test case folder');
    await Promise.all(checkTestCaseResult.filter((item) => item.hasAllTestCases === false)
        .map(async (item) => {
            console.log('move file', item.path, `./${testCaseFolder}/${item.folderName}`);
            await moveFile(item.path, `./${testCaseFolder}/${item.folderName}`);
        }));

    console.log('build test case');

    const userFolders = await (await readdir(UNSAFE__FOLDER__NAME__HARD__CODE)).filter(isAssignSubmissionFile);

    const result = await Promise.all(userFolders.map(async userFolder => {
        return await buildFiles(`./${UNSAFE__FOLDER__NAME__HARD__CODE}/${userFolder}`);
    }));

    console.log('make build fail folder');
    const buildFailFolderName = `${UNSAFE__FOLDER__NAME__HARD__CODE}/build-fail`;
    const makeBuildFailFolderResult = await tryMkdir(buildFailFolderName);

    if (makeBuildFailFolderResult.hasError) {
        console.log('make build file error');
        console.log(makeBuildFailFolderResult.err);
    }

    await Promise.all(result.map(async (item) => {
        await Promise.all(item.result?.map(async (innerItem) => {
            if (innerItem.result === 'fail') {
                const splitedFilename = innerItem.filename.split('/');
                const newPath = `./${UNSAFE__FOLDER__NAME__HARD__CODE}/build-fail/${splitedFilename.at(-2)}/${splitedFilename.at(-1)}`
                await tryMkdir(`./${UNSAFE__FOLDER__NAME__HARD__CODE}/build-fail/${splitedFilename.at(-2)}`);

                console.log('move', innerItem.filename, newPath);
                const moveResult = await moveFile(innerItem.filename, newPath);
                if (moveResult.hasError) {
                    console.log(moveResult.err);
                }
            }
        }) ?? []);
    }));

    const testFolders = await (await Promise.all(userFolders.map(async (user) => {
        const testFolder = `${UNSAFE__FOLDER__NAME__HARD__CODE}/${user}`;
        try {
            return (await readdir(testFolder)).map(folder => `${testFolder}/${folder}`);
        } catch (e) {
            return [];
        }
    }))).flat();

    const testResult = await Promise.all(testFolders.map(async (folder) => {
        const testCase = folder.split('/').at(-1);
        const inputTestCase = `./${config.INPUT_FOLDER_NAME}/${testCase}`;
        const outputTestCase = `./${config.OUTPUT_FOLDER_NAME}/${testCase}`;
        return await runTestCase(`${folder}/${config.BUILD_EXE_FILE}`, inputTestCase, outputTestCase);
    }));

    const failes = testResult.filter(result => !result.result);

    console.log('make test fail folder');
    const testFaileFolder = `${UNSAFE__FOLDER__NAME__HARD__CODE}/test-fail`;
    const makeTestFailFolder = await tryMkdir(`${testFaileFolder}`);

    if (makeTestFailFolder.hasError) {
        console.log('make test file error');
        console.log(makeTestFailFolder.err);
    }

    console.log('move test faile files');

    await Promise.all(failes.map(async fail => {
        const splitedFailFilename = fail.filename.split('/');
        splitedFailFilename.pop();
        const oldPath = splitedFailFilename.join('/');

        await tryMkdir(`${UNSAFE__FOLDER__NAME__HARD__CODE}/test-fail/${splitedFailFilename.at(-2)}`);

        const newPath = `${UNSAFE__FOLDER__NAME__HARD__CODE}/test-fail/${splitedFailFilename.at(-2)}/${splitedFailFilename.at(-1)}`;

        console.log('move file', oldPath, newPath);
        await moveFile(oldPath, newPath);
    }));

}


const main = async () => {

    console.log('remove all online text folder');
    await removeAllOnlineTextFolder(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

    console.log('unzip all online submission');
    await unZipAssignSubmission(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

    if (isMulti) {
        checkMultiTest();
        return;
    }

    checkSingleTest();
};

main();