import { mutliTestConfig } from './mutli-test.config';

import { runTestCase } from './runTestCase';
import { buildFiles, checkTestCase } from './util';

const {
    UNSAFE__FOLDER__NAME__HARD__CODE,
    INPUT_FOLDER_NAME,
    OUTPUT_FOLDER_NAME,
    MULTI,
    BUILD_EXE_FILE
} = mutliTestConfig;


const main = async () => {

    if (MULTI.length === 0) {
        throw new Error("test case가 0개 입니다. multi-test.config.ts에 MULTI를 지정해주세요.");
    }

    const testCaseSearchResult = await checkTestCase(UNSAFE__FOLDER__NAME__HARD__CODE, MULTI);

    if (!testCaseSearchResult.hasAllTestCases) {
        console.log("테스트 케이스가 없습니다.");
        console.log(`${testCaseSearchResult.emptyTestCases.join(" ")} 가 없습니다.`);
        return;
    }
    const buildResult = await buildFiles(UNSAFE__FOLDER__NAME__HARD__CODE);

    if (buildResult.hasError) {
        console.log(buildResult.err);
        console.log('빌드에 실패했습니다.');
        return;
    }

    const testFolders = MULTI.map(multi => `${UNSAFE__FOLDER__NAME__HARD__CODE}/${multi}`)

    const result = await Promise.all(testFolders.map(async (folder) => {
        const testCase = folder.split('/').at(-1);
        const inputTestCase = `${INPUT_FOLDER_NAME}/${testCase}`;
        const outputTestCase = `${OUTPUT_FOLDER_NAME}/${testCase}`;
        return await runTestCase(`${folder}/${BUILD_EXE_FILE}`, inputTestCase, outputTestCase);
    }));


    result.forEach(item => {
        if (item.result === false) {
            console.log(`${item.filename} test 실패`);
            console.log(item.reason);
        } else {
            console.log(`${item.filename} test 성공`);
        }
        console.log(' ');

    })

}

main();