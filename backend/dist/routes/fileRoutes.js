"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const dbFiles_1 = require("../database/dbFiles");
const router = express_1.default.Router();
//#region STORAGE
const uploadDir = path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir);
const storage = multer_1.default.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = (0, multer_1.default)({ storage });
//#endregion
//#region GET
router.get("/", async (_req, res) => {
    try {
        console.log('in GET/ file Routes');
        const session = await session_1.default.getSession(_req, res);
        const authId = session.getUserId();
        console.log('authId', authId);
        const files = await (0, dbFiles_1.getFileRecords)(authId);
        res.json(files);
    }
    catch (err) {
        console.error('Error retrieving file records:', err);
        res.status(500).json({ err: 'Error retrieving file records' });
    }
});
router.get("/type/:documentType", async (_req, res) => {
    try {
        const documentType = _req.params.documentType;
        if (!documentType) {
            res.status(404).json({ error: "Document Type not found" });
        }
        const session = await session_1.default.getSession(_req, res);
        const authId = session.getUserId();
        console.log('authId', authId);
        const files = await (0, dbFiles_1.getFileRecords)(authId, documentType);
        res.json(files);
    }
    catch (err) {
        console.error('Error retrieving file records:', err);
        res.status(500).json({ err: 'Error retrieving file records' });
    }
});
//#endregion
//#region POST
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId();
        const mimeType = mapMimeToEnum(req.file?.mimetype);
        const filename = (req.file !== undefined ? req.file.filename : '');
        const file = await (0, dbFiles_1.createFileRecordBasic)(authId, mimeType, filename, req.body.title, req.body.description);
        res.json(file);
    }
    catch (err) {
        console.error('Error creating file record:', err);
        res.status(500).json({ err: 'Error creating file record' });
    }
});
router.post("/ra/:readingAuthorId", upload.single("file"), async (req, res) => {
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId();
        const readingAuthorId = req.params.readingAuthorId;
        const mimeType = mapMimeToEnum(req.file?.mimetype);
        const filename = (req.file !== undefined ? req.file.filename : '');
        const file = await (0, dbFiles_1.createFileRecordReadingFeedback)(authId, mimeType, filename, req.body.title, req.body.description, readingAuthorId, req.body.additionalFeedback);
        res.json(file);
    }
    catch (err) {
        console.error('Error creating file record:', err);
        res.status(500).json({ err: 'Error creating file record' });
    }
});
//#endregion
//#region PUT
router.put("/", async (_req, res) => {
    try {
        const { id, title, description } = _req.body;
        const file = await (0, dbFiles_1.updateFileRecord)(id, title, description);
        res.json(file);
    }
    catch (err) {
        console.error('Error updating file record', err);
        res.status(500).json({ err: 'Error updating file record' });
    }
});
//#endregion
//#region DELETE
router.delete("/", async (_req, res) => {
    let id = "";
    try {
        if (typeof _req.query.id === "string") {
            id = _req.query.id;
            console.log(`delete file id: ${id}`);
            const fileUrl = await (0, dbFiles_1.deleteFileRecord)(id);
            //const deleteResult = await deleteFile(fileUrl);
            res.status(200).json({ status: "OK" });
            //res.json({status: deleteResult});
        }
        else {
            throw new Error("Expecting a string data type in the query string for file id");
        }
    }
    catch (err) {
        console.error('Error deleting file:', err);
        res.status(500).json({ err: 'Error deleting file' });
    }
});
//#endregion
//#region UTIL FUNTIONS
const mapMimeToEnum = (mime) => {
    if (mime === "application/pdf")
        return "PDF";
    if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        mime === "application/msword")
        return "DOCX";
    throw new Error(`Unsupported file type: ${mime}`);
};
//#endregion
exports.default = router;
