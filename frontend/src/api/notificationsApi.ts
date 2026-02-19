import { NotificationType } from "@/types/domain-types";
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

  createNotification(
        entityId: string, 
        message: string, 
        notificationType: NotificationType,
        href: string
    ){
        const url = `/notifications`;

        return apiFetch(url,{
            method: "POST",
            body: JSON.stringify({ 
                    message: message, 
                    notificationType: notificationType, 
                    href: href,
                    entityId: entityId,
                    userId: entityId
                })
        });
  }
};