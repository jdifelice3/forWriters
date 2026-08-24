const test = require("node:test");
const assert = require("node:assert/strict");
const { createS3ObjectKey } = require("../dist/files/s3ObjectKey");

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
