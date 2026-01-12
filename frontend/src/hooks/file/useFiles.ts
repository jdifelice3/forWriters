import { useState, useMemo } from "react";
import useSWR from "swr";
import { AppFileMeta, AppFile, DocumentType } from "../../types/domain-types";
import { apiFetch } from "../../api/client";
import { useUserContext } from "../../context/UserContext";

interface UploadOptions {
  documentType: DocumentType;
  onSuccess: (file: AppFile) => void;
  onError: (err: Error) => void;
}

export const useFiles = () => {
  const { user } = useUserContext();

  const key = user
    ? "/filesApi"
    : null;

  const swr = useSWR<AppFileMeta[]>(key, apiFetch);

  return {
    files: swr.data ?? [],
    isLoading: swr.isLoading,
    isError: swr.error,
    mutate: swr.mutate,
  };
};