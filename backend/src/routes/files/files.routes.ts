import express, { NextFunction} from "express";
import { PrismaClient, CommentSource } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import Session from "supertokens-node/recipe/session";
import { extractCommentsWithTargetsFromS3 } from "../../services/streamFromS3";
import { mapMimeToEnum } from "../../util/Enum";

type ExtractedComment = {
  commentId: string;
  commentText: string;
  targetText: string;
};

const prisma = new PrismaClient();

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
    //contentType: multerS3.AUTO_CONTENT_TYPE,  --commented this out so the type would remain octet for downloads. disabled preview enirely for now 12/11/2025
    key: (_req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});
//#endregion

const currentDate = new Date();

router.get("/:fileId/download", async (req, res, next) => {
    try {
        const fileId = req.params.fileId;
        const prisma = new PrismaClient();
        const file = await prisma.appFile.findUnique({ where: { id: fileId } });
        if (!file) return res.status(404).send("File not found");

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: file.filename,
        });

        const data = await s3.send(command);
        res.setHeader("Content-Type", data.ContentType || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=downloadedFile`);

        if(data.Body === undefined){
            throw new Error('Error downloading file from S3');
        }
        const bodyStream = data.Body as Readable;
        bodyStream.pipe(res);

    } catch (err) {
        if(err instanceof Error){
            console.error(err.message, err);
            res.status(500).json({ err: err.message });
        } else {
            next(err);
        }

    }
});

router.post("/", upload.single("file"), async (req, res) => {
    // Get the SuperTokens session
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const { title, description } = req.body;

    // File metadata from multer-s3
    const s3Url = (req.file as any).location; // full URL: https://bucket.s3.amazonaws.com/file.pdf
    const key = (req.file as any).key;        // e.g. 1765428452013-Balk.pdf
    const mimeType = req.file?.mimetype;

    // Create DB entry
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    
    const file = await prisma.appFileMeta.create({
        data: {
            title: title,
            description: description,
            userId: user ? user.id : '',
            currentVersionId: 1,
        },
    });

    const version = await prisma.appFile.create({
        data: {
            appFileMetaId: file.id,
            version: 1,
            name: `1-${title}-${currentDate.toLocaleDateString()}`,
            filename: key,
            mimetype: mapMimeToEnum(mimeType),
            url: s3Url,
            userId: user ? user.id : '',
        },
    });

    res.json({
      ok: true,
      file,
    });
});

router.post("/image", upload.single("file"), async (req, res) => {
    // Get the SuperTokens session
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const { title, description } = req.body;

    // File metadata from multer-s3
    const s3Url = (req.file as any).location; // full URL: https://bucket.s3.amazonaws.com/file.pdf
    const key = (req.file as any).key;        // e.g. 1765428452013-Balk.pdf
    const mimeType = req.file?.mimetype;

    // Create DB entry
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    
    const file = await prisma.appFileMeta.create({
        data: {
            title: title,
            description: description,
            userId: user ? user.id : '',
            currentVersionId: 1,
        },
    });

    const version = await prisma.appFile.create({
        data: {
            appFileMetaId: file.id,
            version: 1,
            name: `1-${title}-${currentDate.toLocaleDateString()}`,
            filename: key,
            mimetype: mapMimeToEnum(mimeType),
            url: s3Url,
            userId: user ? user.id : '',
        },
    });

    res.json({
      ok: true,
      file,
    });
});
export default router;