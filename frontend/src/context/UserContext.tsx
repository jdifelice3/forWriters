import { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export interface UserContextType {
  user: any;
  isLoading: boolean;
  error: any;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, error } = useCurrentUser();
  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
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
