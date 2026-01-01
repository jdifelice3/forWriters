import useSWR, { mutate } from "swr";
import { useGroupContext } from "../context/GroupContextProvider";
import { fetcher } from "../context/fetcher";

const BASE_URL = import.meta.env.VITE_API_HOST;

export const useGroupDetails = <T>() => {
  const { activeGroup } = useGroupContext();
  return useSWR<T>(
    activeGroup ? `${BASE_URL}/api/groups/${activeGroup.id}` : null,
    fetcher 
  );
}

export const useGroupGet = (url: string) => {
  const { data, error, isLoading } = useSWR(
    url,
    (_url) => fetch(_url, { credentials: "include" }).then(r => r.json())
  );
console.log('data, error, isLoading', data, error, isLoading)
  return {  
    group: data,
    isLoading,
    error
  };
}
