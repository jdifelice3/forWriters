import { Router } from "express";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";
import { loadReadingById } from "./readings.middleware";
import { loadReadingParticipantById } from "./participant.middleware"
import participantsRoutes from "./participants.routes";
import readingsRoutes from "./readings.routes";
import readingsSlashRoutes from "./readings.slash.routes";

const router = Router({ mergeParams: true });

// Group context first
router.use(loadGroupById);
router.use(loadGroupMembership);

// Reading context
router.use("/:readingId", loadReadingById, readingsRoutes);
router.use("/", readingsSlashRoutes);
// Sub-resources
router.use("/:readingId/participants", participantsRoutes);
router.use("/:readingId/participants/:participantId", loadReadingParticipantById);
export default router;
