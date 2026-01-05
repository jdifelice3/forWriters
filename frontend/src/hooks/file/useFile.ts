import { useState, useMemo } from "react";
import useSWR from "swr";
import { AppFileMeta, AppFile } from "../../types/domain-types";
import { DocType } from "../../util/Enum";
import { apiFetch } from "../../api/client";
import { useUserContext } from "../../context/UserContext";

interface UploadOptions {
  url: string;
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
            }
        ).then(r => r.json())
    );

    return {
        file: data as AppFileMeta,
        isLoading,
        error,
    };
}