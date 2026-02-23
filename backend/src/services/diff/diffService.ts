import prisma from "../../database/prisma";
import { createDiff } from "./diffEngine";

export async function getOrCreateDiff(
  appFileMetaId: string,
  fromVersion: number,
  toVersion: number
) {
  const lower = Math.min(fromVersion, toVersion);
  const higher = Math.max(fromVersion, toVersion);

  // 1️⃣ Check cache
  const existing = await prisma.appFileDiff.findUnique({
    where: {
      appFileMetaId_fromVersion_toVersion: {
        appFileMetaId,
        fromVersion: lower,
        toVersion: higher
      }
    }
  });
  console.log('existing', existing)
  if (existing) return existing;
  console.log('lower', lower)
  console.log('higher', higher)
  // 2️⃣ Load versions
  const versions = await prisma.appFile.findMany({
    where: {
      appFileMetaId,
      version: {
        in: [lower, higher]
      }
    },
    select: {
      version: true,
      paragraphsJson: true,
      wordCount: true,
      sentenceCount: true,
      paragraphCount: true
    }
  });
  console.log('versions', versions)

  if (versions.length !== 2) {
    throw new Error("Versions not found");
  }

  const from = versions.find(v => v.version === lower)!;
  const to = versions.find(v => v.version === higher)!;

  console.log('from', from)
  console.log('to', to)
  const diffJson = createDiff(
    from.paragraphsJson as any,
    to.paragraphsJson as any
  );

  // 3️⃣ Compute analytics
  const wordDelta =
    (to.wordCount ?? 0) - (from.wordCount ?? 0);

  const sentenceDelta =
    (to.sentenceCount ?? 0) - (from.sentenceCount ?? 0);

  const paragraphDelta =
    (to.paragraphCount ?? 0) - (from.paragraphCount ?? 0);

  const addedCount =
    diffJson.filter(p => p.status === "added").length;

  const deletedCount =
    diffJson.filter(p => p.status === "deleted").length;

  const modifiedCount =
    diffJson.filter(p => p.status === "modified").length;

  // 4️⃣ Persist
  const saved = await prisma.appFileDiff.create({
    data: {
      blocks: diffJson,
      appFileMetaId,
      fromVersion: lower,
      toVersion: higher,
      wordDelta,
      sentenceDelta,
      paragraphDelta,
      addedCount,
      deletedCount,
      modifiedCount
    }
  });

  return saved;
}