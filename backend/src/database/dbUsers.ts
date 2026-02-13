import { 
    PrismaClient, 
    Role, 
    JoinRequestStatus 
} from "@prisma/client";
import { 
  JoinRequestError,
  GroupError
} from "./types/Error";

const prisma = new PrismaClient();

//#region GET
// export const getUsers = async() => {
//     const prisma2 = new PrismaClient();
//     const users = await prisma2.user.findMany();
    
//     return users;
// }

// export const getUserProfile = async(authId: string) => {
  
//   const user: any = await prisma.user.findUnique({
//     where: 
//         {
//             superTokensId: authId,
//         },
//         include: {
//             userProfile: true,  
//         }
//   });
  
//   return user;
// }

//#region CREATE
export const createUser = async(superTokensId: string, email: string, firstName: string, lastName: string, role: Role)  => {
    
    try{
        const newUser: any = await prisma.user.create({
            data: {
                email: email,
                superTokensId: superTokensId,
                role: role,
                username: email,

                userProfile: {
                    create: {
                        firstName: firstName,
                        lastName: lastName
                    },
            },
        }});
    
        return newUser;
    } catch (err) {
        console.error(err);
        return null;
    }
}

//#endregion