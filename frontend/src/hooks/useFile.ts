import { useState, useMemo } from "react";
import useSWR from "swr";
import { AppFileMeta, AppFile } from "../types/domain-types";
import { DocType } from "../util/Enum";
import { fetcher } from "../context/fetcher";

interface UploadOptions {
  url: string;
  onSuccess: (file: AppFile) => void;
  onError: (err: Error) => void;
}

export const useFiles = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR<AppFileMeta[]>(
    url,
    fetcher
  );

  return {
    files: data ?? [],
    isLoading,
    error,
    refresh: mutate, // 👈 important
  };
};

export function useFilesData(
  files?: AppFileMeta[]
) {
  const myManuscripts = useMemo(() => {
    if (!files) return [];
    return files.filter(f => f.documentType === DocType.MANUSCRIPT);
  }, [files]);

  const myFeedbackDocuments = useMemo(() => {
    if (!files) return [];
    return files.filter(f => f.documentType === DocType.FEEDBACK);
  }, [files]);

  return { myManuscripts, myFeedbackDocuments };
}

export function useFileUpload({ url, onSuccess, onError }: UploadOptions) {
  const [loading, setLoading] = useState(false);

  const upload = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Upload failed");

      const file: AppFile = await res.json();
      onSuccess(file);
    } catch (err) {
        if(err instanceof Error) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading };
}

export function useVersionUpdate({ url, onSuccess, onError }: UploadOptions) {
  const [loading, setLoading] = useState(false);

  const upload = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Upload failed");

      const file: AppFile = await res.json();
      onSuccess(file);
    } catch (err) {
        if(err instanceof Error) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading };
}

export const useFileUpdate = (
    url: string,
    fileId: string,
    fileTitle: string,
    fileDescription: string
) => {
  const { data, error, isLoading } = useSWR(
    url,
    (_url: string) => fetch(    
        _url, 
        { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id: fileId,
                title: fileTitle,
                description: fileDescription,
            }),
        }).then(r => r.json())
  );

  return {
    file: data as AppFileMeta,
    isLoading,
    error,
  };
}