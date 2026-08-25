import { Request, Response, Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { z } from "zod";
import prisma from "../../database/prisma";
import { hashToken } from "../../util/inviteUtil";

const router = Router();

const tokenInput = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/i),
});

const pendingInput = z.object({
  pendingId: z.string().uuid().optional(),
});

const pendingCookieMaxAge = 60 * 60 * 1000;

function pendingCookieOptions() {
  const crossSiteStaging = process.env.WEB_HOST?.endsWith(".onrender.com") ?? false;
  return {
    httpOnly: true,
    secure: true,
    sameSite: crossSiteStaging ? "none" as const : "lax" as const,
    maxAge: pendingCookieMaxAge,
    path: "/",
  };
}

function getPendingId(req: Request) {
  const parsed = pendingInput.safeParse(req.body ?? {});
  return parsed.success
    ? parsed.data.pendingId ?? req.cookies.pending_invite_session
    : req.cookies.pending_invite_session;
}

router.post("/validate", async (req: Request, res: Response) => {
  try {
    const parsed = tokenInput.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid invitation link" });
    }

    const invite = await prisma.groupInvite.findFirst({
      where: {
        tokenHash: hashToken(parsed.data.token),
        expiresAt: { gt: new Date() },
        acceptedAt: null,
        declinedAt: null,
        revokedAt: null,
      },
      include: {
        group: {
          include: {
            user: {
              include: {
                userProfile: {
                  select: { firstName: true, lastName: true },
                },
              },
            },
          },
        },
      },
    });

    if (!invite) {
      return res.status(400).json({ error: "Invalid or expired invite" });
    }

    const pending = await prisma.pendingInviteSession.create({
      data: {
        inviteId: invite.id,
        expiresAt: new Date(Date.now() + pendingCookieMaxAge),
      },
    });

    res.cookie("pending_invite_session", pending.id, pendingCookieOptions());
    return res.json({
      pendingId: pending.id,
      valid: true,
      groupName: invite.group.name,
      email: invite.email,
      role: invite.role,
      invitedBy: `${invite.group.user.userProfile?.firstName ?? ""} ${invite.group.user.userProfile?.lastName ?? ""}`.trim(),
    });
  } catch (error) {
    console.error("Invitation validation failed", error);
    return res.status(500).json({ error: "The invitation could not be validated" });
  }
});

router.post("/complete", verifySession(), async (req: any, res) => {
  try {
    const pendingId = getPendingId(req);
    if (!pendingId) {
      return res.status(400).json({ error: "No pending invite found" });
    }

    const pending = await prisma.pendingInviteSession.findUnique({
      where: { id: pendingId },
      include: { invite: true },
    });

    if (!pending || pending.expiresAt <= new Date()) {
      return res.status(400).json({ error: "Pending invite expired" });
    }

    if (
      pending.invite.acceptedAt ||
      pending.invite.declinedAt ||
      pending.invite.revokedAt ||
      pending.invite.expiresAt <= new Date()
    ) {
      return res.status(400).json({ error: "Invite is no longer valid" });
    }

    const user = await prisma.user.findUnique({
      where: { superTokensId: req.session.getUserId() },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email.trim().toLowerCase() !== pending.invite.email.trim().toLowerCase()) {
      return res.status(403).json({
        error: "This invitation was sent to a different email address.",
      });
    }

    const group = await prisma.group.findUnique({
      where: { id: pending.invite.groupId },
      select: { name: true, groupType: true },
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    await prisma.$transaction([
      prisma.groupUser.upsert({
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
      }),
      prisma.groupInvite.update({
        where: { id: pending.invite.id },
        data: { acceptedAt: new Date() },
      }),
      prisma.pendingInviteSession.delete({
        where: { id: pending.id },
      }),
    ]);

    res.clearCookie("pending_invite_session", {
      path: "/",
      secure: true,
      sameSite: pendingCookieOptions().sameSite,
    });

    return res.json({
      success: true,
      groupId: pending.invite.groupId,
      name: group.name,
      groupType: group.groupType,
      role: pending.invite.role,
    });
  } catch (error) {
    console.error("Invitation completion failed", error);
    return res.status(500).json({ error: "The invitation could not be completed" });
  }
});

router.post("/resend", async (_req: Request, res: Response) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.post("/revoke", async (_req: Request, res: Response) => {
  return res.status(501).json({ error: "Not implemented" });
});

router.post("/decline", async (req: Request, res: Response) => {
  try {
    const pendingId = getPendingId(req);
    if (!pendingId) {
      return res.status(400).json({ error: "No pending invite found" });
    }

    const pending = await prisma.pendingInviteSession.findUnique({
      where: { id: pendingId },
      include: { invite: true },
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

    await prisma.$transaction([
      prisma.groupInvite.update({
        where: { id: invite.id },
        data: { declinedAt: new Date() },
      }),
      prisma.pendingInviteSession.delete({
        where: { id: pending.id },
      }),
    ]);

    res.clearCookie("pending_invite_session", {
      path: "/",
      secure: true,
      sameSite: pendingCookieOptions().sameSite,
    });
    return res.json({ success: true });
  } catch (error) {
    console.error("Invitation decline failed", error);
    return res.status(500).json({ error: "The invitation could not be declined" });
  }
});

export default router;
