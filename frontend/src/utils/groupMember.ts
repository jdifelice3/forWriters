import { GroupUser } from "../types/domain-types";

export function groupMemberName(member: GroupUser) {
  const profile = member.user.userProfile;
  if (!profile?.firstName || !profile?.lastName) return "Name not provided";
  return `${profile.firstName} ${profile.lastName}`;
}
