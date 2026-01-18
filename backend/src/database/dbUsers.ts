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
export const createUser = async(superTokensId: string, email: string, role: Role)  => {
    console.log('in dbUser.createUser')
    try{
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
        });

        // const userSearch: any = await prisma.userSearch.create({
        //     data: {
        //         userId: newUser.id,
        //         fullName: `${newUser.userProfile.firstName} ${newUser.userProfile.lastName}`,
        //         bio: `${newUser.userProfile.bio}`
        //     }
        // })

    
        return newUser;
    } catch (err) {
        console.log(err);
        return null;
    }
}


// //#region UPDATE
// export const updateUserProfile = async(userId: string, firstName: string, lastName: string, bio: string) => {
//   try{
//     const updatedUser: any = await prisma.userProfile.update({
//       where: {
//         id: userId
//       },
//       data: {
//         firstName: firstName,
//         lastName: lastName,
//         bio: bio
//       }
//     });
    
//     return updatedUser;
//   } catch (err: any) {
//     if(err instanceof Error){
//       console.error(err.message);
//     }
//     throw(err);
//   }
// }
//#endregion