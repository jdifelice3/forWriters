import { Router } from "express";
import groupDetailsRoutes from "./details.routes";
import searchRoutes from "./search.routes";
import readingsRouter from "../readings/index";
import groupSlashRoutes from "./group.slash.routes";
import joinRoutes from "./join.routes";
import joinRequestRoutes from "./join-requests.routes"
import notificationsRoutes from "../notifications/notifications.routes";
import groupInviteRoutes from "./group.invite.routes";
import inviteRoutes from "./invite.routes";

const router = Router();

// Sub-routes
router.use("/", groupSlashRoutes);
router.use("/search", searchRoutes);    
router.use("/join", joinRoutes); 
router.use("/", groupSlashRoutes)      
router.use("/:groupId/readings", readingsRouter);
router.use("/:groupId/notifications", notificationsRoutes);
router.use("/:groupId", groupDetailsRoutes);  
router.use("/:groupId/join", joinRequestRoutes);
router.use("/:groupId/invites", groupInviteRoutes);
router.use("/invites", inviteRoutes);

export default router;