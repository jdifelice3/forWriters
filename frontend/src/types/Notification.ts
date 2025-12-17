export type NotificationType =
    | "GROUP_JOIN_REQUEST"
    | "GROUP_INVITE"
    | "COLLAB_REQUEST"
    | "READING_FEEDBACK";

export type Notification = {
    id: string;
    type: NotificationType;
    message: string;
    href: string;
    entityId: string;
    createdAt: string;
};
