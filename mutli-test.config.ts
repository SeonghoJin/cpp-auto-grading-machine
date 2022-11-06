import { config } from './config';

export const mutliTestConfig = {
    ...config,
    UNSAFE__FOLDER__NAME__HARD__CODE: 'multi-test',
    INPUT_FOLDER_NAME: 'string-inputs',
    OUTPUT_FOLDER_NAME: 'string-outputs',
    MULTI: [
        'exercise1',
        'exercise2',
        'exercise3',
        'exercise4',
        'exercise5',
        'exercise6',
        'exercise7',
    ],
}
