import { Request, Response, NextFunction, Router } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { JoinRequestError } from "../../database/types/Error";
import { JoinRequestStatus, GroupRole } from "@prisma/client";
import { SessionRequest } from "supertokens-node/framework/express";

const router = Router();

router.put("/join-requests/:id/approve", async(req: SessionRequest, res: Response) => {
    const { id } = req.params;
    
    try {
        const session = await Session.getSession(req, res);
        const authId = session.getUserId(true);
        
        const user: any = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
        });
    
        const joinReq = await prisma.joinRequest.findUnique({
            where: { 
                id: id 
            },
            include: {
                group: true,
            },
        });
  
        if (!joinReq) {
            throw new JoinRequestError("Join request not found.", 404);
        }

        if (joinReq.status !== JoinRequestStatus.PENDING) {
            throw new JoinRequestError("This request is no longer pending.", 400);
        }

        if (req.groupRole !== GroupRole.ADMIN) {
            throw new JoinRequestError("You are not an admin for this group.", 403);
        }

        // Approve + add membership in a transaction
        await prisma.$transaction([
            prisma.joinRequest.update({
                where: { id: joinReq.id },
                data: { status: JoinRequestStatus.APPROVED },
            }),
            prisma.groupUser.upsert({
                where: {
                    groupId_userId: {
                        userId: joinReq.userId,
                        groupId: joinReq.groupId,
                    }
                },
                create: {
                    userId: joinReq.userId,
                    groupId: joinReq.groupId,
                    role: "MEMBER",
                },
            update: {}, // membership already exists -> nothing to change
            }),
        ]);

        res.status(200).json({
            message: "User approved and added to the group.",
        });
    } catch (err) {
        console.error("Error approving join request:", err);
        if(err instanceof JoinRequestError){
            res.status(err.statusCode).json({error: err.message});
        } else {
            res.status(500).json({ error: "Failed to approve join request." });
        }
    }     
});

router.put("/join-requests/:id/reject", async(req: SessionRequest, res: Response) => {
    const { id } = req.params;

    try {
        const session = await Session.getSession(req, res);
        const authId = session.getUserId(true);
        //const result = await rejectJoinRequest(id, authId);
        const user: any = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
        });

        const joinReq = await prisma.joinRequest.findUnique({
            where: { id: id },
        });

        if (!joinReq) {
            throw new JoinRequestError("Join request not found.", 404);
        }

        if (joinReq.status !== JoinRequestStatus.PENDING) {
            throw new JoinRequestError("This request is no longer pending.", 400);
        }

        // Verify current user is admin for this group
        const adminMembership = await prisma.groupUser.findUnique({
            where: {
                groupId_userId: {
                userId: user.id,
                groupId: joinReq.groupId,
                },
            },
        });

        if (req.groupRole !== GroupRole.ADMIN) {
            throw new JoinRequestError("You are not an admin for this group.", 403);
        }

        await prisma.joinRequest.update({
            where: { id: id },
            data: { status: JoinRequestStatus.REJECTED },
        });

        res.status(200).json({
            message: "User join request has been rejected.",
        });
    } catch (err) {
        console.error("Error rejecting join request:", err);
        if(err instanceof JoinRequestError){
         res.status(err.statusCode).json({error: err.message});
        }
        res.status(500).json({ error: "Failed to reject join request." });
    }
});