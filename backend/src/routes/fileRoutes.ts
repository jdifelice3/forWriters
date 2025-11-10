import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { FileType } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import { getFileRecords, createFileRecord } from "../database/fileDb";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", async (_req, res) => {
  console.log('in file Routes GET');
  const session = await Session.getSession(_req, res);
  const authId = session.getUserId();

  console.log('authId', authId);

  const files = await getFileRecords(authId);

  res.json(files);
});

router.post("/", upload.single("file"), async (req, res) => {
  const session = await Session.getSession(req, res);
  const authId = session.getUserId();
  const mimeType = mapMimeToEnum(req.file?.mimetype);
  const filename = (req.file !== undefined ? req.file.filename : '');

  const file = await createFileRecord(authId, mimeType, filename, req.body.title, req.body.description);

  res.json(file);
});

const mapMimeToEnum = (mime: string | undefined): FileType => {
  if (mime === "application/pdf") return "PDF";
  if (
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mime === "application/msword"
  )
    return "DOCX";
  throw new Error(`Unsupported file type: ${mime}`);
}

export default router;