import useSWR from "swr";
import { DashboardResponse } from "../types/DashboardTypes";
import { apiFetch } from "../api/client"

export function useDashboard(activeGroupId: string | null) {

  const key = activeGroupId 
    ? `/dashboard/${activeGroupId}` 
    : `dashboard`;

  const swr = useSWR<DashboardResponse>(key, apiFetch, {
    keepPreviousData: true
  });
  
  return {
    data: swr.data as DashboardResponse?? [],
    isLoading: swr.isLoading,
    isError: swr.error,
    mutate: swr.mutate,
  };
  
}
