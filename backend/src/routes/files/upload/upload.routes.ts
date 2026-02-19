import { Router} from "express";
import { PrismaClient, CommentSource } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";
import mammoth from "mammoth";
import { processHtmlDocument } from "../../../util/documentProcessing";
import { loadDocxFromS3AsHtml } from "../../../services/streamFromS3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import Session from "supertokens-node/recipe/session";
import { mapMimeToEnum } from "../../../util/Enum";
import { loadAppFileMetaById } from "../fileMeta.middleware";
import { getUser } from "../../../database/util/user";

const router = Router({ mergeParams: true });
// All routes here REQUIRE a valid AppFileMeta
//router.use(loadAppFileMetaById);

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

router.post("/", upload.single("file"), async (req, res) => {
  const session = await Session.getSession(req, res);
  const authId = session.getUserId();
  const { title, description, documentType } = req.body;

  const s3Url = (req.file as any).location;
  const key = (req.file as any).key;
  const mimeType = req.file?.mimetype;

  const user = await getUser(authId);
  if (!user) return res.status(401).json({ error: "User not found" });

  // 🔥 SUBSCRIPTION CHECK
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  const isPro =
    subscription?.tier === "PROFESSIONAL" &&
    (subscription.status === "active" ||
      subscription.status === "trialing");

  if (!isPro) {
    const manuscriptCount = await prisma.appFileMeta.count({
      where: { userId: user.id },
    });

    if (manuscriptCount >= 5) {
      return res.status(403).json({
        error:
          "Free tier allows up to 5 manuscripts. Upgrade to Pro for unlimited manuscripts.",
      });
    }
  }

  // ✅ Create manuscript meta
  const appFileMeta = await prisma.appFileMeta.create({
    data: {
      title,
      description,
      userId: user.id,
      currentVersionId: 1,
      documentType,
    },
  });

  const currentDate = new Date();

  const appFile = await prisma.appFile.create({
    data: {
      appFileMetaId: appFileMeta.id,
      version: 1,
      name: `1-${title}-${currentDate.toLocaleDateString()}`,
      filename: key,
      mimetype: mapMimeToEnum(mimeType),
      url: s3Url,
      userId: user.id,
      documentType,
    },
  });

  res.json({
    ok: true,
    appFileMeta,
    appFile,
  });
});

// POST /files/:appFileMetaId/upload/version
router.post("/version", loadAppFileMetaById, upload.single("file"), async (req, res) => {
  const currentDate = new Date();

  if (!req.file) throw new Error("There is no file in the request");

  const { comment } = req.body;
  const session = await Session.getSession(req, res);
  const authId = session.getUserId();

  const user = await prisma.user.findUnique({
    where: { superTokensId: authId },
  });
  if (!user) throw new Error("User not found");

  const s3Url = (req.file as any).location;
  const key = (req.file as any).key;
  const mimeType = req.file?.mimetype;

  const appFileMeta = await prisma.appFileMeta.findUnique({
    where: { id: req.appFileMeta.id },
  });
  if (!appFileMeta) throw new Error("AppFileMeta object not found");

  const existingVersions = await prisma.appFile.findMany({
    where: { appFileMetaId: appFileMeta.id },
    orderBy: { version: "desc" },
  });

  const maxVersion = existingVersions.length
    ? existingVersions[0].version
    : 0;

  const newVersion = maxVersion + 1;

  // 🔥 NEW: Convert DOCX → HTML using your existing service
  if (!process.env.AWS_S3_BUCKET || !process.env.AWS_S3_REGION) {
    throw new Error("Missing S3 configuration");
  }

  const html = await loadDocxFromS3AsHtml(
    process.env.AWS_S3_BUCKET,
    key,
    process.env.AWS_S3_REGION
  );

  // 🔥 Extract paragraphs + stats
  const { paragraphs, paragraphCount, wordCount, sentenceCount } =
    processHtmlDocument(html);

  // Optional page estimate (250–300 words per page typical manuscript)
  const pageCount = Math.ceil(wordCount / 275);

  const appFile = await prisma.appFile.create({
    data: {
      appFileMetaId: req.appFileMeta.id,
      version: newVersion,
      name: `${newVersion}-${appFileMeta.title}-${currentDate.toLocaleDateString()}`,
      filename: key,
      mimetype: mapMimeToEnum(mimeType),
      url: s3Url,
      userId: user.id,
      versionComment: comment,

      // 🔥 NEW CACHED FIELDS
      htmlCache: html,
      paragraphsJson: paragraphs,
      paragraphCount,
      sentenceCount,
      wordCount,
      pageCount,
    },
  });

  res.json({
    ok: true,
    appFile,
  });
});

router.post("/image", upload.single("file"), async (req, res) => {
    // Get the SuperTokens session
    const currentDate = new Date();

    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
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