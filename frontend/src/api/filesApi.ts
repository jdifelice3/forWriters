import { apiFetch } from "./client";
import { FileUploadFormInput, FileFormInput } from "../types/FileTypes";
import { AppFileMeta } from "../types/domain-types";

export const FilesAPI = {
  create(input: FileUploadFormInput) {
    return apiFetch("/files", {
        method: "POST",
        body: JSON.stringify({ ...input}),
    });
  },

  update(input: FileFormInput) {
    return apiFetch(`/filesApi`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  },

  remove(fileId: string) {
    return apiFetch(`/filesApi?id=${fileId}`, {
      method: "DELETE",
    });
  },

  updateVersion(id: string, version: string) {
    return apiFetch<AppFileMeta>(`/filesApi/version?id=${id}&version=${version}`, {
      method: "PUT"
    });
  },
};
