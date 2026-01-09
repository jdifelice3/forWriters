import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "./group.middleware";
import Session from "supertokens-node/recipe/session";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

router.get("/", async(req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({where: {superTokensId: authId}});

    const notifications = await prisma.notification.findMany({
        where: {
            entityId: req.group.id,
            readAt: null
        }
    });

    res.status(200).json(notifications);
});

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