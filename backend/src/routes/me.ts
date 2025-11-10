// import express from "express";
// import { verifySession } from "supertokens-node/recipe/session/framework/express";
// import { PrismaClient, Role } from "@prisma/client";

// const prisma = new PrismaClient();

// const router = express.Router();

// router.get("/me", verifySession(), async (req, res) => {
//   const userId = req.session!.getUserId();
//   const user = await prisma.users.findUnique({ where: { superTokensId: userId } });
//   if (!user) return res.status(404).json({ error: "User not found" });
//   res.json({ email: user.email, role: user.role });
// });

// export default router;
