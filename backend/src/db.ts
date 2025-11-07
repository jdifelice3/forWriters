import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async() => {
    const prisma2 = new PrismaClient();
    const users = await prisma2.users.findMany();
    
    return users;
}

export const createUser = async(superTokensId: string, email: string, role: Role) => {
    const newUser: any = await prisma.users.create({
    data: {
      email: email,
      superTokensId: superTokensId,
      role: role,
      username: email
    }
  });
  
  return newUser;
}
