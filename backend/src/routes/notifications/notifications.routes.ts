import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";

const router = Router({ mergeParams: true });

router.get("/", async(req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({where: {superTokensId: authId,},});
    
    const notifications = await prisma.notification.findMany({
        where: {
            userId: user.id,
            readAt: null
        }
    });

    res.status(200).json(notifications);
});

router.post("/", async(req, res) => {
    const { message, notificationType, userId, entityId, href } = req.body;

    const notification = await prisma.notification.create({
        data: {
            message: message,
            type: notificationType,
            userId: userId,
            entityId: entityId,
            href
        }
    });

    res.status(200).json(notification);
})

router.put("/:notificationId", async(req, res) => {
    const notificationId = req.params.notificationId;
    const notification = await prisma.notification.update({
        data: {
            readAt: new Date()
        },
        where: {
            id: notificationId
        }
    });

    res.status(200).json(notification);
});

export default router;