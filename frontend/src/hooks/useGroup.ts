import useSWR, { mutate } from "swr";
import { useGroupContext } from "../context/GroupContextProvider";
import { fetcher } from "../context/fetcher";
import { GroupAPI } from "../api/groupApi";
import { useCallback } from "react";
import { tokenValidationResponse } from "../types/InviteTypes";
import { CompleteResponse } from "../types/GroupInviteTypes";


export const useGroupDetails = <T>(groupId: string | undefined) => {
  const { activeGroup } = useGroupContext();
  
    return useSWR<T>(
        activeGroup ? `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}` : null,
        fetcher
  );
}

export const useGroupGetCount = () => {
  const url = `${import.meta.env.VITE_API_HOST}/api/groups/groupcount`;
  const { data, error, isLoading } = useSWR(
    url,
    (_url) => fetch(_url, { credentials: "include" }).then(r => r.json())
  );

  return {  
    groupcount: data
  };
}

export const useGroupInvite = () => {
    const { activeGroup } = useGroupContext();
    
    const sendInvite = useCallback(async (input?: string, role?: string, inputType?: string) => {
        await GroupAPI.sendInvite(activeGroup?.id, input, role, inputType);
        return true;
    
    }, []);

    const validate = useCallback(async (token: string | undefined) => {
        if (!token) return;
            const result: tokenValidationResponse = await GroupAPI.validate(token);
            return result;
        }, []);

    const completeInvite = useCallback(async() => {
        const result: CompleteResponse = await GroupAPI.completeInvite();
        return result;
    }, []);

    const declineInvite = useCallback(async() => {
        const result = await GroupAPI.declineInvite();
        return result;
    }, []);

    return {
        sendInvite,
        validate,
        completeInvite,
        declineInvite
    }
}