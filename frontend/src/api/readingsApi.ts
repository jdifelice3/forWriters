import { apiFetch } from "./client";
import { FormInput } from "../types/ReadingTypes";
import { CreateReadingInput } from "../types/ReadingTypes";
import { ReadingFormInput } from "../schemas/reading.schema";

type FeedbackResponse = {
  html: string;
};

export const ReadingsAPI = {
    get(groupId: string) {
        return apiFetch(`/groups/${groupId}/readings`,{
            method: "GET",
            credentials: "include"
        });
    },

    create(groupId: string, input: ReadingFormInput, userId: string) {
        return apiFetch(`/groups/${groupId}/readings`, {
            method: "POST",
            body: JSON.stringify({ ...input, createdUserId: userId }),
            credentials: "include"
        });
    },

    update(groupId: string, readingId: string, input: ReadingFormInput) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}`, {
            method: "PUT",
            body: JSON.stringify(input),
            credentials: "include"
        })
    },

    signup(groupId: string, readingId: string, userId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/signup`, {
            method: "POST",
            body: JSON.stringify({ userId }),
            credentials: "include"
        });
    },

    withdraw(groupId: string, readingId: string, userId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/participants/${userId}/withdraw`, {
            method: "DELETE",
            body: JSON.stringify({ userId }),
            credentials: "include"
        });
    },

    remove(groupId: string, readingId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}`, {
            method: "DELETE",
            credentials: "include"
        });
    },

    addVersion(groupId: string, readingId:string, appFileId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/submissions/${appFileId}/version`,{
            method: "POST",
            credentials: "include"
        });
    },

    updateVersion(groupId: string, readingId:string, appFileId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/submissions/${appFileId}/version`,{
            method: "PUT",
            credentials: "include"
        });
    },

    getManuscriptHTML(groupId: string, readingId:string, submissionId: string) {
        return apiFetch<FeedbackResponse>(`/groups/${groupId}/readings/${readingId}/submissions/${submissionId}/feedback`,{
            method: "GET",
            credentials: "include"
        });
    },

};
