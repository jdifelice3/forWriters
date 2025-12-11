import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import Session from "supertokens-node/recipe/session";
import { getFileRecords, createFileRecordBasic, updateFileRecord, deleteFileRecord, createFileRecordReadingFeedback } from "../database/dbFiles";

const router = express.Router();

//#region S3 and Multer
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET!,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (_req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});
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
  try {
    // Get the SuperTokens session
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);

    // File metadata from multer-s3
    const s3Url = (req.file as any).location; // full URL: https://bucket.s3.amazonaws.com/file.pdf
    const key = (req.file as any).key;        // e.g. 1765428452013-Balk.pdf
    const mimeType = req.file?.mimetype;

    // Create DB entry
    const file = await createFileRecordBasic(
      authId,
      mimeType!,
      key,                // store the S3 key
      req.body.title,
      req.body.description,
      s3Url               // store the full S3 URL
    );

    res.json({
      ok: true,
      file,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});


router.post("/ra/:readingAuthorId", upload.single("file"), async (req, res) => {
  try{
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const readingAuthorId = req.params.readingAuthorId;
    const mimeType = req.file?.mimetype;
    const filename = (req.file !== undefined ? req.file.filename : '');

    const file = await createFileRecordReadingFeedback(
      authId, 
      mimeType!, 
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

router.get("/:id/download", async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const file = await prisma.appFile.findUnique({ where: { id: req.params.id } });
        if (!file) return res.status(404).send("File not found");

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: file.filename,
        });

        const data = await s3.send(command);
        console.log('S3 data', data);
        res.setHeader("Content-Type", data.ContentType || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${file.title}"`);

        if(data.Body === undefined){
            throw new Error('Error downloading file from S3');
        }
        console.log('res', res);
        const bodyStream = data.Body as Readable;
        bodyStream.pipe(res);

    } catch (err) {
        if(err instanceof Error){
            console.error(err.message, err);
            res.status(500).json({ err: err.message });
        } else {
            console.error('Unknown Error in file router', err);
            res.status(500).json({ err: 'Unknown Error in file router' });
        }

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

export default router;