import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "./group.middleware";
import Session from "supertokens-node/recipe/session";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

router.get("/", async(req, res) => {
    const joinRequest = await prisma.joinRequest.findMany({
        where: {
            groupId: req.group.id,
            status: "PENDING"
        }
    });

    res.status(200).json([
        {
            id: "123456789",//joinRequest[0].id,
            type: "GROUP_JOIN_REQUEST",
            message:`${joinRequest.length} join ${joinRequest.length === 1 ? "request" : "requests"} awaiting approval`,
            entityId: "group-id",
            createdAt: new Date().toLocaleDateString(),//joinRequest[0].createdAt,
            href: "/joinadminpage"
        }
    ]);
});

export default router;