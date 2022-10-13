import { config } from "./config";
import { writeFileSync, appendFileSync } from 'fs';

const log = console.log;

const { UNSAFE__FOLDER__NAME__HARD__CODE } = config;

const logFileName = `${UNSAFE__FOLDER__NAME__HARD__CODE}/log`;

try {
    writeFileSync(logFileName, '');
} catch (e) {
    appendFileSync(logFileName, e as unknown as string);
}

console.log = (...args: any[]) => {
    log(...args);
    args.push('\n');
    try {
        appendFileSync(logFileName, args.join(' '));
    } catch (e) {
        appendFileSync(logFileName, e as unknown as string);
    }
}