import useSWR  from "swr";
import { Notification } from "../../types/NotificationTypes";
import { apiFetch } from "../../api/client"

export const useNotifications = () => {
    const key = `/notifications`;

    const swr = useSWR<Notification[]>(key, apiFetch, {
        refreshInterval: 30_000,
        dedupingInterval: 10_000,
    });

  return {
    data: swr.data ?? [],
    isLoading: swr.isLoading,
    isError: swr.error,
    mutate: swr.mutate
  };
};

