import {
    br,
    buildFiles,
    isAssignSubmissionFile,
    moveAllCppFiles,
    moveFile,
    removeAllFolders,
    removeAllOnlineTextFolder,
    tryMkdir,
    unZipAssignSubmission
} from "./util";
import { config } from './config';

const {
    UNSAFE__FOLDER__NAME__HARD__CODE
} = config;

const main = async () => {

    console.log('make test fail folder');
    const makeTestFailFolder = await tryMkdir(`${UNSAFE__FOLDER__NAME__HARD__CODE}/test-fail`)

    if (makeTestFailFolder.hasError) {
        console.log('make test file error');
        console.log(makeTestFailFolder.err);
    }

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

};

main();