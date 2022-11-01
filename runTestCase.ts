import { readdir } from "node:fs/promises";
import { makeTry } from "ts-try-catch-wrap";
import { read, run } from "./util";

export const formatString = (value: string) => {
    return value.replace(/(\s*)/g, "").replace(/\n|\r|\s*/g, "").toLowerCase();
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
