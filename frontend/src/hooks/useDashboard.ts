import useSWR from "swr";
import { DashboardResponse } from "../types/DashboardTypes";
import { fetcher } from "../context/fetcher";

export function useDashboard(activeGroupId: string | null) {
  const key = activeGroupId ? `/api/dashboard?groupId=${activeGroupId}` : `/api/dashboard`;

  return useSWR<DashboardResponse>(key, fetcher, {
    // caching / freshness is in section 2
    keepPreviousData: true,
  });
}
