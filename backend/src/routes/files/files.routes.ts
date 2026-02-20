import express, { NextFunction} from "express";
import prisma from "../../database/prisma";
import multer from "multer";
import multerS3 from "multer-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { S3Client } from "@aws-sdk/client-s3";
import Session from "supertokens-node/recipe/session";
import { mapMimeToEnum } from "../../util/Enum";
import { getUser } from "../../database/util/user";
import { requirePro } from "../billing/billing.middleware";
import { GenerateFeedbackPdfInput } from "../../types/Pdf";
import { generateFeedbackPdf } from "../../services/pdf/exportFeedbackReport";
import z from "zod";
import { getParagraphNumber, normalizeExcerpt, sanitizeFilename } from "../../util/Pdf"

const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

router.get("/:fileId/download", async (req, res, next) => {
    try {
        const fileId = req.params.fileId;
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

router.post("/:appFileId/export-pdf", requirePro, async (req, res) => {
    
    const { appFileId } = req.params;
    
    const ExportPdfInput = z.object({
        includeResolved: z.boolean().default(true),
        includeReviewerAppendix: z.boolean().default(false),
    });
    const input = ExportPdfInput.parse(req.body);

    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user = await getUser(authId);

    if (!user) {
    return res.status(401).json({ error: "User not found" });
    }

    const appFile = await prisma.appFile.findUnique({
        where: { id: appFileId },
        include: { appFileMeta: true },
    });

    if (!appFile || appFile.userId !== user.id) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const feedback = await prisma.fileFeedback.findMany({
        where: { appFileId },
        include: {
            fileFeedbackComment: {
            include: {
                targets: true,
                reviewerUser: {
                include: { userProfile: true },
                },
            },
            },
        },
    });

    const commentModels = feedback.flatMap(f => f.fileFeedbackComment);
    let pdfComments = commentModels.map(c => {
        const targets = c.targets.map(t => ({
            paragraphNumber: getParagraphNumber(t.paragraphId),
            from: t.from,
            to: t.to,
            excerpt: normalizeExcerpt(t.targetText),
        }));

        const minParagraph = Math.min(...targets.map(t => t.paragraphNumber));

        return {
            paragraphNumber: minParagraph,
            targets,
            reviewerName:
            c.reviewerUser.userProfile
                ? `${c.reviewerUser.userProfile.firstName} ${c.reviewerUser.userProfile.lastName}`
                : "Reviewer",
            isResolved: c.isResolved,
            commentText: c.commentText,
            createdAt: c.createdAt,
        };
    });

    if (!input.includeResolved) {
        pdfComments = pdfComments.filter(c => !c.isResolved);
    }

    if (pdfComments.length === 0) {
        return res.status(400).json({
            error: "No comments to export for this configuration.",
        });
    }

    pdfComments.sort((a, b) => {
        if (a.paragraphNumber !== b.paragraphNumber) {
            return a.paragraphNumber - b.paragraphNumber;
        }

        const aMinFrom = Math.min(...a.targets.map(t => t.from));
        const bMinFrom = Math.min(...b.targets.map(t => t.from));

        if (aMinFrom !== bMinFrom) {
            return aMinFrom - bMinFrom;
        }

        return a.createdAt.getTime() - b.createdAt.getTime();
    });

    const summary = {
        totalComments: pdfComments.length,
        unresolvedCount: pdfComments.filter(c => !c.isResolved).length,
        resolvedCount: pdfComments.filter(c => c.isResolved).length,
        reviewerCount: new Set(pdfComments.map(c => c.reviewerName)).size,
    };
    //console.log('summary', summary)
    const dto: GenerateFeedbackPdfInput = {
        title: appFile.appFileMeta.title,
        version: appFile.version,
        generatedDate: new Date(),
        summary,
        comments: pdfComments,
        includeReviewerAppendix: input.includeReviewerAppendix,
    };

    const buffer = await generateFeedbackPdf(dto);

    const filename = `${sanitizeFilename(dto.title)}-v${dto.version}-feedback.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
    );
    res.send(buffer);
  }
);


export default router;