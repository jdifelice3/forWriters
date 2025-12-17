import express from "express";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", verifySession(), async (req, res) => {
  
  // 1. Get the session
  let session = await Session.getSession(req, res);

  // 2. Extract Supertokens userId
  const authId = session.getUserId(true);
  
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

  return res.json(user);
});

router.get("/groups", verifySession(), async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

    if(!user) {
        throw new Error("User not found");
    }
  const groups = await prisma.groupUser.findMany({
    where: {
        userId: user.id,
    },
    select: {
      group: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
            role: true
        }
      },
    },
  });
console.log('groups',groups)
console.log('groups mapped', groups.map(g => ({
      id: g.group.id,
      name: g.group.name,
      role: g.user.role,
    })))
  res.json(
    groups.map(g => ({
      id: g.group.id,
      name: g.group.name,
      role: g.user.role,
    }))
  );
});

export default router;
