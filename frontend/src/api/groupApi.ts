import { apiFetch } from "./client";
import { tokenValidationResponse } from "../types/InviteTypes";
import { CompleteResponse } from "../types/GroupInviteTypes";

export const GroupAPI = {
    sendInvite(groupId?: string, input?: string, role?: string, inputType?: string) {
        return apiFetch(`/groups/${groupId}/invites`, {
            method: "POST",
            body: JSON.stringify({ input, role, inputType}),
            credentials: "include",
        });
    },

    validate(token?: string){
        return apiFetch<tokenValidationResponse>(`/invites/validate`, {
            method: "POST",
            body: JSON.stringify({ token: token }),
        });
    },

    completeInvite(){
        return apiFetch<CompleteResponse>(`/invites/complete`, {
            method: "POST",
        });
    },

    declineInvite(){
        return apiFetch(`/invites/decline`, {
            method: "POST",
        });
    },

}