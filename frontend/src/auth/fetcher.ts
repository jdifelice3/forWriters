import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url: string) =>
    fetch(url, 
        { 
            credentials: "include" 
        }).then(
            (res) => res.json()
        );

// export const useCurrentUser = () => {
//     const url = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/me`;
//     const { data, error, isLoading } = useSWR(url, fetcher);
//     return { user: data, isLoading, error };
// }
const apiHost = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/me`;
export const useCurrentUser = () => {
    console.log('in useCurrentUser');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    setIsLoading(true);
    try {
        //const url = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/me`;
        const { data, error, isLoading } = useSWR(apiHost, fetcher);
      setUser(data);
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser(); // Fetch user on mount
  }, []); // Empty array ensures this only runs on mount

  // Refetch if user is null
  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]); // Refetch when user changes to null

  return { user, isLoading, error };
};
