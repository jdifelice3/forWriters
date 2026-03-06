
import type { Request, Response, NextFunction } from "express";

const DEVICE_COOKIE = "fw_device";

export function deviceIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = req.cookies?.[DEVICE_COOKIE];
  if (existing && typeof existing === "string") {
    (req as any).deviceId = existing;
    return next();
  }

  const deviceId = crypto.randomUUID();
  (req as any).deviceId = deviceId;

  res.cookie(DEVICE_COOKIE, deviceId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    domain: process.env.NODE_ENV === "production" ? ".forwriters.ink" : undefined,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 2, // 2 years
  });

  next();
}

export function requestIdMiddleware(req: Request, _res: Response, next: NextFunction) {
  (req as any).requestId = req.headers["x-request-id"]?.toString() ?? crypto.randomUUID();
  next();
}

