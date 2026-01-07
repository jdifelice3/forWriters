import useSWR  from "swr";
import { Notification } from "../../types/NotificationTypes";
import { apiFetch } from "../../api/client"

export const useNotifications = (activeGroupId: string | null) => {
    const key = activeGroupId
        ? `/groups/${activeGroupId}/notifications`
        : null;

    return useSWR<Notification[]>(key, apiFetch, {
        refreshInterval: 30_000,
        dedupingInterval: 10_000,
  });
};

