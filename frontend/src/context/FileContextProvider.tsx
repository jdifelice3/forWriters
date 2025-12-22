import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { AppFileMeta } from "../types/domain-types";
import { fetcher } from "./fetcher";
import { FileContextValue } from "../types/ContextTypes";

const FileContext = createContext<FileContextValue | undefined>(undefined);

export const FileContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading } = useSWR<AppFileMeta[]>(
        `${import.meta.env.VITE_API_HOST}/api/filesApi`,
        fetcher
    );
    const files = data ?? [];

    const value = useMemo<FileContextValue>(
        () => ({
        files,
        isLoading,
        }),
        [files, isLoading]
    );

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
}

export const useFileContext = () => {
  const ctx = useContext(FileContext);
  if (!ctx) throw new Error("useFileContext must be used inside FileContextProvider");
  return ctx;
}
