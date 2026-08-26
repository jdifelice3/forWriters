const test = require("node:test");
const assert = require("node:assert/strict");
const {
  createAvatarS3ObjectKey,
  createS3ObjectKey,
  isManagedAvatarS3ObjectKey,
} = require("../dist/files/s3ObjectKey");

test("keeps production-compatible object keys when no prefix is configured", () => {
  delete process.env.AWS_S3_KEY_PREFIX;
  assert.equal(createS3ObjectKey("chapter-one.docx", 42), "42-chapter-one.docx");
});

test("isolates staging uploads beneath the configured S3 prefix", () => {
  process.env.AWS_S3_KEY_PREFIX = "/staging/critique/";
  assert.equal(
    createS3ObjectKey("chapter-one.docx", 42),
    "staging/critique/42-chapter-one.docx"
  );
});

test("stores avatars in a user-specific managed folder", () => {
  process.env.AWS_S3_KEY_PREFIX = "/staging/critique/";
  assert.equal(
    createAvatarS3ObjectKey("user/123", "My photo (final).png", 42),
    "staging/critique/avatars/user-123/42-My-photo-final-.png"
  );
});

test("only recognizes avatar objects under the configured prefix", () => {
  process.env.AWS_S3_KEY_PREFIX = "staging/critique";
  assert.equal(
    isManagedAvatarS3ObjectKey("staging/critique/avatars/user/42-photo.png"),
    true
  );
  assert.equal(
    isManagedAvatarS3ObjectKey("staging/critique/42-manuscript.docx"),
    false
  );
});
