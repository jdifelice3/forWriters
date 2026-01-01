// src/routes/groups/group.middleware.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { SessionRequest } from "supertokens-node/framework/express";

export async function loadGroupById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { groupId } = req.params;
    console.log('in group.middleware loadGroupById')
    console.log('req.path', req.path)
    console.log('req.params', req.params)
    const group = await prisma.group.findUnique({
        where: { id: groupId },
    });

    if (!group) {
        return res.status(404).json({ error: "Group not found" });
    }

    req.group = group;
    next();
}

export async function loadGroupMembership(
    req: SessionRequest,
    res: Response,
    next: NextFunction
) {
    if(!req.session) return;

    const authId = req.session.getUserId();
        //const joinRequest = await 
    const user: any = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    });

    const membership = await prisma.groupUser.findUnique({
        where: {
            groupId_userId: {
                groupId: req.group.id,
                userId: user.id,
            },
        },
    });

    if (!membership) {
        return res.status(403).json({ error: "Not a group member" });
    }

    req.groupRole = membership.role;
    next();
}