import { makeTry } from "ts-try-catch-wrap";
import { access, mkdir, readdir, rmdir, rm, rename } from 'fs/promises';
import { exec } from "node:child_process";
import { promisify } from "node:util";
import AdmZip from 'adm-zip';
import glob from 'glob';

export const run = makeTry(promisify(exec));
export const findFiles = promisify(glob);
export const tryAccess = makeTry(access);
export const tryMkdir = makeTry(mkdir);
export const removeFile = makeTry(rm);
export const moveFile = makeTry(rename);
export const tryRm = makeTry(rm);
export const br = () => console.log('========================================');

export const isOnlineTextFolder = (filename: string) => {
    return filename.includes('onlinetext')
}

export const isAssignSubmissionFile = (filename: string) => {
    return filename.includes('_assignsubmission_file_');
}

export const hasCodeProperty = (obj: any): obj is { code: string } => {
    return typeof obj.code === 'string';
}

export const removeAllOnlineTextFolder = makeTry(async (foldername: string) => {
    const folders = await readdir(foldername);

    await Promise.allSettled(folders.map(async (folder) => {
        if (isOnlineTextFolder(folder)) {
            await makeTry(async () => {
                const path = `./${foldername}/${folder}`;
                console.log(`remove ${path}`);
                await rmdir(path, {
                    recursive: true
                });
            })();
        }
    }));
});

export const unZipAssignSubmission = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.allSettled(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;
        if (isAssignSubmissionFile(folder)) {
            await makeTry(async () => {
                const file = await readdir(`${folderPath}`);
                const filePath = `${folderPath}/${file}`;
                const zip = new AdmZip(filePath);
                await zip.extractAllTo(folderPath);
                console.log(`unzip ${folderPath}`);;
                await rm(filePath);
                console.log(`remove ${folderPath}`);
            })();
        }
    }))
});

export const moveAllCppFiles = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.allSettled(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;
        const files = [
            ...await findFiles(`${folderPath}/**/*.cpp`),
            ...await findFiles(`${folderPath}/**/*.h`),
            ...await findFiles(`${folderPath}/**/*.c`)
        ];

        await Promise.allSettled(files.map(async (file) => {
            const filename = file.split('/').at(-1);
            if (filename == undefined) {
                console.error(`filename is undefinend #e001`);
                return;
            }

            console.log(`move ${file} ${filename}`);
            await moveFile(file, `${folderPath}/${filename}`);
        }));
    }));
});

export const removeAllFolders = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    await Promise.allSettled(folders.map(async (folder) => {
        const folderPath = `./${foldername}/${folder}`;

        const items = await readdir(folderPath);

        await Promise.allSettled(items.map(async (item) => {
            if (!isCppFile(item)) {
                const path = `${folderPath}/${item}`;
                console.log('remove ' + path);
                const { hasError, err } = await tryRm(`${path}`, {
                    recursive: true
                });

                if (hasError) {
                    console.log(`remove fail ${path}`);
                    console.error(err);
                    console.log('continue remove job');
                }
            }
        }));
    }));
});

export const buildCpp = makeTry(async (foldername) => {
    const files = await readdir(foldername);
    const hasNotCppFile = files.map(isCppFile).filter(isCpp => !isCpp).length > 0;
    if (hasNotCppFile) {
        throw new Error(`${foldername} has not cpp file`);
    }

    const compiler = 'g++';
    const buildFilename = `${foldername}/build`
    const args = `-o ${buildFilename} -std=c++14`;
    const targetFiles = files.map((file) => `${foldername}/${file}`);
    const command = `${compiler} ${args} ${targetFiles.join(' ')}`;
    console.log(`build ${command}`);
    const result = await run(command);

    if (result.hasError) {
        console.log(`build fail command = ${command}`);
        console.log(`error`);
        console.log(result.err);

        return {
            result: 'fail',
            filename: foldername
        };
    }

    console.log(`build success ${foldername}`);
    return {
        result: 'success',
        filename: foldername
    }
})

export const buildFiles = makeTry(async (foldername) => {
    const folders = await readdir(foldername);

    return await Promise.all(folders.map(async (folder) => {
        const path = `./${foldername}/${folder}`;
        const result = await buildCpp(`${path}`);

        if (result.hasError) {
            return {
                result: 'fail',
                filename: path
            }
        }

        return result.result;
    }));
})

export const isCppFile = (filename: string) => {
    const extension = filename.split('.').at(-1);

    return extension === 'cpp' || extension === 'c' || extension === 'h'
}
