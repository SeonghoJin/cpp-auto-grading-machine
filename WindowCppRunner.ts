import { PromiseWithChild } from "child_process";
import { MakeReturnPayload } from "ts-try-catch-wrap";
import { Runner } from "./Runner";
import { run } from "./util";

export class WindowCppRunner implements Runner {

    async run(buildFilePath: string, inputFilePath: string): Promise<MakeReturnPayload<PromiseWithChild<{ stdout: string | Buffer; stderr: string | Buffer; }>>> {

        const splitedPath = buildFilePath.split('/');

        if (splitedPath.at(-1) !== 'build') {
            throw new Error('not buildFile Path');
        }

        const pathLen = splitedPath.length;


        const cdCmds = splitedPath.slice(0, pathLen - 1)
            .map(path => `cd ${path}`);


        const cmd = cdCmds.concat(`build < ${splitedPath.slice(0, pathLen - 1).map((_) => '..').join('/')}/${inputFilePath}`).join(' & ');
        console.log(cmd);
        return await run(cmd);
    }
}