import express, { NextFunction, Request, Response } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { SessionRequest } from "supertokens-node/framework/express";
import {
    createAvatarS3ObjectKey,
    isManagedAvatarS3ObjectKey,
} from "../../files/s3ObjectKey";

const router = express.Router();
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const supportedAvatarTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
]);

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const avatarUpload = multer({
    limits: { fileSize: MAX_AVATAR_BYTES, files: 1 },
    fileFilter: (_req, file, callback) => {
        if (!supportedAvatarTypes.has(file.mimetype)) {
            callback(new Error("Profile images must be JPEG, PNG, WebP, or GIF files."));
            return;
        }
        callback(null, true);
    },
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        cacheControl: "public, max-age=31536000, immutable",
        key: (req, file, callback) => {
            const session = (req as SessionRequest).session;
            if (!session) {
                callback(new Error("An authenticated session is required."));
                return;
            }
            callback(
                null,
                createAvatarS3ObjectKey(session.getUserId(), file.originalname)
            );
        },
    }),
});

type S3Upload = Express.Multer.File & { key: string; location: string };

function objectKeyFromS3Url(value: string | null | undefined) {
    if (!value || !process.env.AWS_S3_BUCKET) return null;

    try {
        const url = new URL(value);
        const decodedPath = decodeURIComponent(url.pathname.replace(/^\//, ""));
        const bucket = process.env.AWS_S3_BUCKET;

        if (url.hostname.startsWith(`${bucket}.s3`)) return decodedPath;
        if (url.hostname.startsWith("s3") && decodedPath.startsWith(`${bucket}/`)) {
            return decodedPath.slice(bucket.length + 1);
        }
    } catch {
        return null;
    }

    return null;
}

async function deleteManagedAvatar(key: string | null) {
    if (!key || !isManagedAvatarS3ObjectKey(key) || !process.env.AWS_S3_BUCKET) return;
    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        })
    );
}

router.get("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user: any = await prisma.user.findUnique({
        where: 
            {
                superTokensId: authId,
            },
            include: {
                userProfile: true,  
            }
    });
    
    res.status(200).json(user);
});

router.put("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    const { firstName, lastName, bio } = req.body;

    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedUser = await prisma.userProfile.upsert({
        where: {
            id: user.id
        },
        update: { firstName, lastName, bio },
        create: { id: user.id, firstName, lastName, bio }
    });

    res.status(200).json(updatedUser);
});

router.post("/avatar", (req: Request, res: Response, next: NextFunction) => {
    avatarUpload.single("avatar")(req, res, (uploadError) => {
        if (uploadError) {
            const message =
                uploadError instanceof multer.MulterError && uploadError.code === "LIMIT_FILE_SIZE"
                    ? "Profile images must be 5 MB or smaller."
                    : uploadError.message;
            res.status(400).json({ error: message });
            return;
        }

        void (async () => {
            const uploaded = req.file as S3Upload | undefined;
            if (!uploaded) {
                res.status(400).json({ error: "Choose an image to upload." });
                return;
            }

            const session = await Session.getSession(req, res);
            const authId = session.getUserId();
            const user = await prisma.user.findUnique({
                where: { superTokensId: authId },
                include: { userProfile: true },
            });

            if (!user) {
                await deleteManagedAvatar(uploaded.key);
                res.status(404).json({ error: "User not found" });
                return;
            }

            try {
                const profile = await prisma.userProfile.upsert({
                    where: { id: user.id },
                    update: { avatarUrl: uploaded.location },
                    create: { id: user.id, avatarUrl: uploaded.location },
                });

                const previousKey = objectKeyFromS3Url(user.userProfile?.avatarUrl);
                if (previousKey && previousKey !== uploaded.key) {
                    try {
                        await deleteManagedAvatar(previousKey);
                    } catch (deleteError) {
                        console.error("Unable to remove previous profile image", deleteError);
                    }
                }

                res.status(200).json({
                    avatarUrl: profile.avatarUrl,
                    userProfile: profile,
                });
            } catch (error) {
                try {
                    await deleteManagedAvatar(uploaded.key);
                } catch (deleteError) {
                    console.error("Unable to clean up failed profile image upload", deleteError);
                }
                throw error;
            }
        })().catch(next);
    });
});

export default router;
