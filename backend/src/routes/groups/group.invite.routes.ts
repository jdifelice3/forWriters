import { Request, Response, NextFunction, Router } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";
import { acceptInvite, hashToken } from "../../util/inviteUtil";
import crypto from "crypto";
import { GroupRole } from "../../types/domain-types";
import { sendEmail } from "../../util/email";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

router.get("/", verifySession(), async(req: Request, res: Response) => {
});

router.post("/", verifySession(), async(req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user = await prisma.user.findUnique({
        where: { superTokensId: authId },
        include: { subscription: true },
    });

    if (!user) {
        throw Object.assign(new Error("User not found"), { statusCode: 401 });
    }

    const { emails } = req.body.emails;
    for(let i = 0; i < emails.length; i++){
        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const date = new Date();
        date.setDate(date.getDate() + 7);

        await prisma.groupInvite.create({
            data: {
                groupId: req.group.id,
                email: emails[i],
                role: "MEMBER",
                invitedById: user.id,
                tokenHash: tokenHash,
                expiresAt: date
            },
        });

        const inviteUrl = `${process.env.WEB_HOST}/groups/${req.group.id}/invite/accept?token=${token}`;

        await sendEmail({
            to: emails[i],
            subject: "You've been invited to join a writing group at forWriters",
            html: `
                <p>You’ve been invited to join <b>${req.group.name}</b>.</p>
                <a href="${inviteUrl}">Accept Invitation</a>
                <p>This link expires in 7 days.</p>
            `,
        });
    }
});

router.post("/accept", verifySession(), async (req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    
    try {
        const token = req.body.token;

        if (!token) {
        return res.status(400).json({ error: "Token required" });
        }

        const result = await acceptInvite({
            token,
            authId,
        });

        res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/resend", verifySession(), async(req: Request, res: Response) => {
});

router.post("/revoke", verifySession(), async(req: Request, res: Response) => {
});

export default router;