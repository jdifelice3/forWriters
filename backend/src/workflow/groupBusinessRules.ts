import { GroupRole, GroupType } from "@prisma/client";

export function isGroupAdmin(role: GroupRole) {
  return role === GroupRole.ADMIN || role === GroupRole.OWNER;
}

export function canCreateReading(
  groupType: GroupType,
  role: GroupRole,
  isGroupCreator: boolean
) {
  if (!isGroupAdmin(role)) return false;
  if (groupType === GroupType.WRITING) return true;
  return groupType === GroupType.PERSONAL && isGroupCreator;
}

export function canCreateAdHocReview(
  groupType: GroupType,
  role: GroupRole,
  isGroupCreator: boolean
) {
  return (
    groupType === GroupType.PERSONAL &&
    isGroupAdmin(role) &&
    isGroupCreator
  );
}

export function canManageReviewerAssignments(
  groupType: GroupType,
  role: GroupRole,
  isGroupCreator: boolean
) {
  if (!isGroupAdmin(role)) return false;
  if (groupType === GroupType.WRITING) return true;
  return groupType === GroupType.PERSONAL && isGroupCreator;
}

export function canSubmitToReading(
  groupType: GroupType,
  isGroupCreator: boolean,
  isReadingParticipant: boolean
) {
  if (groupType === GroupType.WRITING) return isReadingParticipant;
  return (
    groupType === GroupType.PERSONAL &&
    isGroupCreator &&
    isReadingParticipant
  );
}

export function isSearchableGroup(groupType: GroupType) {
  return groupType === GroupType.WRITING;
}
