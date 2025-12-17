import { useState } from "react";
import useSWR from "swr";
import { AppFile } from "../types/domain-types";

interface UploadOptions {
  url: string;
  onSuccess: (file: AppFile) => void;
  onError: (err: Error) => void;
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

export const useFilesGet = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR<AppFile[]>(
    url,
    async (url: string) => {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch files");
      return res.json();
    }
  );

  return {
    files: data ?? [],
    isLoading,
    error,
    refresh: mutate, // 👈 important
  };
};


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
    file: data as AppFile,
    isLoading,
    error,
  };
}