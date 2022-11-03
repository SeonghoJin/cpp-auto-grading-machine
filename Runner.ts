import { run } from "./util";

export interface Runner {
    run(buildfilepath: string, inputfilepath: string): ReturnType<typeof run>;
}