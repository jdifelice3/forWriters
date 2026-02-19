import { apiFetch, pdfFetch } from "./client";
import { FileUploadFormInput, FileFormInput, ObjectIdsForDeletion } from "../types/FileTypes";
import { AppFileMeta, AppFile, FileFeedback } from "../types/domain-types";
import { CommentDTO } from "../types/FeedbackTypes";

type FeedbackResponse = {
  html: string;
};

export const FilesAPI = {
    create(input: FileUploadFormInput) {
        return apiFetch("/files", {
            method: "POST",
            body: JSON.stringify({ ...input}),
            credentials: "include",
        });
    },

    updateMetaData(fileMetaId: string, input: any) {
        const {title, description} = input;
        return apiFetch(`/filesApi`, {
            method: "PUT",
            body: JSON.stringify({ fileMetaId, title, description }),
            credentials: "include",
        });
    },

    deleteFile(fileId: string) {
        return apiFetch(`/filesApi?id=${fileId}`, {
            method: "DELETE",
            credentials: "include",
        });
    },

    updateVersion(id: string, version: number) {
        return apiFetch<AppFileMeta>(`/filesApi/version?id=${id}&version=${version.toString()}`, {
            method: "PUT",
            credentials: "include",
        });
    },

    uploadManuscript(
        formData: FormData
    ){
        return apiFetch<void>("/files/upload", {
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
            method: "POST",
            credentials: "include",
        });
    },

    getFileFeedback(appFileId: string | undefined){
        return apiFetch<FileFeedback>(`/filesApi/${appFileId}/feedback`, {
            method: "GET",
            credentials: "include",
        })
    },

    getComments(fileFeedbackId: string){
        return apiFetch<CommentDTO[]>(`/filesApi/feedback/${fileFeedbackId}/comments`, {
            method: "GET",
            credentials: "include",
        })
    },

    getFileComments(appFileId: string){
        return apiFetch<CommentDTO[]>(`/filesApi/${appFileId}/feedback/comments`, {
            method: "GET",
            credentials: "include",
        })
    },

    exportFeedbackReport(
        appFileId: string,
        includeResolved: boolean,
        includeReviewerAppendix: boolean
    ){
        return pdfFetch(`/files/${appFileId}/export-pdf`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    includeResolved: includeResolved,
                    includeReviewerAppendix: includeReviewerAppendix,
                }),
            });
    },

    getDeletionIds(appFileMetaId: string){
        return apiFetch<ObjectIdsForDeletion>(`/filesApi/${appFileMetaId}/ids/fordeletion`, {
            method: "GET",
            credentials: "include"
        })
    },

    getHTML(appFileId: string){
        return apiFetch<FeedbackResponse>(`/filesApi/${appFileId}/html`, {
            method: "GET",
            credentials: "include"
        })
    }
}
