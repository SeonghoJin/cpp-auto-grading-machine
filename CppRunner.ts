import { platform } from 'os';
import { PromiseWithChild } from 'child_process';
import { MakeReturnPayload } from 'ts-try-catch-wrap';
import { Runner } from './Runner';
import { MacCppRunner } from './MacCppRunner';
import { WindowCppRunner } from './WindowCppRunner copy';

export class CppRunner implements Runner {

    private platform: NodeJS.Platform;
    private runner: Runner;

    constructor(platform: NodeJS.Platform) {
        this.platform = platform;

        if (this.platform === 'win32') {
            this.runner = new WindowCppRunner();
            return;
        }

        if (this.platform === 'darwin') {
            this.runner = new MacCppRunner();
            return;
        }
        throw new Error('not support other ui');
    }

    run(buildFilePath: string, inputFilePath: string): Promise<MakeReturnPayload<PromiseWithChild<{ stdout: string | Buffer; stderr: string | Buffer; }>>> {
        return this.runner.run(buildFilePath, inputFilePath);
    }
}

export default new CppRunner(platform());