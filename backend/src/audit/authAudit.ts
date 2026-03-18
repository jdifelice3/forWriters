import crypto from "crypto";
import { AuthEventType, AuthOutcome } from "@prisma/client";
import type { Request } from "express";
import type { BaseRequest } from "supertokens-node/lib/build/framework/request";
import prisma from "../database/prisma";
import type { RequestLike } from "../types/Audit";

export async function logAuthEvent(params: {
  req: RequestLike;
  type: AuthEventType;
  outcome: AuthOutcome;
  superTokensId?: string;
  email?: string;
  reasonCode?: string;
  message?: string;
  sessionHandle?: string;
}) {
  const { req } = params;

  const ip = req.ip;
  const ua = getUserAgent(req);
  const requestId = ensureRequestId(req);
  const deviceId = req.deviceId;

  try {
    await prisma.authEvent.create({
      data: {
        type: params.type,
        outcome: params.outcome,
        superTokensId: params.superTokensId,
        email: params.email,
        reasonCode: params.reasonCode,
        message: params.message?.slice(0, 500),

        ip: ip ?? null,
        ipHash: ip ? sha256(ip) : null,

        userAgent: ua ?? null,
        uaHash: ua ? sha256(ua) : null,

        deviceId: deviceId ?? null,
        sessionHandle: params.sessionHandle ?? null,
        requestId,
      },
    });

    // device table upkeep
    await prisma.authDevice.upsert({
    where: { superTokensId_deviceId: { superTokensId: params.superTokensId!, deviceId: deviceId ?? "unknown" } },
    update: { lastSeenAt: new Date(), userAgent: ua },
    create: {
        superTokensId: params.superTokensId!,
        deviceId: deviceId ?? "unknown",
        firstSeenAt: new Date(),
        lastSeenAt: new Date(),
        userAgent: ua ?? null,
        }
    });

  } catch (e) {
    console.error("Auth audit log failed:", e);
  }
}

function hash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function computeLockUntil(failedCount: number) {
  const now = Date.now();
  if (failedCount >= 10) return new Date(now + 1000 * 60 * 60);
  if (failedCount >= 5) return new Date(now + 1000 * 60 * 10);
  return null;
}

export async function recordAuthFailure(superTokensId: string, ipHash?: string, deviceId?: string) {
  const current = await prisma.accountSecurity.upsert({
    where: { superTokensId },
    update: {
      failedCount: { increment: 1 },
      lastFailedAt: new Date(),
      lastIpHash: ipHash,
      lastDeviceId: deviceId,
    },
    create: {
      superTokensId,
      failedCount: 1,
      lastFailedAt: new Date(),
      lastIpHash: ipHash,
      lastDeviceId: deviceId,
    },
  });

  const lockUntil = computeLockUntil(current.failedCount + 1);
  if (lockUntil) {
    await prisma.accountSecurity.update({
      where: { superTokensId },
      data: { lockedUntil: lockUntil },
    });
  }

  return lockUntil;
}

export async function recordAuthSuccess(superTokensId: string, ipHash?: string, deviceId?: string) {
  await prisma.accountSecurity.upsert({
    where: { superTokensId },
    update: {
      failedCount: 0,
      lockedUntil: null,
      lastSuccessAt: new Date(),
      lastIpHash: ipHash,
      lastDeviceId: deviceId,
    },
    create: {
      superTokensId,
      failedCount: 0,
      lastSuccessAt: new Date(),
      lastIpHash: ipHash,
      lastDeviceId: deviceId,
    },
  });
}

export function getHeader(req: RequestLike, key: string): string | undefined {
  // SuperTokens BaseRequest has getHeaderValue (not getHeader),
  // but we can adapt when we call logAuthEvent (see below).
  const k = key.toLowerCase();

  if (req.getHeader) return req.getHeader(k);

  const raw = req.headers?.[k];
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw[0];
  return undefined;
}

export function ensureRequestId(req: RequestLike): string {
  if (req.requestId) return req.requestId;
  const existing = getHeader(req, "x-request-id");
  req.requestId = existing ?? crypto.randomUUID();
  return req.requestId;
}

export function getUserAgent(req: RequestLike): string | undefined {
  return getHeader(req, "user-agent");
}

export function sha256(v: string) {
  return crypto.createHash("sha256").update(v).digest("hex");
}

export function expressReqToRequestLike(req: Request): RequestLike {
  return {
    ip: req.ip,
    headers: req.headers as any,
    deviceId: (req as any).deviceId,
    requestId: (req as any).requestId,
  };
}

export function stReqToRequestLike(req: BaseRequest): RequestLike {
  return {
    getHeader: (key) => req.getHeaderValue(key), // key should be lowercase
    // BaseRequest doesn’t always expose ip directly; if not, use forwarded header:
    ip:
      req.getHeaderValue("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.getHeaderValue("x-real-ip") ??
      undefined,
    deviceId: (req as any).deviceId,   // only if you attach it (see below)
    requestId: (req as any).requestId, // only if you attach it (see below)
  };
}