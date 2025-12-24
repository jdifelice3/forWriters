import { apiFetch } from "./client";
import { FormInput } from "../types/ReadingTypes";

export const ReadingsAPI = {
  create(groupId: string, input: FormInput, userId: string, schedule: string) {
    return apiFetch(`/events/${groupId}`, {
      method: "POST",
      body: JSON.stringify({ ...input, createdUserId: userId, schedule }),
    });
  },

  signup(readingId: string, userId: string) {
    return apiFetch(`/events/${readingId}/signup`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
  },

  withdraw(readingId: string, userId: string) {
    return apiFetch(`/events/${readingId}/withdraw`, {
      method: "DELETE",
      body: JSON.stringify({ userId }),
    });
  },

  remove(readingId: string, groupId: string) {
    return apiFetch(`/events/${readingId}/group/${groupId}`, {
      method: "DELETE",
    });
  },

  addFile(formData: FormData) {
    return apiFetch(`/file/add`, {
      method: "POST",
      //headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData }),
    });
  },
};
