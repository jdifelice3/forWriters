import express from "express";
import { PrismaClient, CommentSource } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import Session from "supertokens-node/recipe/session";
import { extractCommentsWithTargetsFromS3 } from "../services/streamFromS3";
import { 
    createFileRecordBasic,
    createFileRecordReadingFeedback, 
    createFileVersionRecord 
} from "../database/dbFiles";

type ExtractedComment = {
  commentId: string;
  commentText: string;
  targetText: string;
};

const router = express.Router();

const prisma = new PrismaClient();

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
    //contentType: multerS3.AUTO_CONTENT_TYPE,  --commented this out so the type would remain octet for downloads. disabled preview enirely for now 12/11/2025
    key: (_req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});
//#endregion

//#region GET
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
        res.setHeader("Content-Disposition", `attachment; filename=downloadedFile`);

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

router.post("/version", upload.single("file"), async (req, res) => {
  try {
    // Get the SuperTokens session
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);

    // File metadata from multer-s3
    const s3Url = (req.file as any).location; // full URL: https://bucket.s3.amazonaws.com/file.pdf
    const key = (req.file as any).key;        // e.g. 1765428452013-Balk.pdf
    const mimeType = req.file?.mimetype;
    const { appFileMetaId } = req.body;
    console.log('appFileMetaId',appFileMetaId);
    // Create DB entry
    const file = await createFileVersionRecord(
      authId,
      appFileMetaId,
      mimeType!,
      key,                // store the S3 key
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
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    if(!user){
        throw new Error("user not found");
    }

    const readingAuthorId = req.params.readingAuthorId;
    const mimeType = req.file?.mimetype;
    const key = (req.file as any).key;        // e.g. 1765428452013-Balk.pdf
    //const filename = (req.file !== undefined ? req.file.filename : '');
    const s3Url = (req.file as any).location;
    console.log(readingAuthorId, mimeType,key,s3Url);

    const {fileMeta, version } = await createFileRecordReadingFeedback(
      authId, 
      mimeType!, 
      key, 
      req.body.title, 
      req.body.description,
      readingAuthorId,
      s3Url,
      req.body.additionalFeedback,      
    );

    const feedback = await prisma.readingFeedback.create({
      data: {
        readingAuthorId: readingAuthorId,
        feedbackUserId: user.id,
        feedbackFileId: fileMeta.id,
      }
    });

    const comments: any = await extractCommentsWithTargetsFromS3(process.env.AWS_S3_BUCKET!, key, process.env.AWS_REGION!);
    console.log('comments[]', comments);
    let input = [];
    //add additional feedback
    input.push({
        readingAuthorId: readingAuthorId,
        readingFeedbackId: feedback.id,
        source: CommentSource.MANUAL,
        commentText: (req.body.additionalFeedback ? req.body.additionalFeedback : ""),
        targetText: "",
    })
    
    for(let i = 0; i < comments.length; i++){
        input.push({
            readingAuthorId: readingAuthorId,
            readingFeedbackId: feedback.id,
            source: CommentSource.DOCX,
            commentText: comments[i].commentText,
            targetText: comments[i].targetText
        })
    }
    const commentsResults = await prisma.readingFeedbackComment.createMany({
        data: input
    });
    res.json(fileMeta);
  } catch (err) {
      console.error('Error creating file record:', err);
      res.status(500).json({ err: 'Error creating file record' });
  }
});

router.post("/image", upload.single("file"), async (req, res) => {
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
//#endregion

export default router;