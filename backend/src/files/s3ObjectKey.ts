function normalizePrefix(prefix: string | undefined) {
  return prefix?.trim().replace(/^\/+|\/+$/g, "") ?? "";
}

export function createS3ObjectKey(originalName: string, now = Date.now()) {
  const filename = `${now}-${originalName}`;
  const prefix = normalizePrefix(process.env.AWS_S3_KEY_PREFIX);
  return prefix ? `${prefix}/${filename}` : filename;
}
