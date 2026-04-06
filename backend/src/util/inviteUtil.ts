// domain/inviteDomain.ts

import crypto from "crypto";
import prisma from "../database/prisma";

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
}

const normalizeEmail = (email: string) => {
  return email.trim().toLowerCase();
}

export const acceptInvite = async({
  token,
  authId,
}: {
  token: string;
  authId: string;
}) => {
  const tokenHash = hashToken(token);

  const invite = await prisma.groupInvite.findFirst({
    where: {
      tokenHash,
      expiresAt: { gt: new Date() },
      acceptedAt: null,
      revokedAt: null,
    },
  });

  if (!invite) {
    throw new Error("Invalid or expired invite");
  }

  const user = await prisma.user.findUnique({
    where: { superTokensId: authId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 🔴 THIS is the authenticated-stage check
  if (normalizeEmail(user.email) !== normalizeEmail(invite.email)) {
    throw new Error(
      `This invitation was sent to ${invite.email}, but you are signed in as ${user.email}`
    );
  }

  // Idempotent membership creation
  await prisma.groupUser.upsert({
    where: {
      groupId_userId: {
        groupId: invite.groupId,
        userId: user.id,
      },
    },
    create: {
      groupId: invite.groupId,
      userId: user.id,
      role: invite.role,
    },
    update: {},
  });

  await prisma.groupInvite.update({
    where: { id: invite.id },
    data: { acceptedAt: new Date() },
  });

  return { success: true, groupId: invite.groupId };
}