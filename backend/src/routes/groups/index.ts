// src/routes/groups/index.ts
import { Router } from "express";
import groupDetailsRoutes from "./details.routes";
import searchRoutes from "./search.routes";
import readingsRouter from "../readings/index";
import groupSlashRoutes from "./group.slash.routes";

const router = Router();

// Sub-routes
router.use("/", groupSlashRoutes);
router.use("/:groupId/readings", readingsRouter);
router.use("/:groupId", groupDetailsRoutes);
router.use("/search", searchRoutes);

export default router;
