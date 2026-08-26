import { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { KeyedMutator } from "swr";
import { User } from "../types/domain-types";

export interface UserContextType {
  user: any;
  isLoading: boolean;
  error: any;
  refreshUser: KeyedMutator<User>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, error, refreshUser } = useCurrentUser();
  return (
    <UserContext.Provider value={{ user, isLoading, error, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used inside a UserProvider");
  }
  return ctx;
}
