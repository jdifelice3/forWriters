import { apiFetch } from "./client";
import { FileUploadFormInput, FileFormInput } from "../types/FileTypes";
import { AppFileMeta, AppFile } from "../types/domain-types";

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

    uploadManuscript(
        formData: FormData
    ){
        return apiFetch<void>("/files", {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    },

    uploadVersion(
        fileMetaId: string,
        formData: FormData
    ){

        return apiFetch<void>(`/files/${fileMetaId}/upload/version`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
    },

    addVersion(groupId: string, readingId:string, appFileId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/submissions/${appFileId}/version`,{
            method: "POST"
        });
    },
    
}
