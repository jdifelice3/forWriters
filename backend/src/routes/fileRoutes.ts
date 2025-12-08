import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { FileType } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import { getFileRecords, createFileRecordBasic, updateFileRecord, deleteFileRecord, createFileRecordReadingFeedback } from "../database/dbFiles";
import { deleteFile } from "../services/srvFiles";

const router = express.Router();

//#region STORAGE
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
//#endregion


//#region GET
router.get("/", async (_req, res) => {
  try{
    
    const session = await Session.getSession(_req, res);
    const authId = session.getUserId(true);
    const files = await getFileRecords(authId);

    res.json(files);
  } catch (err) {
      console.error('Error retrieving file records:', err);
      res.status(500).json({ err: 'Error retrieving file records' });
  }
});

router.get("/type/:documentType", async(_req, res) => {
  try{
    
    const documentType = _req.params.documentType;

    if(!documentType){
        res.status(404).json({error: "Document Type not found"});
    }
    
    const session = await Session.getSession(_req, res);
    const authId = session.getUserId(true);
    const files = await getFileRecords(authId, documentType);

    res.json(files);
  } catch (err) {
      console.error('Error retrieving file records:', err);
      res.status(500).json({ err: 'Error retrieving file records' });
  }
});
//#endregion


//#region POST
router.post("/", upload.single("file"), async (req, res) => {
  try{
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const mimeType = mapMimeToEnum(req.file?.mimetype);
    const filename = (req.file !== undefined ? req.file.filename : '');

    const file = await createFileRecordBasic(
        authId, 
        mimeType, 
        filename, 
        req.body.title, 
        req.body.description
      );

    res.json(file);
  } catch (err) {
      console.error('Error creating file record:', err);
      res.status(500).json({ err: 'Error creating file record' });
  }
});

router.post("/ra/:readingAuthorId", upload.single("file"), async (req, res) => {
  try{
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const readingAuthorId = req.params.readingAuthorId;
    const mimeType = mapMimeToEnum(req.file?.mimetype);
    const filename = (req.file !== undefined ? req.file.filename : '');

    const file = await createFileRecordReadingFeedback(
      authId, 
      mimeType, 
      filename, 
      req.body.title, 
      req.body.description,
      readingAuthorId,
      req.body.additionalFeedback
    );

    res.json(file);
  } catch (err) {
      console.error('Error creating file record:', err);
      res.status(500).json({ err: 'Error creating file record' });
  }
});
//#endregion


//#region PUT
router.put("/", async(_req, res) => {
  try{
    const { id, title, description } = _req.body;
    const file = await updateFileRecord(id, title, description);
    res.json(file);
  } catch (err) {
    console.error('Error updating file record', err);
    res.status(500).json({ err: 'Error updating file record' });
  }
});
//#endregion


//#region DELETE
router.delete("/", async(_req, res) => {
  let id: string = "";
  try {
    if(typeof _req.query.id === "string"){
      id = _req.query.id;
      
      const fileUrl = await deleteFileRecord(id);
      
      res.status(200).json({status: "OK"})
      
    } else {
      throw new Error("Expecting a string data type in the query string for file id");
    }
  } catch (err) { 
      console.error('Error deleting file:', err);
      res.status(500).json({ err: 'Error deleting file' });
  }
});
//#endregion


//#region UTIL FUNTIONS
const mapMimeToEnum = (mime: string | undefined): FileType => {
  if (mime === "application/pdf") return "PDF";
  if (
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mime === "application/msword"
  )
    return "DOCX";
  throw new Error(`Unsupported file type: ${mime}`);
}
//#endregion

export default router;