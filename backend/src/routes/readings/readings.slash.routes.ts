import { Router, Request, Response, NextFunction } from "express";
import { GroupType } from "../../types/domain-types";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { ReadingScheduleType } from "@prisma/client";

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
  if (req.groupRole !== "ADMIN") {
    return res.status(403).json({ error: "Admins only" });
  }

  const session = await Session.getSession(req, res);
  const authId = session.getUserId(true);

  const user = await prisma.user.findUnique({
    where: { superTokensId: authId },
  });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const {
    readingDate,
    submissionDeadline,
    name,
    readingStartTime,
    readingEndTime,
    description,
  } = req.body;

  try {
    const reading = await prisma.$transaction(async (tx) => {
      const group = await tx.group.findUnique({
        where: { id: req.group.id },
      });

      if (!group) {
        throw new Error("Group not found");
      }

      const reading = await tx.reading.create({
        data: {
          groupId: req.group.id,
          name,
          readingStartTime,
          readingEndTime,
          description,
          scheduledType:
            group.groupType === "WRITING"
              ? ReadingScheduleType.SCHEDULED
              : ReadingScheduleType.UNSCHEDULED,
          createdUserId: user.id,
          readingDate: new Date(readingDate),
          submissionDeadline: new Date(submissionDeadline),
        },
      });

      if (group.groupType === "PERSONAL") {
        await tx.readingParticipant.create({
          data: {
            readingId: reading.id,
            userId: user.id,
          },
        });
      }

      // 🔑 THIS IS CRITICAL
      return reading;
    });

    // 🔑 ALSO CRITICAL
    return res.status(201).json(reading);
  } catch (err) {   
    console.error("Create reading failed:", err);
    return res.status(500).json({ error: "Failed to create reading" });
  }
});



export default router;