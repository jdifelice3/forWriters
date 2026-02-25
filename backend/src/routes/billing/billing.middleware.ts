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
    //Temporarily disable this check. For reading group testing
    // if (!user || !user.subscription) {
    //   return res.status(403).json({ error: "Pro subscription required" });
    // }
    // const { tier, status } = user.subscription;
    // const isPro =
    //   tier === "PROFESSIONAL" &&
    //   (status === "active" || status === "trialing");
    // if (!isPro) {
    //   return res.status(403).json({ error: "Pro subscription required" });
    // }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
