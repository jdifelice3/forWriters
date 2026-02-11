import { useCallback } from "react";
import { useNotifications } from "./useNotifications";
import { NotificationsAPI } from "../../api/notificationsApi"
import { NotificationType, User } from "../../types/domain-types";

export function useNotificationDomain (
  groupId: string | undefined,
  user: User | undefined
) {
  const { mutate } = useNotifications();
  const disabled = !groupId || !user;

  const updateNotification = useCallback(async (notificationId: string) => {
    if (disabled) return;
    await NotificationsAPI.updateNotification(groupId, notificationId!);
    await mutate();
  }, [groupId, disabled, mutate]);

  const createNotification = useCallback(async (
        message:string, 
        notificationType: NotificationType, 
        userId: string,
        href: string
    ) => {
    
        if(disabled) return;
        await NotificationsAPI.createNotification(
            userId, 
            message, 
            notificationType,
            href
        );
        await mutate();
    }, [groupId, user?.id, disabled, mutate]);

  return {
    updateNotification,
    createNotification
  };
}
