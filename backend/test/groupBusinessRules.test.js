const test = require("node:test");
const assert = require("node:assert/strict");
const {
  canCreateAdHocReview,
  canCreateReading,
  canManageReviewerAssignments,
  canSubmitToReading,
  isSearchableGroup,
} = require("../dist/workflow/groupBusinessRules");

test("writing-group readings and reviewer assignments are admin managed", () => {
  assert.equal(canCreateReading("WRITING", "ADMIN", false), true);
  assert.equal(canCreateReading("WRITING", "MEMBER", false), false);
  assert.equal(canManageReviewerAssignments("WRITING", "ADMIN", false), true);
  assert.equal(canManageReviewerAssignments("WRITING", "MEMBER", false), false);
});

test("only the personal-group creator can create ad-hoc work", () => {
  assert.equal(canCreateAdHocReview("PERSONAL", "ADMIN", true), true);
  assert.equal(canCreateAdHocReview("PERSONAL", "ADMIN", false), false);
  assert.equal(canCreateAdHocReview("WRITING", "ADMIN", true), false);
  assert.equal(canManageReviewerAssignments("PERSONAL", "ADMIN", true), true);
  assert.equal(canManageReviewerAssignments("PERSONAL", "ADMIN", false), false);
});

test("submission eligibility follows the group type", () => {
  assert.equal(canSubmitToReading("WRITING", false, true), true);
  assert.equal(canSubmitToReading("WRITING", false, false), false);
  assert.equal(canSubmitToReading("PERSONAL", true, true), true);
  assert.equal(canSubmitToReading("PERSONAL", false, true), false);
});

test("only writing groups appear in group search", () => {
  assert.equal(isSearchableGroup("WRITING"), true);
  assert.equal(isSearchableGroup("PERSONAL"), false);
  assert.equal(isSearchableGroup("STUDIO"), false);
});
