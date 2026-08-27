import useSWR from "swr";
import { useEffect } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { typedFetcher } from "../util/fetcher";
import { User } from "../types/domain-types";

const apiHost = `${import.meta.env.VITE_API_HOST}`;

export function useCurrentUser() {
  const navigate = useNavigate();
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<User>(`${apiHost}/api/me`, typedFetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });


  // Handle unauthorized redirects
  useEffect(() => {
    if (!error || error.status !== 401) return;

    let cancelled = false;
    void Session.doesSessionExist().then((exists) => {
      if (!cancelled && !exists) {
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [error, navigate]);

  return {
    user: data,
    isLoading,
    error,
    refreshUser: mutate,
  };
}
