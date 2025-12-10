import express from "express";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", verifySession() as any, async (req, res) => {
  console.log("in GET /api/me Route");
  try {
    const session = (req as any).session;

    console.log('session:', session);

    const authId = session.getUserId(true);   
    
    const user = await prisma.user.findUnique({
      where: { superTokensId: authId },
      select: { id: true, email: true, username: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }

    res.json(user);
  } catch (err) {
    console.error("In meRoute.ts, GET:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
