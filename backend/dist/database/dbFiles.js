"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileRecord = exports.updateFileRecord = exports.createFileRecordReadingFeedback = exports.createFileRecordBasic = exports.getFileRecords = void 0;
const client_1 = require("@prisma/client");
const domain_types_1 = require("../domain-types");
const Enum_1 = require("../util/Enum");
const docxExtractor_1 = require("../services/docxExtractor");
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient({
    log: [
        { level: "query", emit: "event" },
    ],
});
prisma.$on('query', e => {
    //console.log(e.query);
});
const getFileRecords = async (authId, documentType) => {
    const user = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
        include: {
            userProfile: true,
        }
    });
    const files = await prisma.appFile.findMany({
        where: {
            userId: user?.id,
            ...(documentType && {
                documentType: (0, Enum_1.getDocumentTypeFromString)(documentType)
            })
        },
        // select: {
        //     id: true,
        //     title: true,
        //     mimetype: true
        // },
        orderBy: { title: "asc" }
    });
    return files;
};
exports.getFileRecords = getFileRecords;
const createFileRecordBasic = async (authId, mimeType, filename, title, description) => {
    console.log('in createFileRecordBasic');
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    const file = await prisma.appFile.create({
        data: {
            title: title,
            description: description,
            filename: filename,
            mimetype: mimeType,
            url: `/uploads/${filename}`,
            userId: user ? user.id : '',
        },
    });
    return file;
};
exports.createFileRecordBasic = createFileRecordBasic;
// export const createFileRecordReading = async(authId: string, mimeType: FileType, filename: string,
//         title: string, description: string
//  ) => {
//   const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
//   const file = await prisma.appFile.create({
//     data: {
//       title: title,
//       description: description,
//       filename: filename,
//       mimetype: mimeType,
//       url: `/uploads/${filename}`,
//       userId: user ? user.id : '',
//     },
//   });
//   return file;
// }
const createFileRecordReadingFeedback = async (authId, mimeType, filename, title, description, readingAuthorId, additionalFeedback) => {
    try {
        const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
        if (!user) {
            throw new Error("user not found");
        }
        const file = await prisma.appFile.create({
            data: {
                title: title,
                description: description,
                filename: filename,
                mimetype: mimeType,
                url: `/uploads/${filename}`,
                userId: user ? user.id : '',
                documentType: (0, Enum_1.getDocumentTypeFromString)(domain_types_1.DocumentType.FEEDBACK)
            },
        });
        const feedback = await prisma.readingFeedback.create({
            data: {
                readingAuthorId: readingAuthorId,
                feedbackUserId: user.id,
                feedbackFileId: file.id,
            }
        });
        const filePath = path_1.default.join(process.cwd(), "uploads/", filename);
        const comments = await (0, docxExtractor_1.extractCommentsWithTargets)(filePath);
        console.log(comments);
        let input = [];
        //add additional feedback
        input.push({
            readingAuthorId: readingAuthorId,
            readingFeedbackId: feedback.id,
            source: client_1.CommentSource.MANUAL,
            commentText: (additionalFeedback ? additionalFeedback : ""),
            targetText: "",
        });
        for (let i = 0; i < comments.length; i++) {
            input.push({
                readingAuthorId: readingAuthorId,
                readingFeedbackId: feedback.id,
                source: client_1.CommentSource.DOCX,
                commentText: comments[i].commentText,
                targetText: comments[i].targetText
            });
        }
        console.log('input', input);
        const commentsResults = await prisma.readingFeedbackComment.createMany({
            data: input
        });
        return file;
    }
    catch (err) {
        console.log('err', err);
        throw err;
    }
};
exports.createFileRecordReadingFeedback = createFileRecordReadingFeedback;
const updateFileRecord = async (id, title, description) => {
    const file = await prisma.appFile.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            description: description
        },
    });
    return file;
};
exports.updateFileRecord = updateFileRecord;
const deleteFileRecord = async (id) => {
    let file = null;
    let fileUrl = "";
    //get file url to return the file path so it can be deleted
    try {
        const fileMetaData = await prisma.appFile.findUnique({
            where: {
                id: id
            }
        });
        fileUrl = (typeof fileMetaData?.url === "string") ? fileMetaData.url : "";
        //delete the record of the file
        file = await prisma.appFile.delete({
            where: {
                id: id
            }
        });
    }
    catch (err) {
        throw err;
    }
    console.log(`File record has been deleted. file id: ${id}`);
    console.log(`fileUrl: ${fileUrl}`);
    return fileUrl;
};
exports.deleteFileRecord = deleteFileRecord;
