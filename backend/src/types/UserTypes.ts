export interface User {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    userProfiles: UserProfiles;
}

export interface UserProfiles {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}