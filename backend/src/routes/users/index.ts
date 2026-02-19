// src/routes/groups/index.ts
import { Router } from "express";
import searchRoutes from "../user.search.routes";
import userProfileRouter from "./user.profile.routes"

const router = Router();

// Sub-routes
router.use("/search", searchRoutes);
router.use("/userprofile", userProfileRouter);
export default router;