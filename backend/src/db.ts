import "dotenv/config";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const getUsers = async() => {
    const prisma2 = new PrismaClient();
    const users = await prisma2.users.findMany();
    
    return users;
}
