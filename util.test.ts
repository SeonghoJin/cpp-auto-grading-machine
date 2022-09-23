import { isOnlineTextFolder } from './util';

describe("isOnlineTextFolder", () => {
    [
        { filename: '홍길동_942811_assignsubmission_onlinetext_', want: true },
        { filename: 'linetext', want: false },
        { filename: '_onlinetext_', want: true },
        { filename: '홍길동_942811_assignsubmission_file_', want: false },
        { filename: 'assignsubmission_onlinetext_', want: true },
    ].forEach(s => {
        test(s.filename, () => {
            expect(isOnlineTextFolder(s.filename)).toBe(s.want);
        })
    })
})