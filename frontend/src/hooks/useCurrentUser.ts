import useSWR from "swr";
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
    fetcher: (url: string) => fetch(url, { credentials: "include" }).then(r => r.json())
});


  // Handle unauthorized redirects
  if (error && error.status === 401) {
    Session.doesSessionExist().then((exists) => {
      if (!exists) {
        navigate("/auth");
      }
    });
  }

  return {
    user: data ?? null,
    isLoading,
    error,
    refreshUser: mutate,
  };
}
