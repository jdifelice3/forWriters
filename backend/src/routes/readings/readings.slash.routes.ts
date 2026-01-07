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
            readingParticipant: true,
            readingSubmission: {
                include: {
                    appFile: {
                        include: {
                            appFileMeta: true
                        }
                    },
                    readingFeedback: true
                },
            }
        },
        orderBy: { 
            readingDate: "asc" 
        },
    });
    console.log('readings', readings)
    res.json(readings);
}));

router.post("/", async (req: Request, res: Response) => {
    if (req.groupRole !== "ADMIN") {
        return res.status(403).json({ error: "Admins only" });
    }
    
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
    });
    
    let {
        readingDate,
        submissionDeadline,
        name,
        readingStartTime,
        readingEndTime,
        description,
        schedule,
        createdUserId,
    } = req.body;

    return prisma.$transaction(async (tx) => {
        const group = await tx.group.findUnique({
            where: { id: req.group.id },
            include: {
                reading: {
                    include: {
                        readingParticipant: true        
                    }
                }
            }
        });

        if (!group) throw new Error("Group not found");

        const reading = await tx.reading.create({
            data: {
                groupId: req.group.id,
                name,
                readingStartTime,
                readingEndTime,
                description,
                scheduledType: req.group.groupType === "WRITING" ? ReadingScheduleType.SCHEDULED : ReadingScheduleType.UNSCHEDULED,
                createdUserId,
                readingDate: new Date(readingDate),
                submissionDeadline: new Date(submissionDeadline),
            },
        });

        if (group.groupType === "PERSONAL") {
            const readingParticipant = await tx.readingParticipant.create({
                data: {
                    readingId: reading.id,
                    userId: user.id,
                }
            });
        }
    });
});

export default router;