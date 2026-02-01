import useSWR from "swr";
import { DashboardResponse } from "../types/DashboardTypes";
import { apiFetch } from "../api/client"

export function useDashboard(activeGroupId: string | null) {
    const swr = useSWR<DashboardResponse>(
        activeGroupId ? `/dashboard/${activeGroupId}` : null,
        apiFetch
    );

  return {
    data: swr.data, // DashboardResponse | undefined
    isLoading: swr.isLoading,
    isError: swr.error,
    mutate: swr.mutate,
  }
}