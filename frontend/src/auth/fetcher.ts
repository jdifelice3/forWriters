import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());

export const useCurrentUser = () => {
    const url = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/me`;
    const { data, error, isLoading } = useSWR(url, fetcher);
    return { user: data, isLoading, error };
}

//const { user } = useCurrentUser();
//console.log(user?.id); 
