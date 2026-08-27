// src/context/GroupContext.tsx
import React, {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, matchPath } from "react-router-dom";
import useSWR from "swr";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { apiFetch } from "../api/client";
import { getActiveGroupStorageKey } from "../auth/sessionScope";
import { GroupContextValue, GroupSummary } from "../types/ContextTypes";

const GroupContext = createContext<GroupContextValue | undefined>(undefined);

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
  const session = useSessionContext();
  const userId =
    session.loading || !session.doesSessionExist ? null : session.userId;
  const groupStorageKey = userId ? getActiveGroupStorageKey(userId) : null;

  const { data, isLoading } = useSWR<GroupSummary[]>(
    userId ? `/me/groups` : null,
    apiFetch,
     {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 10_000,
    }
  );

  const groups = useMemo(() => data ?? [], [data]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const activeGroup = useMemo(() => {
    if (!groupStorageKey || !groups.length) return null;
    const urlGroupId = extractGroupIdFromPath(location.pathname);
    const storedGroupId = localStorage.getItem(groupStorageKey);
    const candidateId = urlGroupId ?? selectedGroupId ?? storedGroupId;

    return (
      groups.find(g => g.id === candidateId) ??
      groups[0]
    );
  }, [groupStorageKey, groups, location.pathname, selectedGroupId]);

  const setActiveGroup = useCallback((group: GroupSummary) => {
    setSelectedGroupId(group.id);
  }, []);

  useEffect(() => {
    if (activeGroup && groupStorageKey) {
      localStorage.setItem(groupStorageKey, activeGroup.id);
    }
  }, [activeGroup, groupStorageKey]);

  const value = useMemo(
    () => ({
      groups,
      activeGroup,
      setActiveGroup,
      isLoading,
    }),
    [groups, activeGroup, isLoading, setActiveGroup]
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
