import crypto from "crypto";
import { Request, Response, Router } from "express";
import { Resend } from "resend";
import { z } from "zod";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";

const router = Router({ mergeParams: true });

const inviteInput = z.object({
  input: z.string().trim().min(1),
  role: z.enum(["MEMBER", "READER", "ADMIN"]),
  inputType: z.enum(["USERID", "EMAIL"]),
});

const emailAddress = z.string().email();

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

router.use(loadGroupById);
router.use(loadGroupMembership);

router.get("/", async (_req: Request, res: Response) => {
  return res.json([]);
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const parsed = inviteInput.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Enter a valid invitee and role" });
    }

    const { input, role, inputType } = parsed.data;
    let email = input;

    if (inputType === "USERID") {
      const inviteUser = await prisma.user.findUnique({
        where: { id: input },
        select: { email: true },
      });
      email = inviteUser?.email ?? "";
    }

    email = email.trim().toLowerCase();
    if (!emailAddress.safeParse(email).success) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }

    const existingMember = await prisma.groupUser.findFirst({
      where: {
        groupId: req.group.id,
        user: {
          email: { equals: email, mode: "insensitive" },
        },
      },
      select: { id: true },
    });

    if (existingMember) {
      return res.status(409).json({ error: "This person is already a member of the group" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const existingInvite = await prisma.groupInvite.findFirst({
      where: {
        groupId: req.group.id,
        email: { equals: email, mode: "insensitive" },
      },
      select: { id: true },
    });

    const invite = existingInvite
      ? await prisma.groupInvite.update({
        where: { id: existingInvite.id },
        data: {
          email,
          role,
          invitedById: req.user.id,
          tokenHash,
          expiresAt,
          acceptedAt: null,
          declinedAt: null,
          revokedAt: null,
        },
        select: { id: true },
      })
      : await prisma.groupInvite.create({
        data: {
          groupId: req.group.id,
          email,
          role,
          invitedById: req.user.id,
          tokenHash,
          expiresAt,
        },
        select: { id: true },
      });

    const webHost = process.env.WEB_HOST;
    const apiKey = process.env.RESEND_API_KEY;
    if (!webHost || !apiKey) {
      console.error("Group invitation email configuration is missing");
      return res.status(503).json({
        error: "Invitation email is temporarily unavailable. Please try again later.",
      });
    }

    const inviteUrl = `${webHost}/groups/${req.group.id}/invite/accept?token=${token}`;
    const safeGroupName = escapeHtml(req.group.name);
    const safeInviteUrl = escapeHtml(inviteUrl);
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "support@forwriters.ink",
      to: email,
      subject: "You've been invited to join a writing group at forWriters",
      html: `
        <p>You’ve been invited to join <b>${safeGroupName}</b>.</p>
        <a href="${safeInviteUrl}">Accept Invitation</a>
        <p>This link expires in 7 days.</p>
      `,
      text: `You've been invited to join ${req.group.name}. Accept the invitation: ${inviteUrl}`,
    });

    if (result.error) {
      console.error("Group invitation email failed", {
        name: result.error.name,
        statusCode: result.error.statusCode,
      });
      return res.status(502).json({
        error: "The invitation was saved, but the email could not be sent. Please try again.",
      });
    }

    return res.status(201).json({
      ok: true,
      inviteId: invite.id,
      emailId: result.data.id,
    });
  } catch (error) {
    console.error("Group invitation failed", error);
    return res.status(500).json({
      error: "The invitation could not be sent. Please try again.",
    });
  }
});

export default router;
