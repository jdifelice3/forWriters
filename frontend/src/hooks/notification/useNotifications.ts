import useSWR  from "swr";
import { useGroupContext } from "../../context/GroupContextProvider";
import { Notification } from "../../types/NotificationTypes";
import { apiFetch } from "../../api/client"

export const useNotifications = () => {
    const { activeGroup } = useGroupContext();

    const key = activeGroup
        ? `/groups/${activeGroup.id}/notifications`
        : null;

    return useSWR<Notification[]>(key, apiFetch, {
        refreshInterval: 30_000,
        dedupingInterval: 10_000,
  });
};

