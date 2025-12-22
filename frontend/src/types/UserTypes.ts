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