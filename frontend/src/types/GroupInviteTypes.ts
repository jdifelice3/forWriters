import { GroupRole, GroupType } from "./domain-types";

export type CompleteResponse = {
    success: boolean,
    groupId: string,
    role: GroupRole,
    name: string,
    groupType: GroupType,
}