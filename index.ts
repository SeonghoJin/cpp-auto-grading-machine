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
    test
} from "./util";
import { config } from './config';

const {
    UNSAFE__FOLDER__NAME__HARD__CODE
} = config;

const main = async () => {

    console.log('remove all online text folder');
    await removeAllOnlineTextFolder(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

    console.log('unzip all online submission');
    await unZipAssignSubmission(UNSAFE__FOLDER__NAME__HARD__CODE);
    br();

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

};

main();