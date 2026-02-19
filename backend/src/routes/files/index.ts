import { Router } from "express";
import filesRoutes from "./files.routes";

const router = Router({ mergeParams: true });

router.use("/", filesRoutes);

export default router;
