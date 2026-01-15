import Session from "supertokens-node/recipe/session";
import prisma from "../../database/prisma";
import { getUser } from "../../database/util/user";
import { Router } from "express";
import { z } from "zod";
//import { resolveReviewerParticipant } from "./filesApi.middleware";
import { fullFeedbackInclude } from "./filesApi.feedback.includes";
const router = Router();

const TargetInput = z.object({
  paragraphId: z.string().min(1),
  from: z.number().int().nonnegative(),
  to: z.number().int().nonnegative(),
  targetText: z.string().default(""),
});

const CreateCommentInput = z.object({
  reviewerUserId: z.string().min(1),
  commentText: z.string().min(1),
  source: z.enum(["DOCX", "MANUAL"]).default("DOCX"),
  targets: z.array(TargetInput).min(1),
});

const UpdateCommentInput = z.object({
  commentText: z.string().min(1),
});

const ResolveInput = z.object({
  isResolved: z.boolean(),
});

router.get("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await getUser(authId);

    const files = await prisma.appFileMeta.findMany({
        include: {
            appFile: true
        },
        where: {
            userId: user?.id
        },
     
        orderBy: { title: "asc" }
    });

    res.json(files);
});

router.get("/:id/description", async(req, res) => {
    const appFileId = req.params.id;

    const appFile = await prisma.appFile.findUnique({
      where: {
        id: appFileId,
      },
    });

    const appFileMeta = await prisma.appFileMeta.findUnique({
        where: {
            id: appFile?.appFileMetaId
        }
    });

    res.json(appFileMeta);
});

router.get("/search", async (req, res) => {
    const query:string = (req.query.query as string) || "";
    if (!query.trim()) {
      return res.json([]);
    }
    const files = await prisma.appFile.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        documentType: "MANUSCRIPT"
      },
      take: 10,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        appFileMetaId: true
        // add any other fields you want to show
      },
   });
    
    res.json(files);
}); 

router.put("/", async(req, res) => {
   
    const { fileMetaId, title, description } = req.body;
    const file = await prisma.appFileMeta.update({
        where: {
            id: fileMetaId, 
        },
        data: {
            title: title,
            description: description
        },
    });
    
    res.json(file);
});

router.put("/version", async(req, res) => {
    let id: string = "";
    let version: string = "";
    
    if(typeof req.query.id === "string"){
        id = req.query.id;
    } else {
        throw new Error("");
    }
    if(typeof req.query.version === "string"){
        version = req.query.version;
    } else {
        throw new Error("");
    }

    const file = await prisma.appFileMeta.update({
        where: {
            id: id
        },
        data: {
            currentVersionId: Number(version)
        }
    })
    res.status(200).json(file);
});

router.delete("/", async(req, res) => {
    let id: string = "";
    if(typeof req.query.id === "string"){
        id = req.query.id;
        const file = await prisma.appFile.deleteMany({
            where: {
                appFileMetaId: id
            }
        });

        const fileMeta = await prisma.appFileMeta.delete({
            where: {
                id: id
            }
        });
        
        res.status(200).json({status: "OK"})
    } else {
        res.status(500).json({error: "Expecting a string data type in the query string for file id"});
    }
});

// FEEDBACK
router.get("/feedback/:fileFeedbackId/comments", async (req, res) => {
  const { fileFeedbackId } = req.params;

  const comments = await prisma.fileFeedbackComment.findMany({
    where: { fileFeedbackId },
    orderBy: { createdAt: "asc" },
    include: {
      targets: { orderBy: { from: "asc" } },
      reviewerUser: {
        include: { userProfile: true },
      },
    },
  });

  const dto = comments.map((c) => ({
    id: c.id,
    fileFeedbackId: c.fileFeedbackId,
    reviewerUserId: c.reviewerUserId,
    reviewerDisplayName:
      c.reviewerUser.userProfile
        ? `${c.reviewerUser.userProfile.firstName} ${c.reviewerUser.userProfile.lastName}`
        : "Reviewer",
    reviewerAvatarUrl: c.reviewerUser.userProfile?.avatarUrl ?? null,
    commentText: c.commentText,
    isResolved: c.isResolved,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    targets: c.targets.map((t) => ({
      id: t.id,
      paragraphId: t.paragraphId,
      from: t.from,
      to: t.to,
      targetText: t.targetText,
    })),
  }));

  res.json(dto);
});

// POST create
router.post("/feedback/:fileFeedbackId/comments", async (req, res) => {
  const { fileFeedbackId } = req.params;
  const input = CreateCommentInput.parse(req.body);

  const created = await prisma.$transaction(async (tx) => {
    const comment = await tx.fileFeedbackComment.create({
      data: {
        fileFeedbackId,
        reviewerUserId: input.reviewerUserId,
        source: input.source,
        commentText: input.commentText,
      },
    });

    await tx.fileFeedbackCommentTarget.createMany({
      data: input.targets.map((t) => ({
        commentId: comment.id,
        paragraphId: t.paragraphId,
        from: t.from,
        to: t.to,
        targetText: t.targetText ?? "",
      })),
    });

    return tx.fileFeedbackComment.findUniqueOrThrow({
      where: { id: comment.id },
      include: {
        targets: { orderBy: { from: "asc" } },
        reviewerUser: { include: { userProfile: true } },
      },
    });
  });

  res.status(201).json({
    id: created.id,
    fileFeedbackId: created.fileFeedbackId,
    reviewerUserId: created.reviewerUserId,
    reviewerDisplayName:
      created.reviewerUser.userProfile
        ? `${created.reviewerUser.userProfile.firstName} ${created.reviewerUser.userProfile.lastName}`
        : "Reviewer",
    reviewerAvatarUrl: created.reviewerUser.userProfile?.avatarUrl ?? null,
    commentText: created.commentText,
    isResolved: created.isResolved,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
    targets: created.targets.map((t) => ({
      id: t.id,
      paragraphId: t.paragraphId,
      from: t.from,
      to: t.to,
      targetText: t.targetText,
    })),
  });
});

// PATCH update text
router.patch(
  "/feedback/:fileFeedbackId/comments/:commentId",
  async (req, res) => {
    const { commentId } = req.params;
    const input = UpdateCommentInput.parse(req.body);

    const updated = await prisma.fileFeedbackComment.update({
      where: { id: commentId },
      data: { commentText: input.commentText },
      include: {
        targets: { orderBy: { from: "asc" } },
        reviewerUser: { include: { userProfile: true } },
      },
    });

    res.json({
      id: updated.id,
      fileFeedbackId: updated.fileFeedbackId,
      reviewerUserId: updated.reviewerUserId,
      reviewerDisplayName:
        updated.reviewerUser.userProfile
          ? `${updated.reviewerUser.userProfile.firstName} ${updated.reviewerUser.userProfile.lastName}`
          : "Reviewer",
      reviewerAvatarUrl: updated.reviewerUser.userProfile?.avatarUrl ?? null,
      commentText: updated.commentText,
      isResolved: updated.isResolved,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      targets: updated.targets.map((t) => ({
        id: t.id,
        paragraphId: t.paragraphId,
        from: t.from,
        to: t.to,
        targetText: t.targetText,
      })),
    });
  }
);

// PATCH resolve
router.patch("/feedback/:fileFeedbackId/comments/:commentId/resolve", async (req, res) => {
    const { commentId } = req.params;
    const input = ResolveInput.parse(req.body);

    const updated = await prisma.fileFeedbackComment.update({
      where: { id: commentId },
      data: { isResolved: input.isResolved },
    });

    res.json({
      id: updated.id,
      isResolved: updated.isResolved,
      updatedAt: updated.updatedAt.toISOString(),
    });
  }
);

router.get("/:appFileId/feedback", async (req, res) => {
  const { appFileId } = req.params;
  const session = await Session.getSession(req, res);
  const authId = session.getUserId(true);

  const user = await prisma.user.findUnique({
    where: { superTokensId: authId },
  });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  let feedback = await prisma.fileFeedback.findUnique({
    where: {
      appFileId_reviewerUserId: {
        appFileId,
        reviewerUserId: user.id,
      },
    },
    include: {
      fileFeedbackComment: {
        include: {
          targets: true,
          reviewerUser: { include: { userProfile: true } },
        },
      },
    },
  });

  if (feedback) {
    return res.json(feedback);
  }

  feedback = await prisma.fileFeedback.create({
    data: {
      appFileId,
      reviewerUserId: user.id,
    },
    include: {
      fileFeedbackComment: {
        include: {
          targets: true,
          reviewerUser: { include: { userProfile: true } },
        },
      },
    },
  });

  res.status(201).json(feedback);
});

export default router;
