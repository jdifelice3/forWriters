import { Router } from "express";
import Session from "supertokens-node/recipe/session";
import prisma from "../database/prisma";

const router = Router();

router.get("/:groupId", async(req, res) => {
    
    const groupId = req.params.groupId;
    
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });

    const group = await prisma.group.findUnique({
        where: {
            id: groupId
        },
        select: {
            id: true,
            name: true,
        }
    });

    const groupUser = await prisma.groupUser.findUnique({
        where: {
            groupId_userId: {
                groupId: groupId,
                userId: user.id
            }
        }
    });

    const joinRequest = await prisma.joinRequest.findMany({
        where: {
            groupId: groupId,
            status: "PENDING"
        }
    });

    const reading = await prisma.reading.findMany({
        where: {
            groupId: groupId,
            readingDate: {
                lte: new Date()
            }
        },
        orderBy: {
            readingDate: "desc"
        }
    });

    let attention: any = [];
    if(joinRequest.length > 0){
        
        attention = 
        [
            {
                id: joinRequest[0].id,
                type: "GROUP_JOIN_REQUEST",
                title:`${joinRequest.length} join ${joinRequest.length === 1 ? "request" : "requests"} awaiting approval`,
                ctaLable: "Review",
                href: "/joinadminpage"
            }
        ];
    }
        
    let upComing: any = [];
    if(reading.length > 0){
        upComing = 
                [
            {
                id: reading[0].id,
                type: "READING",
                title: reading[0].name,
                occursAt: new Date(reading[0].readingDate || "").toLocaleDateString(),
                subtitle: reading[0].readingStartTime,
                href: `/groups/${groupId}/readings`
            }
        ];

    }

    res.status(200).json({
        group: {
            id: group?.id,
            name: group?.name,
            role: groupUser?.role
        },
        attention: attention,
        upcoming: upComing,
        resume: [
        //     {
        //     id: "file-789",
        //     type: "FILE",
        //     title: "Blind Study — Draft 3",
        //     subtitle: "Last edited yesterday",
        //     href: "/files/manuscript/789"
        // }
        ]
    });

});
export default router;