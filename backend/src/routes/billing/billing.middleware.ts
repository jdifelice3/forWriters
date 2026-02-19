import { Request, Response, NextFunction } from "express";
import Session from "supertokens-node/recipe/session";
import prisma from "../../database/prisma";

export async function requirePro(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user = await prisma.user.findUnique({
      where: { superTokensId: authId },
      include: { subscription: true },
    });
    // console.log("authId", authId)
    // console.log("user.id", user?.id)
    if (!user || !user.subscription) {
      return res.status(403).json({ error: "Pro subscription required" });
    }
    const { tier, status } = user.subscription;
    //console.log('tier, status', tier, status)
    const isPro =
      tier === "PROFESSIONAL" &&
      (status === "active" || status === "trialing");
    //console.log('isPro', isPro)
      if (!isPro) {
        //console.log("Pro subscription required")
      return res.status(403).json({ error: "Pro subscription required" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
