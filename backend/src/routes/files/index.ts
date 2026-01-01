import { Router } from "express";
import filesRoutes from "./files.routes";
import uploadRoutes from "./upload.routes";

const router = Router({ mergeParams: true });

router.use("/", filesRoutes);

// AppFileMeta-scoped operations
router.use("/:appFileMetaId/upload/", uploadRoutes);

export default router;
