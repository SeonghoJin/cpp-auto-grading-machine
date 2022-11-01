import { readdir } from "fs/promises";
import { makeTry } from "ts-try-catch-wrap";
import { config } from "./config";
import { run } from "./util";

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

