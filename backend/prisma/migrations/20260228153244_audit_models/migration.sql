-- CreateEnum
CREATE TYPE "AuthEventType" AS ENUM ('SIGN_UP', 'SIGN_IN', 'SIGN_OUT', 'SESSION_REFRESH', 'SESSION_REVOKE', 'PASSWORD_RESET_REQUEST', 'PASSWORD_RESET_SUCCESS', 'EMAIL_VERIFIED', 'ROLE_CHANGED', 'SIGN_IN_FAILED', 'SIGN_IN_BLOCKED', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED');

-- CreateEnum
CREATE TYPE "AuthOutcome" AS ENUM ('SUCCESS', 'FAILURE', 'BLOCKED');

-- CreateTable
CREATE TABLE "AuthEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "superTokensId" TEXT,
    "email" TEXT,
    "type" "AuthEventType" NOT NULL,
    "outcome" "AuthOutcome" NOT NULL,
    "reasonCode" TEXT,
    "message" TEXT,
    "ip" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "uaHash" TEXT,
    "deviceId" TEXT,
    "sessionHandle" TEXT,
    "requestId" TEXT,
    "geoCountry" TEXT,
    "geoRegion" TEXT,
    "geoCity" TEXT,
    "asn" TEXT,
    "isp" TEXT,
    "riskScore" INTEGER,

    CONSTRAINT "AuthEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountSecurity" (
    "superTokensId" TEXT NOT NULL,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "lastFailedAt" TIMESTAMP(3),
    "lastSuccessAt" TIMESTAMP(3),
    "lastIpHash" TEXT,
    "lastDeviceId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountSecurity_pkey" PRIMARY KEY ("superTokensId")
);

-- CreateTable
CREATE TABLE "AuthDevice" (
    "id" TEXT NOT NULL,
    "superTokensId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "label" TEXT,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trusted" BOOLEAN NOT NULL DEFAULT false,
    "userAgent" TEXT,

    CONSTRAINT "AuthDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionIndex" (
    "sessionHandle" TEXT NOT NULL,
    "superTokensId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" TEXT,
    "ipHash" TEXT,

    CONSTRAINT "SessionIndex_pkey" PRIMARY KEY ("sessionHandle")
);

-- CreateIndex
CREATE INDEX "AuthEvent_superTokensId_createdAt_idx" ON "AuthEvent"("superTokensId", "createdAt");

-- CreateIndex
CREATE INDEX "AuthEvent_ipHash_createdAt_idx" ON "AuthEvent"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "AuthEvent_deviceId_createdAt_idx" ON "AuthEvent"("deviceId", "createdAt");

-- CreateIndex
CREATE INDEX "AuthDevice_superTokensId_lastSeenAt_idx" ON "AuthDevice"("superTokensId", "lastSeenAt");

-- CreateIndex
CREATE UNIQUE INDEX "AuthDevice_superTokensId_deviceId_key" ON "AuthDevice"("superTokensId", "deviceId");

-- CreateIndex
CREATE INDEX "SessionIndex_superTokensId_lastSeenAt_idx" ON "SessionIndex"("superTokensId", "lastSeenAt");
