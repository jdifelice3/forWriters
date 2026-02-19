import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "./group.middleware";
import Session from "supertokens-node/recipe/session";
import { JoinRequestError } from "../../database/types/Error";
import { PrismaClient, Prisma, JoinRequestStatus, GroupType } from "@prisma/client";

const router = Router({ mergeParams: true });

router.get("/description/:groupId", async(req: Request, res: Response) => {
    const groupId = req.params.groupId;
    const group = await prisma.group.findUnique({
        where: {
            id: groupId,
        },
        select: {
            description: true,
            websiteUrl: true,
            groupAddress: true,
        },
    });

    res.status(200).json(group);
});

//From the GroupSearch.tsx page
router.post("/:groupId", async (req: Request, res: Response) => {
    const groupId = req.params.groupId;
    try {
        const session = await Session.getSession(req, res);
        const authId = session.getUserId();
       
        const user: any = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
        });

        // Check if user already a member
        const existingMember = await prisma.groupUser.findUnique({
            where: {
            groupId_userId: {
                userId: user.id,
                groupId: groupId
            }
            }
        });

        if (existingMember) {
            const joinGroupError = new JoinRequestError("You are already a member of this group.", 400);
            throw joinGroupError;
        }

        // Check if there's already a pending request
        const existingRequest = await prisma.joinRequest.findFirst({
            where: {
            userId: user.id,
            groupId: groupId,
            status: JoinRequestStatus.PENDING,
            },
        });

        if (existingRequest) {
            const joinGroupError = new JoinRequestError("You already have a pending join request.", 400);
            throw joinGroupError;
        }

        // Create new join request
        const joinRequest = await prisma.joinRequest.create({
            data: {
            userId: user.id,
            groupId: groupId,
            status: JoinRequestStatus.PENDING,
            },
            include: {
            user: {
                include: {
                    userProfile: {
                        where: {
                            id: user.id
                        }
                    }
                }
            },
            group: true
            }
        });

        let requestor = "";
        
        if(!joinRequest.user.userProfile?.firstName || !joinRequest.user.userProfile?.lastName){
            requestor = joinRequest.user.email;
        } else {
            requestor = `${joinRequest.user.userProfile?.firstName} ${joinRequest.user.userProfile?.lastName}`;
        }
        //find the admins of the group. Send them notifications of the join request
        const groupAdmins = await prisma.groupUser.findMany({
            where: {
                groupId: groupId,
                role: "ADMIN"
            }
        });

        for(let i = 0; i < groupAdmins.length; i++){
            let notificationMessage = `${requestor} has submitted a request to join`;
            const notification = await prisma.notification.create({
                data: {
                    userId: groupAdmins[i].userId,
                    type: "GROUP_JOIN_REQUEST",
                    entityId: groupId,
                    message: notificationMessage,
                    href: "/joinadminpage"
                }
            });
        }

        res.json(joinRequest);
       
    } catch (err) {
        if(err instanceof JoinRequestError){
          res.status(err.statusCode).json({error: err.message});      
        } else {
          console.error("Error creating join request:", err);
          res.status(500).json({ error: "Failed to create join request." });
        }
    }
});
export default router;