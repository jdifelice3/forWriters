import { GroupMemberRole } from "./domain-types";

export type GroupSummary = {
  id: string;
  name: string;
  role: GroupMemberRole;
};

export type GroupContextValue = {
  groups: GroupSummary[];
  activeGroup: GroupSummary | null;
  setActiveGroup: (group: GroupSummary) => void;
  isLoading: boolean;
};
