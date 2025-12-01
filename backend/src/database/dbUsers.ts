import { PrismaClient, Role } from "@prisma/client";

import { UserWithRequiredProfile } from "../domain-types";

const prisma = new PrismaClient();

export const getUsers = async() => {
    const prisma2 = new PrismaClient();
    const users = await prisma2.user.findMany();
    
    return users;
}

export const createUser = async(superTokensId: string, email: string, role: Role): Promise<UserWithRequiredProfile>  => {
    const newUser: any = await prisma.user.create({
        data: {
            email: email,
            superTokensId: superTokensId,
            role: role,
            username: email,

            userProfile: {
                create: {}
            }
        }
    })
  
    return newUser as UserWithRequiredProfile;
}

export const getUserProfile = async(authId: string) => {
  console.log('in getUserPfrofile');
  const user: any = await prisma.user.findUnique({
    where: 
        {
            superTokensId: authId,
        },
        include: {
            userProfile: true,  
        }
  });
  console.log('user', user);
  return user;
}

export const updateUserProfile = async(userId: string, firstName: string, lastName: string, bio: string) => {
  try{
    const updatedUser: any = await prisma.userProfile.update({
      where: {
        id: userId
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        bio: bio
      }
    });
    console.log('updatedUser', updatedUser);
    return updatedUser;
  } catch (err: any) {
    if(err instanceof Error){
      console.log(err.message);
    }
    throw(err);
  }
}
