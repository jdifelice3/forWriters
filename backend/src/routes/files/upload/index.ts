import { Router } from "express";
import uploadRoutes from "./upload.routes";

const router = Router({ mergeParams: true });

router.use("/", uploadRoutes);

// AppFileMeta-scoped operations
router.use("/:appFileMetaId/upload/", uploadRoutes);
router.use("/upload", uploadRoutes);

export default router;