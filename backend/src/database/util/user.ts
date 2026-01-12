import prisma from "../../database/prisma";

export const getUser = async(authId: string) => {
    const user: any = await prisma.user.findUnique({
        where: 
            {
                superTokensId: authId,
            },
            include: {
                userProfile: true,
            }
    });    

    return user;
}
