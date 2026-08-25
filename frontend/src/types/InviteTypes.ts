export type tokenValidationResponse = {
    pendingId: string;
    valid: boolean;
    groupName: string;
    email: string;
    hasAccount: boolean;
    invitedBy: string;
    role: "MEMBER" | "READER" | "ADMIN";
}
