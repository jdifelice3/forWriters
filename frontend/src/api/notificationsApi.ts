import { apiFetch } from "./client";

export const NotificationsAPI = {
    get(entityId: string) {
        return apiFetch(`/groups/${entityId}/notifications`,{
            method: "GET"
        });
    },

  updateNotification(groupId: string, notificationId: string) {
    return apiFetch(`/groups/${groupId}/notifications/${notificationId}`,{
        method: "PUT"
    });
  },
};