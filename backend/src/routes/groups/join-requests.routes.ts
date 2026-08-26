import { Request, Response, Router } from "express";
import { JoinRequestStatus } from "@prisma/client";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "./group.middleware";
import { isGroupAdmin } from "../../workflow/groupBusinessRules";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

function requireAdmin(req: Request, res: Response) {
  if (isGroupAdmin(req.groupRole)) return true;
  res.status(403).json({ error: "Only the group admin can manage join requests" });
  return false;
}

router.put("/join-requests/:id/approve", async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;

  try {
    const joinRequest = await prisma.joinRequest.findFirst({
      where: {
        id: req.params.id,
        groupId: req.group.id,
      },
    });

    if (!joinRequest) {
      return res.status(404).json({ error: "Join request not found" });
    }
    if (joinRequest.status !== JoinRequestStatus.PENDING) {
      return res.status(400).json({ error: "This request is no longer pending" });
    }

    await prisma.$transaction([
      prisma.joinRequest.update({
        where: { id: joinRequest.id },
        data: { status: JoinRequestStatus.APPROVED },
      }),
      prisma.groupUser.upsert({
        where: {
          groupId_userId: {
            userId: joinRequest.userId,
            groupId: joinRequest.groupId,
          },
        },
        create: {
          userId: joinRequest.userId,
          groupId: joinRequest.groupId,
          role: "MEMBER",
        },
        update: {},
      }),
    ]);

    return res.json({ message: "User approved and added to the group." });
  } catch (error) {
    console.error("Error approving join request", error);
    return res.status(500).json({ error: "Failed to approve join request" });
  }
});

router.put("/join-requests/:id/reject", async (req: Request, res: Response) => {
  if (!requireAdmin(req, res)) return;

  try {
    const joinRequest = await prisma.joinRequest.findFirst({
      where: {
        id: req.params.id,
        groupId: req.group.id,
      },
    });

    if (!joinRequest) {
      return res.status(404).json({ error: "Join request not found" });
    }
    if (joinRequest.status !== JoinRequestStatus.PENDING) {
      return res.status(400).json({ error: "This request is no longer pending" });
    }

    await prisma.joinRequest.update({
      where: { id: joinRequest.id },
      data: { status: JoinRequestStatus.REJECTED },
    });

    return res.json({ message: "User join request has been rejected." });
  } catch (error) {
    console.error("Error rejecting join request", error);
    return res.status(500).json({ error: "Failed to reject join request" });
  }
});

export default router;
