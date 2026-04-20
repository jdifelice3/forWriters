export interface User {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    userProfile: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

export interface UserSearch {
    email: string;
    userId: string;
    fullname: string;
    bio: string;
    groupStatus: "not_in_group" | "already_member" | "pending_invite" | "expired_invite";
}

export type ProfileFormInputs = {
    firstName: string,
    lastName: string,
    email: string,
    bio: string,
    title: string,
    description: string,
    avatar: File,
}