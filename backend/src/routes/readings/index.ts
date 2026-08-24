import { Router } from "express";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";
import { loadReadingById } from "./readings.middleware";
import participantsRoutes from "./participants.routes";
import readingsRoutes from "./readings.routes";
import readingsSlashRoutes from "./readings.slash.routes";
import reviewerAssignmentsRoutes from "./reviewer-assignments.routes";

const router = Router({ mergeParams: true });

// Group context first
router.use(loadGroupById);
router.use(loadGroupMembership);

// Reading context
router.use(
  "/:readingId/reviewer-assignments",
  loadReadingById,
  reviewerAssignmentsRoutes
);
router.use("/:readingId", loadReadingById, readingsRoutes);
router.use("/", readingsSlashRoutes);
// Sub-resources
router.use("/:readingId/participants/:participantId", participantsRoutes);
export default router;
