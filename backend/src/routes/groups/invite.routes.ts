import { Request, Response, NextFunction, Router } from "express";
import prisma from "../../database/prisma";
import { hashToken } from "../../util/inviteUtil";

const router = Router();

router.post("/validate", async (req: Request, res: Response) => {
    const token = req.body.token;
    const tokenHash = hashToken(token);

    const invite = await prisma.groupInvite.findFirst({
        where: {
            tokenHash,
            expiresAt: { gt: new Date() },
            acceptedAt: null,
        },
        include: { 
            group: {
                include: {
                    user: {
                        include: {
                            userProfile: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    }
                }
            }
            
        },
    });

    if (!invite) {
        //return res.status(400).json({ valid: false });
        res.json({
            valid: false,
            groupName: "",
            email: ""
        });
    } else {
        res.json({
            valid: true,
            groupName: invite.group.name,
            email: invite.email,
            invitedBy: `${invite.group.user.userProfile?.firstName} ${invite.group.user.userProfile?.lastName}`
        });
    }
});

export default router;