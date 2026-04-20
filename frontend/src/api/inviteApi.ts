import { apiFetch } from "./client";
import { tokenValidationResponse } from "../types/InviteTypes";

export const InviteAPI = {
    sendInvites(groupId: string, emails: string[]){
        return apiFetch(`groups/${groupId}/invite`, {
            method: "POST",
            body: JSON.stringify({emails: emails}),
            credentials: "include"
        });
    },

    validate(token: string | undefined){
        return apiFetch<tokenValidationResponse>(`/groups/invites/validate`, {
            method: "POST",
            body: JSON.stringify({ token: token }),
            credentials: "include"
        });
    }
}