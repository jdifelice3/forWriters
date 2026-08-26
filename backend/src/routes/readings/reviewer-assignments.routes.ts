import { NextFunction, Request, Response, Router } from "express";
import { ReviewerAssignmentStatus } from "@prisma/client";
import { z } from "zod";
import prisma from "../../database/prisma";
import {
  canManageReviewerAssignments,
  canSubmitToReading,
} from "../../workflow/groupBusinessRules";

const router = Router({ mergeParams: true });

const assignmentInput = z.object({
  reviewerUserId: z.string().min(1),
});

const statusInput = z.object({
  status: z.enum(["ASSIGNED", "IN_PROGRESS", "COMPLETED"]),
});

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

function displayName(user: {
  email: string;
  userProfile: { firstName: string; lastName: string } | null;
}) {
  const profileName = user.userProfile
    ? `${user.userProfile.firstName} ${user.userProfile.lastName}`.trim()
    : "";
  return profileName || user.email;
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [submissions, memberships, workload, currentParticipant] = await Promise.all([
      prisma.readingSubmission.findMany({
        where: { readingId: req.reading.id },
        include: {
          participant: {
            include: {
              user: { include: { userProfile: true } },
            },
          },
          appFile: { include: { appFileMeta: true } },
          reviewerAssignments: {
            include: {
              reviewer: { include: { userProfile: true } },
            },
            orderBy: { assignedAt: "asc" },
          },
        },
        orderBy: { submittedAt: "asc" },
      }),
      prisma.groupUser.findMany({
        where: { groupId: req.group.id },
        include: { user: { include: { userProfile: true } } },
        orderBy: { createdAt: "asc" },
      }),
      prisma.readingReviewerAssignment.groupBy({
        by: ["reviewerUserId"],
        where: {
          status: { not: ReviewerAssignmentStatus.COMPLETED },
          submission: { reading: { groupId: req.group.id } },
        },
        _count: { _all: true },
      }),
      prisma.readingParticipant.findUnique({
        where: {
          readingId_userId: {
            readingId: req.reading.id,
            userId: req.user.id,
          },
        },
      }),
    ]);

    const workloadByUserId = new Map(
      workload.map((item) => [item.reviewerUserId, item._count._all])
    );

    return res.json({
      readingId: req.reading.id,
      groupType: req.group.groupType,
      currentUserId: req.user.id,
      currentGroupRole: req.groupRole,
      canSubmit: canSubmitToReading(
        req.group.groupType,
        req.group.creatorUserId === req.user.id,
        Boolean(currentParticipant)
      ),
      canManageAssignments: canManageReviewerAssignments(
        req.group.groupType,
        req.groupRole,
        req.group.creatorUserId === req.user.id
      ),
      eligibleReviewers: memberships.map(({ user, role }) => ({
        userId: user.id,
        email: user.email,
        name: displayName(user),
        avatarUrl: user.userProfile?.avatarUrl ?? null,
        groupRole: role,
        openAssignmentCount: workloadByUserId.get(user.id) ?? 0,
      })),
      submissions: submissions.map((submission) => ({
        id: submission.id,
        participantId: submission.participantId,
        submittedAt: submission.submittedAt,
        author: {
          userId: submission.participant.user.id,
          name: displayName(submission.participant.user),
          email: submission.participant.user.email,
        },
        manuscript: {
          appFileId: submission.appFile.id,
          appFileMetaId: submission.appFile.appFileMetaId,
          title: submission.appFile.appFileMeta.title,
          description: submission.appFile.appFileMeta.description,
          version: submission.appFile.version,
          filename: submission.appFile.filename.replace(/^\d+-/, ""),
          wordCount: submission.appFile.wordCount,
          pageCount: submission.appFile.pageCount,
        },
        assignments: submission.reviewerAssignments.map((assignment) => ({
          id: assignment.id,
          status: assignment.status,
          assignedAt: assignment.assignedAt,
          completedAt: assignment.completedAt,
          reviewer: {
            userId: assignment.reviewer.id,
            name: displayName(assignment.reviewer),
            email: assignment.reviewer.email,
            avatarUrl: assignment.reviewer.userProfile?.avatarUrl ?? null,
          },
        })),
      })),
    });
  })
);

router.post(
  "/submissions/:submissionId",
  asyncHandler(async (req, res) => {
    const { reviewerUserId } = assignmentInput.parse(req.body);
    const submission = await prisma.readingSubmission.findFirst({
      where: {
        id: req.params.submissionId,
        readingId: req.reading.id,
      },
      include: { participant: true },
    });

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    if (!canManageReviewerAssignments(
      req.group.groupType,
      req.groupRole,
      req.group.creatorUserId === req.user.id
    )) {
      return res.status(403).json({ error: "Only the group admin can assign reviewers" });
    }

    const membership = await prisma.groupUser.findUnique({
      where: {
        groupId_userId: {
          groupId: req.group.id,
          userId: reviewerUserId,
        },
      },
    });

    if (!membership) {
      return res.status(400).json({ error: "Reviewer is not a member of this group" });
    }

    if (submission.participant.userId === reviewerUserId) {
      return res.status(400).json({ error: "Authors cannot review their own submission" });
    }

    const assignment = await prisma.readingReviewerAssignment.upsert({
      where: {
        submissionId_reviewerUserId: {
          submissionId: submission.id,
          reviewerUserId,
        },
      },
      update: {
        status: ReviewerAssignmentStatus.ASSIGNED,
        completedAt: null,
        assignedByUserId: req.user.id,
      },
      create: {
        submissionId: submission.id,
        reviewerUserId,
        assignedByUserId: req.user.id,
      },
    });

    return res.status(201).json(assignment);
  })
);

router.patch(
  "/:assignmentId",
  asyncHandler(async (req, res) => {
    const { status } = statusInput.parse(req.body);
    const assignment = await prisma.readingReviewerAssignment.findFirst({
      where: {
        id: req.params.assignmentId,
        submission: { readingId: req.reading.id },
      },
      include: {
        submission: { include: { participant: true } },
      },
    });

    if (!assignment) {
      return res.status(404).json({ error: "Reviewer assignment not found" });
    }

    const canUpdate =
      canManageReviewerAssignments(
        req.group.groupType,
        req.groupRole,
        req.group.creatorUserId === req.user.id
      ) ||
      assignment.reviewerUserId === req.user.id;
    if (!canUpdate) {
      return res.status(403).json({ error: "Not allowed to update this assignment" });
    }

    const updated = await prisma.readingReviewerAssignment.update({
      where: { id: assignment.id },
      data: {
        status,
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
    });

    return res.json(updated);
  })
);

router.delete(
  "/:assignmentId",
  asyncHandler(async (req, res) => {
    const assignment = await prisma.readingReviewerAssignment.findFirst({
      where: {
        id: req.params.assignmentId,
        submission: { readingId: req.reading.id },
      },
      include: {
        submission: { include: { participant: true } },
      },
    });

    if (!assignment) {
      return res.status(404).json({ error: "Reviewer assignment not found" });
    }

    if (!canManageReviewerAssignments(
      req.group.groupType,
      req.groupRole,
      req.group.creatorUserId === req.user.id
    )) {
      return res.status(403).json({ error: "Only the group admin can remove reviewers" });
    }

    await prisma.readingReviewerAssignment.delete({
      where: { id: assignment.id },
    });
    return res.json({ ok: true });
  })
);

export default router;
