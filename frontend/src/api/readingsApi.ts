import { apiFetch } from "./client";
import { FormInput } from "../types/ReadingTypes";
import { ReadingParticipant, Reading } from "@/types/domain-types";

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

  signup(readingId: string, groupId: string, userId: string) {
    return apiFetch(`/groups/${groupId}/readings/${readingId}/signup`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
  },

  withdraw(readingId: string, userId: string) {
    return apiFetch(`/readings/${readingId}/withdraw`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
    });
  },

  remove(readingId: string, groupId: string) {
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
};
