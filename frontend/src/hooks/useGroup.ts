import useSWR, { mutate } from "swr";
import { useGroupContext } from "../context/GroupContextProvider";
import { fetcher } from "../context/fetcher";


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
