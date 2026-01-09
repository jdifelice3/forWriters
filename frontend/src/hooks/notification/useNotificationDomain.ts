import { useCallback } from "react";
import { useNotifications } from "./useNotifications";
import { NotificationsAPI } from "../../api/notificationsApi"

export function useNotificationDomain (
  groupId: string | null,
  userId: string | null
) {
  const { mutate } = useNotifications();
  const disabled = !groupId || !userId;

  const updateNotification = useCallback(async (notificationId: string) => {
    if (disabled) return;
    await NotificationsAPI.updateNotification(groupId, notificationId!);
    await mutate();
  }, [groupId, disabled, mutate]);

  return {
    updateNotification
  };
}
