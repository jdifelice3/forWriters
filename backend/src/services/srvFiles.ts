import fs from 'fs';
import path from 'path';

export const deleteFile = async(fileUrl: string) => {
    //fileUrl contains the file path relative to the root project directory
    let filePathToFolder: string | undefined = `${process.env.PATH_TO_UPLOADS_FOLDER}${fileUrl}`;

    if(filePathToFolder !== undefined){
        const filePath = path.join(filePathToFolder, fileUrl);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                throw err;
            }
            console.log(`File ${filePath} has been successfully removed.`);
            return true;
        });
    } else {
        throw new Error(`Invalid file path: ${filePathToFolder}`);
    }
}