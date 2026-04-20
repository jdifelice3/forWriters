import { Request, Response, NextFunction, Router } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";
import crypto from "crypto";
import { Resend } from "resend";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

router.get("/", async(req: Request, res: Response) => {
});

router.post("/", async(req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user = await prisma.user.findUnique({
        where: { superTokensId: authId },
        include: { subscription: true },
    });

    const { input, role, inputType } = req.body;
    let email: string;

    if(inputType === "USERID"){
        const inviteUser = await prisma.user.findUnique({
            where: {
                id: input
            },
            select: {
                email: true
            }
        });

        email = inviteUser ? inviteUser.email : "";
    } else {
        email = input;
    }

    if(!email){
        throw Object.assign(new Error("Invite user email not found"), { statusCode: 401 });
    }

    if (!user) {
        throw Object.assign(new Error("User not found"), { statusCode: 401 });
    }

    // const { emails } = req.body.emails;
    // for(let i = 0; i < emails.length; i++){
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
                email: email,
                role: role,
                invitedById: user.id,
                tokenHash: tokenHash,
                expiresAt: date
            },
        });

        const inviteUrl = `${process.env.WEB_HOST}/groups/${req.group.id}/invite/accept?token=${token}`;
        const resend = new Resend(process.env.RESEND_API_KEY);
        const result = await resend.emails.send({
            from: "support@forwriters.ink",
            to: email,
            subject: "You've been invited to join a writing group at forWriters",
            html: `
                <p>You’ve been invited to join <b>${req.group.name}</b>.</p>
                <a href="${inviteUrl}">Accept Invitation</a>
                <p>This link expires in 7 days.</p>
            `,
        });
        console.log('send email result', result);
        res.json(result);
});

export default router;