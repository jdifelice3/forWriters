import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { GroupType } from "@prisma/client";
import { canCreateReading } from "../../workflow/groupBusinessRules";

const router = Router({mergeParams: true});

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(async (req: Request, res: Response) => {
    const readings = await prisma.reading.findMany({
        where: { 
            groupId: req.group.id 
        },
        include: {
            readingParticipant: {
                include: {
                    user: {
                        include: {
                            userProfile: true
                        }
                    }
                }
            },
            readingSubmission: {
                include: {
                    appFile: {
                        include: {
                            appFileMeta: {
                                include: {
                                    user: {
                                        include: {
                                            userProfile: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                },
            },
        },
        orderBy: { 
            readingDate: "asc" 
        },
    });
    
    res.json(readings);
}));

router.post("/", async (req: Request, res: Response) => {
  if (
    !canCreateReading(
      req.group.groupType,
      req.groupRole,
      req.group.creatorUserId === req.user.id
    )
  ) {
    return res.status(403).json({ error: "Only the group admin can create readings" });
  }

  const {
    readingDate,
    submissionDeadline,
    name,
    readingStartTime,
    readingEndTime,
    description,
    participants = [],
  } = req.body;

  try {
    let participantUserIds: string[];

    if (req.group.groupType === GroupType.WRITING) {
      const scheduledDate = new Date(readingDate);
      const deadline = new Date(submissionDeadline);
      if (
        !readingDate ||
        !submissionDeadline ||
        Number.isNaN(scheduledDate.getTime()) ||
        Number.isNaN(deadline.getTime())
      ) {
        return res.status(400).json({
          error: "Writing-group readings require a reading date and submission deadline",
        });
      }

      participantUserIds = [
        ...new Set(
          (Array.isArray(participants) ? participants : [])
            .map((participant: { userId?: unknown }) => participant.userId)
            .filter((userId: unknown): userId is string =>
              typeof userId === "string" && userId.length > 0
            )
        ),
      ];

      const memberCount = participantUserIds.length
        ? await prisma.groupUser.count({
            where: {
              groupId: req.group.id,
              userId: { in: participantUserIds },
            },
          })
        : 0;
      if (memberCount !== participantUserIds.length) {
        return res.status(400).json({
          error: "Every reading author must already be a member of the writing group",
        });
      }
    } else if (req.group.groupType === GroupType.PERSONAL) {
      participantUserIds = [req.user.id];
    } else {
      return res.status(400).json({ error: "This group type does not support readings" });
    }

    const reading = await prisma.$transaction(async (tx) => {
      const reading = await tx.reading.create({
        data: {
          groupId: req.group.id,
          name,
          readingStartTime:
            req.group.groupType === GroupType.WRITING
                ? readingStartTime
                : null,
          readingEndTime:
          req.group.groupType === GroupType.WRITING
                ? readingEndTime
                : null,
          description,
          createdUserId: req.user.id,
          readingDate:
            req.group.groupType === GroupType.WRITING
                ? new Date(readingDate)
                : null,
          submissionDeadline: 
            req.group.groupType === GroupType.WRITING
                ? new Date(submissionDeadline)
                : null,
        },
      });

      if (participantUserIds.length) {
        await tx.readingParticipant.createMany({
          data: participantUserIds.map((userId) => ({
            readingId: reading.id,
            userId,
            role: "AUTHOR",
          })),
        });
      }

      return reading;
    });

    return res.status(201).json(reading);
  } catch (err) {   
    console.error("Create reading failed:", err);
    return res.status(500).json({ error: "Failed to create reading" });
  }
});



export default router;
