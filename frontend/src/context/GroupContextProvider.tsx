import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../context/fetcher";
import { GroupContextValue, GroupSummary } from "../types/Context";

const GroupContext = createContext<GroupContextValue | undefined>(undefined);
const GROUP_STORAGE_KEY = "fw:activeGroupId";

const extractGroupIdFromPath = (pathname: string): string | null => {
  const match =
    matchPath("/groups/:groupId/*", pathname) ||
    matchPath("/groups/:groupId", pathname);

  return match?.params?.groupId ?? null;
}

export const GroupContextProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isLoading } = useSWR<GroupSummary[]>(
        `${import.meta.env.VITE_API_HOST}/api/me/groups`,
        fetcher
    );
    const groups = data ?? [];
    const [activeGroup, setActiveGroupState] = useState<GroupSummary | null>(null);
  // 1️⃣ Sync active group from URL or storage when groups load
  useEffect(() => {
    if (isLoading || groups === undefined ) return ;//|| groups.length === 0) return;

    const urlGroupId = extractGroupIdFromPath(location.pathname);
    const storedGroupId = localStorage.getItem(GROUP_STORAGE_KEY);

    const candidateId = urlGroupId ?? storedGroupId;
    const found = groups.find(g => g.id === candidateId) ?? groups[0];

    setActiveGroupState(found);
  }, [isLoading, groups, location.pathname]);

  // 2️⃣ Persist active group
  useEffect(() => {
    if (activeGroup) {
      localStorage.setItem(GROUP_STORAGE_KEY, activeGroup.id);
    }
  }, [activeGroup]);

  // 3️⃣ Setter used by GroupSelector
  const setActiveGroup = (group: GroupSummary) => {
    setActiveGroupState(group);

    // Only navigate if not already in a group-scoped route
    if (!location.pathname.startsWith(`/groups/${group.id}`)) {
        console.log('path', location.pathname);
      //navigate(`/readings`);
      //navigate(location.pathname);
    }
  }

  const value = useMemo<GroupContextValue>(
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
}

export function useGroupContext() {
  const ctx = useContext(GroupContext);
  if (!ctx) throw new Error("useGroupContext must be used inside GroupContextProvider");
  return ctx;
}
