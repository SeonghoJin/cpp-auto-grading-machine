
import { attendance } from './attendance';

export const extractHangul = (value: string) => {
    return value.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi, "");
}

export const removeHangul = (value: string) => {
    return value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
}

export const makeBuildFailLog = (buildFails: {
    result: string;
    filename: any;
    reason?: undefined;
}[]) => {
    const buffer: string[] = [];
    try {
        buildFails.forEach(fail => {
            const studentName = extractHangul(fail.filename).normalize('NFC');
            const maskedStudentName = maskingName(studentName);
            const studentNumber = maskingStudentNumber(attendance?.[studentName] ?? 123456);

            buffer.push(`학생이름: ${maskedStudentName}\n학번: ${studentNumber}`);
            buffer.push(`빌드 실패 이유:`);
            buffer.push(removeHangul((fail?.reason ?? '').normalize('NFC')));
            buffer.push('---------------------------');
        })
        writeFileSync(`${config.UNSAFE__FOLDER__NAME__HARD__CODE}/${BUILD_FAIL_LOG}`, buffer.join('\n'));
    } catch (e) {
        console.log(e);
    }
}

export const maskingNameIfLengthIsThree = (name: string) => {
    if (name.length !== 3) {
        console.log([...name]);
        console.log(name.trim());
        console.log(name.length);
        throw 'length is not three';
    }

    const maskedName = [...name];
    maskedName[0] = '*';
    maskedName[2] = '*';
    return maskedName.join('');
}

export const maskingName = (name: string) => {

    if (name.length == 2) {
        name += '*';
    }

    return maskingNameIfLengthIsThree(name);
}

export const maskingStudentNumber = (studentNumber: number) => {
    const str = studentNumber.toString();
    const maskedStr = [...str];

    maskedStr[0] = '*';
    maskedStr[1] = '*';
    maskedStr[5] = '*';

    return maskedStr.join('');
}



export const makeTestFailLog = async (testFails: {
    result: boolean;
    filename: string;
    reason: string;
}[]) => {
    const buffer: string[] = [];
    try {
        testFails.forEach(fail => {
            const studentName = extractHangul(fail.filename).normalize('NFC');
            const maskedStudentName = maskingName(studentName);
            const studentNumber = maskingStudentNumber(attendance?.[studentName] ?? 123456);

            buffer.push(`학생이름: ${maskedStudentName}\n학번: ${studentNumber}`);
            buffer.push(`테스트 실패 이유:`);
            buffer.push(removeHangul((fail?.reason ?? '').normalize('NFC')));
            buffer.push('---------------------------');
        })

        writeFileSync(`${config.UNSAFE__FOLDER__NAME__HARD__CODE}/${TEST_FAIL_LOG}`, buffer.join('\n'));
    } catch (e) {
        console.log(e);
    }
}

export const makeEmptyTestCaseLog = async (emptyTestCases: {
    hasAllTestCases: boolean;
    folderName: string;
    emptyTestCases: string[];
    path: string;
}[]) => {
    const buffer: string[] = [];
    try {
        emptyTestCases.forEach(empty => {
            const studentName = extractHangul(empty.folderName).normalize('NFC');
            const maskedStudentName = maskingName(studentName);
            const studentNumber = maskingStudentNumber(attendance?.[studentName] ?? 123456);

            buffer.push(`학생이름: ${maskedStudentName}\n학번: ${studentNumber}`);
            buffer.push(`없는 테스트 케이스: `);
            buffer.push(removeHangul((empty.emptyTestCases.join('\n')).normalize('NFC')));
            buffer.push('---------------------------');
        })

        writeFileSync(`${config.UNSAFE__FOLDER__NAME__HARD__CODE}/${EMPTY_TEST_CASE_LOG}`, buffer.join('\n'));
    } catch (e) {
        console.log(e);
    }
}