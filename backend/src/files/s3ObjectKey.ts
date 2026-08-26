function normalizePrefix(prefix: string | undefined) {
  return prefix?.trim().replace(/^\/+|\/+$/g, "") ?? "";
}

function sanitizePathPart(value: string) {
  return value.trim().replace(/[^a-zA-Z0-9._-]+/g, "-");
}

export function createS3ObjectKey(originalName: string, now = Date.now()) {
  const filename = `${now}-${originalName}`;
  const prefix = normalizePrefix(process.env.AWS_S3_KEY_PREFIX);
  return prefix ? `${prefix}/${filename}` : filename;
}

export function createAvatarS3ObjectKey(
  userId: string,
  originalName: string,
  now = Date.now()
) {
  const prefix = normalizePrefix(process.env.AWS_S3_KEY_PREFIX);
  const safeUserId = sanitizePathPart(userId) || "user";
  const safeFilename = sanitizePathPart(originalName) || "profile-image";
  const key = `avatars/${safeUserId}/${now}-${safeFilename}`;
  return prefix ? `${prefix}/${key}` : key;
}

export function isManagedAvatarS3ObjectKey(key: string) {
  const prefix = normalizePrefix(process.env.AWS_S3_KEY_PREFIX);
  const avatarPrefix = prefix ? `${prefix}/avatars/` : "avatars/";
  return key.startsWith(avatarPrefix);
}
