import express from "express";
import Session from "supertokens-node/recipe/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  
  try {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    
    const user = await prisma.user.findUnique({
      where: { superTokensId: authId },
      select: { id: true, email: true, username: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("In meRoute.ts, GET:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
