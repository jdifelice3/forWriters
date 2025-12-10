import express from "express";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", verifySession(), async (req, res) => {
  console.log("in GET /api/me Route — PHASE 2");

  // 1. Get the session
  let session = await Session.getSession(req, res);

  // 2. Extract Supertokens userId
  const authId = session.getUserId(true);
  console.log("authId =", authId);

  // 3. Do ONLY this prisma lookup
  const user = await prisma.user.findUnique({
    where: { superTokensId: authId },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    console.log("User NOT found in DB");
    return res.status(404).json({ error: "User not found in database" });
  }

  console.log("User found:", user);
  return res.json(user);
});


// router.get("/", verifySession() as any, async (req, res) => {
//   console.log("in GET /api/me Route");
//   try {
//     const session = (req as any).session;

//     console.log('session:', session);

//     const authId = session.getUserId(true);   
    
//     const user = await prisma.user.findUnique({
//       where: { superTokensId: authId },
//       select: { id: true, email: true, username: true, createdAt: true, updatedAt: true },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found in database" });
//     }

//     return res.json(user);
//   } catch (err) {
//     console.error("In meRoute.ts, GET:", err);
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// });

export default router;
