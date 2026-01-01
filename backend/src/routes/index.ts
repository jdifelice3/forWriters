import { Router, Request, Response, NextFunction } from "express";
import { verifySession } from
  "supertokens-node/recipe/session/framework/express";

import userRoutes from "./users";
//import userProfileRoutes from "./userProfileRoutes";
import fileRoutes from "./files/index";
import pdfRoutes from "./pdfRoutes";
import groupRoutes from "./groups";
import meRoutes from "./me.routes";
import filesApiRoutes from "./files.api.routes";

const router = Router();

/**
 * Public routes (no session)
 */
router.use("/pdfs", pdfRoutes);

/**
 * Authenticated routes
 */
router.use(verifySession());

// Everything below this line has req.session
router.use("/users", userRoutes);
//router.use("/userProfile", userProfileRoutes);
router.use("/files", fileRoutes);
router.use("/filesApi", filesApiRoutes);
router.use("/me", meRoutes);
router.use("/groups", groupRoutes);

// General Error Handling
router.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
export default router;
