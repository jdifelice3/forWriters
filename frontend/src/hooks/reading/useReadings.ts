import useSWR from "swr";
import { Reading } from "../../types/domain-types";
import { useGroupContext } from "../../context/GroupContextProvider";
import { apiFetch } from "../../api/client";

export const useReadings = () => {
  const { activeGroup } = useGroupContext();

 const key = activeGroup
    ? `/groups/${activeGroup.id}/readings`
    : null;

  const swr = useSWR<Reading[]>(key, apiFetch);

  const refresh = () => {
    return swr.mutate();
  };

  return {
    readings: swr.data ?? [],
    isLoading: swr.isLoading,
    isError: swr.error,
    refresh
  };
};
