import useSWR from "swr";
import Session from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { typedFetcher } from "../util/fetcher";
import { User } from "../../../backend/src/domain-types";

const apiHost = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

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
  if (error && (error as any).status === 401) {
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
