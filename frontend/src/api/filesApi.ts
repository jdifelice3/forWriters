import { apiFetch } from "./client";
import { FileUploadFormInput, FileFormInput } from "../types/FileTypes";
import { AppFileMeta, AppFile } from "../types/domain-types";
import { useFileUpload } from "../hooks/file/useFile";

export const FilesAPI = {
    create(input: FileUploadFormInput) {
        return apiFetch("/files", {
            method: "POST",
            body: JSON.stringify({ ...input}),
        });
    },

    updateMetaData(fileMetaId: string, input: any) {
        const {title, description} = input;
        return apiFetch(`/filesApi`, {
            method: "PUT",
            body: JSON.stringify({ fileMetaId, title, description }),
        });
    },

    deleteFile(fileId: string) {
        return apiFetch(`/filesApi?id=${fileId}`, {
            method: "DELETE",
        });
    },

    updateVersion(id: string, version: number) {
        return apiFetch<AppFileMeta>(`/filesApi/version?id=${id}&version=${version.toString()}`, {
            method: "PUT"
        });
    },

    uploadVersion(
        fileMetaId: string,
        file: File,
        versionComment?: string
    ){
        const formData = new FormData();
        formData.append("file", file);
        if (versionComment) {
            formData.append("versionComment", versionComment);
        }

        return apiFetch<void>(`/files/${fileMetaId}/versions`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    }
}
