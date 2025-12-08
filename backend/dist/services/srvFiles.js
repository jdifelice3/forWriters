"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteFile = async (fileUrl) => {
    //fileUrl contains the file path relative to the root project directory
    let filePathToFolder = `${process.env.PATH_TO_UPLOADS_FOLDER}${fileUrl}`;
    try {
        if (filePathToFolder !== undefined) {
            const filePath = path_1.default.join(filePathToFolder, fileUrl);
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error removing file: ${err}`);
                    throw err;
                }
                console.log(`File ${filePath} has been successfully removed.`);
                return true;
            });
        }
        else {
            //throw new Error(`Invalid file path: ${filePathToFolder}`);
            return false;
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
exports.deleteFile = deleteFile;
