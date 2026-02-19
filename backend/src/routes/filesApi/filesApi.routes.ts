import Session from "supertokens-node/recipe/session";
import prisma from "../../database/prisma";
import { getUser } from "../../database/util/user";
import { Router } from "express";
import { z } from "zod";
import { loadDocxFromS3AsHtml, addParagraphIds } from "../../services/streamFromS3";
import { fullFeedbackInclude } from "./filesApi.feedback.includes";
import { AppFileMeta } from "@prisma/client";
const router = Router();

type ObjectIdsForDeletion = {
    appFileIds: string[],
    fileFeedbackIds: string[],
    fileFeedbackCommentIds: string[],
    fileFeedbackCommentTargetIds: string[],
    readingSubmissionIds: string[]
}

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
    const authId = session.getUserId();
    const user: any = await getUser(authId);

    const files = await prisma.appFileMeta.findMany({
        include: {
            appFile: {
                orderBy: {
                    version: "asc"
                }
            }
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
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user: any = await getUser(authId);

    const query:string = (req.query.query as string) || "";
    if (!query.trim()) {
      return res.json([]);
    }
    const files = await prisma.appFile.findMany({
      where: {
        userId: user.id, 
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
    let fileMetaId: string = "";
    if(typeof req.query.id === "string"){
        fileMetaId = req.query.id;

        const deletionIds: ObjectIdsForDeletion = await getDeletionIds(fileMetaId, );

        console.log('deleteIds', deletionIds)

        //Deleting
        const { count: targetCount} = await prisma.fileFeedbackCommentTarget.deleteMany({
            where: {
                id: {
                    in: deletionIds.fileFeedbackCommentTargetIds
                }
            }
        });
        console.log(`${targetCount} targets deleted`)
        
        const { count: commentCount } = await prisma.fileFeedbackComment.deleteMany({
            where: {
                id: {
                    in: deletionIds.fileFeedbackCommentIds
                }
            }
        });
        console.log(`${commentCount} comments deleted`)
        
        const { count: feedbackCount } = await prisma.fileFeedback.deleteMany({
            where: {
                id: {
                    in: deletionIds.fileFeedbackIds
                }
            }
        })
        console.log(`${feedbackCount} feedbackfile records deleted`)
        
        const { count: submissionCount } = await prisma.readingSubmission.deleteMany({
            where: {
                appFileId: {
                    in: deletionIds.appFileIds
                }
            }
        })

        const { count: fileCount } = await prisma.appFile.deleteMany({
            where: {
                id: {
                    in: deletionIds.appFileIds
                }
            }
        });
        console.log(`${fileCount} appFiles deleted`)
        
        await prisma.appFileMeta.delete({
            where: {
                id: fileMetaId
            }
        });
        console.log('appMeta deleted')

        
        res.status(200).json({status: "OK"})
    } else {
        res.status(500).json({error: "Expecting a string data type in the query string for file id"});
    }
});

router.get("/:appFileMetaId/ids/fordeletion", async(req, res) => {
    const appFileMetaId = req.params.appFileMetaId;
    if(!appFileMetaId) res.status(404).json({error: "AppFileMetaId not sent"});

    const deletionIds: ObjectIdsForDeletion = await getDeletionIds(appFileMetaId);
    res.status(200).json(deletionIds);
});

const getDeletionIds = async(appFileMetaId: string): Promise<ObjectIdsForDeletion> => {
    //Retrieving ids

    const appFileMeta = await prisma.appFileMeta.findUnique({
        where: {
            id: appFileMetaId
        },
        include: {
            appFile: true
        }
    });
    if(!appFileMeta) throw new Error(`AppFileMeta not found for id ${appFileMetaId}`)

    const appFileIds: string[] | undefined = appFileMeta?.appFile.map((f) => (
        f.id
    ));

    const feedback = await prisma.fileFeedback.findMany({
        where: {
            appFileId: {
                in: appFileIds
            }
        }
    });
    const fileFeedbackIds: string[] | undefined = feedback.map((f) => (
        f.id
    ));

    const comments = await prisma.fileFeedbackComment.findMany({
        where: {
            fileFeedbackId: {
                in: fileFeedbackIds
            }
        }
    });
    const commentIds: string[] | undefined = comments.map((c) => (
        c.id
    ));

    const targets = await prisma.fileFeedbackCommentTarget.findMany({
        where: {
            commentId: {
                in: commentIds
            }
        }
    });
    const targetIds: string[] | undefined = targets.map((t) => (
        t.id
    ));

    const readingSubmissions = await prisma.readingSubmission.findMany({
        where: {
            appFileId: {
                in: appFileIds
            }
        }
    });
    const submissionIds: string[] | undefined = targets.map((s) => (
        s.id
    ));


    return {
        appFileIds: appFileIds,
        fileFeedbackIds: fileFeedbackIds,
        fileFeedbackCommentIds: commentIds,
        fileFeedbackCommentTargetIds: targetIds,
        readingSubmissionIds: submissionIds
    }
}

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

router.get("/:appFileId/feedback/comments", async (req, res) => {
  const { appFileId } = req.params;

    const results = await prisma.fileFeedback.findMany({
        where: {
            appFileId: appFileId
        },
        select: {
            id: true
        }
    });

    const fileFeedbackIds: string[] | undefined = results.map((f) => (
        f.id
    ));

  const comments = await prisma.fileFeedbackComment.findMany({
    where: { 
        fileFeedbackId: {
            in: fileFeedbackIds
        }
    },
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
router.patch("/feedback/:fileFeedbackId/comments/:commentId",
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

router.delete("/feedback/:fileFeedbackId/comments/:commentId",
    async (req, res) => {
        const { commentId } = req.params;
        console.log('commentId', commentId)
        const commentTarget = await prisma.fileFeedbackCommentTarget.deleteMany({
            where: {
                commentId: commentId
            }
        });

        const comment = await prisma.fileFeedbackComment.delete({
            where: {
                id: commentId
            }
        });

        res.status(200).json(comment);
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
  const authId = session.getUserId();

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

router.get("/:appFileId/html", async (req, res) => {
    const appFileId = req.params.appFileId;

    const appFile = await prisma.appFile.findUnique({
        where: {
            id: appFileId
        }
    });

    if(!appFile){
        res.status(403).json({error: "File not found"});
    } 
    if(!process.env.AWS_S3_BUCKET || !process.env.AWS_S3_REGION) {
        return res.status(403).json({error: "Invalid S3 values"});
    }

    const html = await getDocxAsHtml(
        process.env.AWS_S3_BUCKET, 
        appFile!.filename, 
        process.env.AWS_S3_REGION
    );

    res.json({
        html: html,
    });
});

const getDocxAsHtml = async (awsS3bucket: string, filename: string, awsS3region: string) => {
    const html = await loadDocxFromS3AsHtml(
        awsS3bucket, 
        filename, 
        awsS3region
    );

    return addParagraphIds(html);
}

export default router;
