import { 
    AppFileMeta, 
    GroupRole, 
    GroupType, 
    DocumentType 
} from "./domain-types";

export type GroupSummary = {
  id: string;
  name: string;
  role: GroupRole;
  groupType: GroupType;
};

export type GroupContextValue = {
  groups: GroupSummary[];
  activeGroup: GroupSummary | null;
  setActiveGroup: (group: GroupSummary) => void;
  isLoading: boolean;
};

export type FileContextValue = {
  files: AppFileMeta[];
  isLoading: boolean;
};
