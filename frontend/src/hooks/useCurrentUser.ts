// src/hooks/useCurrentUser.ts
import useSWR from "swr";
import Session from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });

  if (res.status === 401) {
    // Unauthorized session — let caller redirect
    const err = new Error("Unauthorized");
    (err as any).status = 401;
    throw err;
  }

  if (!res.ok) {
    const error = new Error(`Failed to fetch ${url}`);
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};

// Build API base once
const apiHost = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

export function useCurrentUser() {
  
  const navigate = useNavigate();

  // SWR handles caching + revalidation
  const { data, error, isLoading } = useSWR(
    `${apiHost}/api/me`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: true, // do not retry 401 loops
    }
  );

  // Auto-redirect for unauthorized sessions
  if (error && (error as any).status === 401) {
    // but only if we *actually had* a session before
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
  };
}