import useSWR  from "swr";
import { fetcher } from "../context/fetcher";
import { Notification } from "../types/NotificationTypes";

export const useNotifications = (activeGroupId: string | null) => {
    const key = activeGroupId
        ? `/api/groups/${activeGroupId}/notifications`
        : null;

    return useSWR<Notification[]>(key, fetcher, {
        refreshInterval: 30_000,
        dedupingInterval: 10_000,
  });
};

