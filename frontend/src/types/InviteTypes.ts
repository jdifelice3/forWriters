export type tokenValidationResponse = {
    pendingId: string;
    valid: boolean;
    groupName: string;
    email: string;
    invitedBy: string;
    role: "MEMBER" | "READER" | "ADMIN";
}
