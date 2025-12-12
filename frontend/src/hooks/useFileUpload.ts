import { useState } from "react";
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
