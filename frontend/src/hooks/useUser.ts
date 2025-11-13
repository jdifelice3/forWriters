import { useEffect, useState, useCallback } from "react";
import Session from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";

// --------------------
// Types
// --------------------
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------
// In-memory cache
// --------------------
let cachedUser: User | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const apiHost = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

// --------------------
// Hook implementation
// --------------------
export function useUser() {
  const [user, setUser] = useState<User | null>(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const sessionExists = await Session.doesSessionExist();
      if (!sessionExists) {
        navigate("/auth");
        return;
      }

      // ⚡ Check cache freshness
      const now = Date.now();
      if (cachedUser && now - cacheTimestamp < CACHE_TTL_MS) {
        setUser(cachedUser);
        setLoading(false);
        return;
      }

      const res = await fetch(`${apiHost}/api/me`, { credentials: "include" });
      if (res.status === 401) {
        navigate("/auth");
        return;
      }
      if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`);

      const data: User = await res.json();

      // 💾 cache the result
      cachedUser = data;
      cacheTimestamp = now;
      setUser(data);
    } catch (err: any) {
      console.error("useUser fetch error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${apiHost}/api/signout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Backend signout failed", err);
    }
    await Session.signOut();
    cachedUser = null;
    cacheTimestamp = 0;
    setUser(null);
    navigate("/auth");
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // optional: clear stale cache on unmount or when session expires
  useEffect(() => {
    return () => {
      if (!Session.doesSessionExist()) {
        cachedUser = null;
        cacheTimestamp = 0;
      }
    };
  }, []);

  return { user, loading, error, refetch: fetchUser, logout };
}
