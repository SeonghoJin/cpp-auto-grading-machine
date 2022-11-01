import { ResetTvOutlined } from '@mui/icons-material';
import { config } from './config';
import {
    buildCpp, runTestCase
} from './util';
const { UNSAFE__FOLDER__NAME__HARD__CODE, INPUT_FOLDER_NAME, OUTPUT_FOLDER_NAME } = config;

const main = async () => {
    const builtFolder = `${UNSAFE__FOLDER__NAME__HARD__CODE}`;

    const buildResult = await buildCpp(builtFolder);

    if (buildResult.result?.result === 'fail') {
        console.log('build 실패');
        console.log('build 실패 이유');
        console.log(buildResult.result.reason);
        return;
    }

    const buildFilePath = `${UNSAFE__FOLDER__NAME__HARD__CODE}/build`;

    const runResult = await runTestCase(buildFilePath, INPUT_FOLDER_NAME, OUTPUT_FOLDER_NAME);

    if (runResult.result === false) {
        console.log('테스트 실패');
        console.log(runResult.reason);
        return;
    }

    console.log('테스트 성공');
}

main();