import { GroupMemberRole, GroupType } from "./domain-types";
export type GroupSummary = {
  id: string;
  name: string;
  role: GroupMemberRole;
  groupType: GroupType;
};

export type GroupContextValue = {
  groups: GroupSummary[];
  activeGroup: GroupSummary | null;
  setActiveGroup: (group: GroupSummary) => void;
  isLoading: boolean;
};
