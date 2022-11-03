import { PromiseWithChild } from "child_process";
import { MakeReturnPayload } from "ts-try-catch-wrap";
import { Runner } from "./Runner";
import { run } from "./util";

export class MacCppRunner implements Runner {

    async run(buildFilePath: string, inputFilePath: string): Promise<MakeReturnPayload<PromiseWithChild<{ stdout: string | Buffer; stderr: string | Buffer; }>>> {
        return await run(`${buildFilePath} < ${inputFilePath}`);
    }

}