import { Request, Response, NextFunction, Router } from "express";
import prisma from "../../database/prisma";
import { hashToken } from "../../util/inviteUtil";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const router = Router();

router.post("/validate", async (req: Request, res: Response) => {
    try{
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
            if (!invite) {
                return res.status(400).json({ error: "Invalid or expired invite" });
            }
        } else {
            const pending = await prisma.pendingInviteSession.create({
                data: {
                    inviteId: invite.id,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
            });

            res.cookie("pending_invite_session", pending.id, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000,
                path: "/",
            });
            res.json({
                pendingId: pending.id,
                valid: true,
                groupName: invite.group.name,
                email: invite.email,
                invitedBy: `${invite.group.user.userProfile?.firstName} ${invite.group.user.userProfile?.lastName}`
            });
            console.log('cookie set');
        }
    } catch(e: any){
        console.log(e);
    }
});

router.post("/complete", verifySession(), async (req: any, res) => {
  const pendingId = req.cookies.pending_invite_session;
  if (!pendingId) {
    return res.status(400).json({ error: "No pending invite found" });
  }

  const pending = await prisma.pendingInviteSession.findUnique({
    where: { id: pendingId },
    include: {
      invite: true,
    },
  });

  if (!pending || pending.expiresAt <= new Date()) {
    return res.status(400).json({ error: "Pending invite expired" });
  }

  const user = await prisma.user.findUnique({
    where: { superTokensId: req.session.getUserId() },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.email.toLowerCase() !== pending.invite.email.toLowerCase()) {
    return res.status(403).json({
      error: "This invitation was sent to a different email address.",
    });
  }

  const group = await prisma.group.findUnique({
    where: {
        id: pending.invite.groupId
    },
    select: {
        name: true,
        groupType: true
    }
  });

  await prisma.groupUser.upsert({
    where: {
      groupId_userId: {
        groupId: pending.invite.groupId,
        userId: user.id,
      },
    },
    create: {
      groupId: pending.invite.groupId,
      userId: user.id,
      role: pending.invite.role,
    },
    update: {},
  });

  await prisma.groupInvite.update({
    where: { id: pending.invite.id },
    data: { acceptedAt: new Date() },
  });

  await prisma.pendingInviteSession.delete({
    where: { id: pending.id },
  });

  res.clearCookie("pending_invite_session", { path: "/" });

  return res.json({
    success: true,
    groupId: pending.invite.groupId,
    name: group?.name,
    groupType: group?.groupType,
    role: pending.invite.role
  });
});

router.post("/resend", async(req: Request, res: Response) => {

});

router.post("/revoke", async(req: Request, res: Response) => {
});

router.post("/decline", async (req: any, res) => {
  const pendingId = req.cookies.pending_invite_session;
  if (!pendingId) {
    return res.status(400).json({ error: "No pending invite found" });
  }

  const pending = await prisma.pendingInviteSession.findUnique({
    where: { id: pendingId },
    include: {
      invite: true,
    },
  });

  if (!pending || pending.expiresAt <= new Date()) {
    return res.status(400).json({ error: "Pending invite expired" });
  }

  const invite = pending.invite;

  if (
    invite.acceptedAt ||
    invite.declinedAt ||
    invite.revokedAt ||
    invite.expiresAt <= new Date()
  ) {
    return res.status(400).json({ error: "Invite is no longer valid" });
  }

  // Optional: if the user is signed in, enforce email match before decline
  // if (session exists) { load user and compare emails }

  await prisma.groupInvite.update({
    where: { id: invite.id },
    data: { declinedAt: new Date() },
  });

  await prisma.pendingInviteSession.delete({
    where: { id: pending.id },
  });

  res.clearCookie("pending_invite_session", { path: "/" });

  return res.json({ success: true });
});

export default router;