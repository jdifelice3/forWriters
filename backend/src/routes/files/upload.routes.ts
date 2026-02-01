import { Router} from "express";
import { PrismaClient, CommentSource } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import Session from "supertokens-node/recipe/session";
import { mapMimeToEnum } from "../../util/Enum";
import { loadAppFileMetaById } from "./fileMeta.middleware";

const router = Router({ mergeParams: true });
// All routes here REQUIRE a valid AppFileMeta
router.use(loadAppFileMetaById);

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

// POST /files/:appFileMetaId/upload/version
router.post("/version", upload.single("file"), async (req, res) => {
        const currentDate = new Date();
        
        if(!req.file) throw new Error("There is no file in the request");
        
        const { comment } = req.body;
        const session = await Session.getSession(req, res);
        const authId = session.getUserId(true);
        const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
        if(!user) throw new Error("User not found");

        const s3Url = (req.file as any).location; // full URL: https://bucket.s3.amazonaws.com/file.pdf
        const key = (req.file as any).key;        // e.g. 1765428452013-Balk.pdf
        const mimeType = req.file?.mimetype;

        const appFileMeta = await prisma.appFileMeta.findUnique({ where: {id: req.appFileMeta.id}});
        if(!appFileMeta) throw new Error('AppFileMeta object not found')

        const maxVersionFiles = await prisma.appFile.findMany({
            where: {
                appFileMetaId: appFileMeta.id
            },
            orderBy: {
                id: "desc"
            }
        });
        
        let maxVersion: number = 0;
        if(maxVersionFiles){
            maxVersion = maxVersionFiles[0].version;
        }
        const newVersion = maxVersion + 1;
        const appFile = await prisma.appFile.create({
            data: {
                appFileMetaId: req.appFileMeta.id,
                version: newVersion,
                name: `${newVersion}-${appFileMeta.title}-${currentDate.toLocaleDateString()}`,
                filename: key,
                mimetype: mapMimeToEnum(mimeType),
                url: s3Url,
                userId: user ? user.id : '',
                versionComment: comment
            },
        });

    res.json({
      ok: true,
      appFile,
    });
});
export default router;