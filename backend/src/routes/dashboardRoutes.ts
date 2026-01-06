import { Router } from "express";
import Session from "supertokens-node/recipe/session";
import prisma from "../database/prisma";

const router = Router();

router.get("/:groupId", async(req, res) => {
    console.log('in dashboardRoutes GET /')
    const groupId = req.params.groupId;
    console.log('groupId', groupId)

    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });
    console.log('user.id', user.id)
    const group = await prisma.group.findUnique({
        where: {
            id: groupId
        },
        select: {
            id: true,
            name: true,
        }
    });

    console.log('group', group)

    const groupUser = await prisma.groupUser.findUnique({
        where: {
            groupId_userId: {
                groupId: groupId,
                userId: user.id
            }
        }
    });

    console.log('groupUser', groupUser)

    res.status(200).json({
        group: {
            id: group?.id,
            name: group?.name,
            role: groupUser?.role
        },
        attention: [{
            id: "join-req-1",
            type: "GROUP_JOIN_REQUEST",
            title: "2 join requests awaiting approval",
            ctaLabel: "Review",
            href: "/admin/join-requests?group=abc"
        }],
        upcoming: [{
            id: "reading-123",
            type: "READING",
            title: "Friday Night Reading",
            occursAt: "2025-01-19T19:00:00Z",
            href: "/readings/123"
            }],
        resume: [{
            id: "file-789",
            type: "FILE",
            title: "Blind Study — Draft 3",
            subtitle: "Last edited yesterday",
            href: "/files/manuscript/789"
        }]
    });

});
export default router;