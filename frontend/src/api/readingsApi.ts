import { apiFetch } from "./client";
import { FormInput } from "../types/ReadingTypes";

type FeedbackResponse = {
  html: string;
};

export const ReadingsAPI = {
    get(groupId: string) {
        return apiFetch(`/groups/${groupId}/readings`,{
            method: "GET"
        });
    },

    create(groupId: string, input: FormInput, userId: string, schedule: string) {
        return apiFetch(`/groups/${groupId}/readings`, {
            method: "POST",
            body: JSON.stringify({ ...input, createdUserId: userId, schedule }),
        });
    },

    signup(groupId: string, readingId: string, userId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/signup`, {
            method: "POST",
            body: JSON.stringify({ userId }),
        });
    },

    withdraw(groupId: string, readingId: string, userId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/participants/${userId}/withdraw`, {
            method: "DELETE",
            body: JSON.stringify({ userId }),
        });
    },

    remove(groupId: string, readingId: string) {
        return apiFetch(`/readings/${readingId}/group/${groupId}`, {
            method: "DELETE",
        });
    },

    addVersion(groupId: string, readingId:string, appFileId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/submissions/${appFileId}/version`,{
            method: "POST"
        });
    },

    updateVersion(groupId: string, readingId:string, appFileId: string) {
        return apiFetch(`/groups/${groupId}/readings/${readingId}/submissions/${appFileId}/version`,{
            method: "PUT"
        });
    },

    getManuscriptHTML(groupId: string, readingId:string, submissionId: string) {
        return apiFetch<FeedbackResponse>(`/groups/${groupId}/readings/${readingId}/submissions/${submissionId}/feedback`,{
            method: "POST"
        });
    },

};
