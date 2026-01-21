// src/context/GroupContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, matchPath } from "react-router-dom";
import useSWR from "swr";
import { apiFetch } from "../api/client";
import { GroupContextValue, GroupSummary } from "../types/ContextTypes";

const GroupContext = createContext<GroupContextValue | undefined>(undefined);

const GROUP_STORAGE_KEY = "fw:activeGroupId";

/**
 * Extracts groupId ONLY if the route is explicitly group-scoped.
 */
function extractGroupIdFromPath(pathname: string): string | null {
  const match =
    matchPath("/groups/:groupId/*", pathname) ||
    matchPath("/groups/:groupId", pathname);

  return match?.params?.groupId ?? null;
}

export const GroupContextProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const { data, isLoading } = useSWR<GroupSummary[]>(
    `/me/groups`,
    apiFetch,
     {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 10_000,
    }
  );

  const groups = data ?? [];
  const [activeGroup, setActiveGroup] = useState<GroupSummary | null>(null);

  useEffect(() => {
    if (!groups.length) return;

    const urlGroupId = extractGroupIdFromPath(location.pathname);
    const storedGroupId = localStorage.getItem(GROUP_STORAGE_KEY);
    const candidateId = urlGroupId ?? storedGroupId;

    const found =
      groups.find(g => g.id === candidateId) ??
      groups[0];

    setActiveGroup(found);
  }, [groups, location.pathname]);

  useEffect(() => {
    if (activeGroup) {
      localStorage.setItem(GROUP_STORAGE_KEY, activeGroup.id);
    }
  }, [activeGroup]);

  const value = useMemo(
    () => ({
      groups,
      activeGroup,
      setActiveGroup,
      isLoading,
    }),
    [groups, activeGroup, isLoading]
  );

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  );
};


export function useGroupContext() {
  const ctx = useContext(GroupContext);
  if (!ctx) {
    throw new Error(
      "useGroupContext must be used within GroupContextProvider"
    );
  }
  return ctx;
}
