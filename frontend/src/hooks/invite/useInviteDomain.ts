import { useCallback } from "react";
import { InviteAPI } from "../../api/inviteApi";
import { tokenValidationResponse } from "../../types/InviteTypes";

export function useInviteDomain() {

    const sendInvites = useCallback(async(groupId: string, emails: string[]) => {
        const result = await InviteAPI.sendInvites(groupId, emails);
        return result;
    }, []);

    const validate = useCallback(async (token: string | undefined) => {
        if (!token) return;
            const result: tokenValidationResponse = await InviteAPI.validate(token);
            return result;
    }, []);

    return {
        sendInvites,
        validate
    }
}