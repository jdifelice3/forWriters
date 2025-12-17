import { 
    PrismaClient, 
    Role, 
    JoinRequestStatus 
} from "@prisma/client";
import { 
  JoinRequestError,
  GroupError
} from "../types/Error";

const prisma = new PrismaClient();

//#region GET
export const getUsers = async() => {
    const prisma2 = new PrismaClient();
    const users = await prisma2.user.findMany();
    
    return users;
}

export const getUserProfile = async(authId: string) => {
  
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

export const getUserSearch = async(authId: string, query: string) => {
    const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });  

  const users = await prisma.userSearch.findMany({
      where: {
        fullName: {
          contains: query,
          mode: "insensitive",
        },
        userId: {
            not: user.id
        }
      },
      take: 10,
      orderBy: { fullName: "asc" },
      select: {
        userId: true,
        fullName: true,
        bio: true
      },
   }); 

   return users;
}

export const getAdminRequests = async(authId: string) => {
  const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });  
  
    const requests = await prisma.collaboratorRequest.findMany({
      where: {
        collaboratorId: user.id,
        status: JoinRequestStatus.PENDING,
      },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
            include: {
                userProfile: true
            }
        },
      },
    });
    
    return requests;
}
//#endregion

//#region CREATE
export const createUser = async(superTokensId: string, email: string, role: Role)  => {
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

    const userSearch: any = await prisma.userSearch.create({
        data: {
            userId: newUser.id,
            fullName: `${newUser.userProfile.firstName} ${newUser.userProfile.lastName}`,
            bio: `${newUser.userProfile.bio}`
        }
    })

  
    return newUser;
}

export const createMemberConnectRequest = async(authId: string, collaboratorId: string) => {
  const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });

  //Check if User exists  
  const member = await prisma.user.findUnique({
      where: { id: collaboratorId },
  });

  if (!user) {
    const joinGroupError = new JoinRequestError("User not found.", 404);
    throw joinGroupError;
  }

  // Check if you already connected to the member
  const existingConnection = await prisma.userCollaborator.findMany({
    where: { 
        userId: user.id,
        collaboratorId: collaboratorId
    }
  });

  
  if (existingConnection.length > 0) {
    const joinGroupError = new JoinRequestError("You have already connected to this member.", 400);
    throw joinGroupError;
  }

  // Check if there's already a pending request
  const existingRequest = await prisma.collaboratorRequest.findFirst({
    where: {
      userId: user.id,
      collaboratorId: collaboratorId,
      status: JoinRequestStatus.PENDING,
    },
  });

  if (existingRequest) {
    const joinGroupError = new JoinRequestError("You already have a pending request with this member.", 400);
    throw joinGroupError;
  }

  // Create new member connect request
  const connectRequest = await prisma.collaboratorRequest.create({
    data: {
      userId: user.id,
      collaboratorId: collaboratorId,
      status: JoinRequestStatus.PENDING,
    },
    include: {
      user: {
        include: {
            userProfile: true
        }
      }
    }
  });

  return connectRequest;
  }

  export const approveConnectRequest = async(connectRequestId: string, authId: string) => {
      const user: any = await prisma.user.findUnique({
            where: {
              superTokensId: authId,
            },
      });
      
      const connectReq: any = await prisma.collaboratorRequest.findUnique({
          where: { 
            id: connectRequestId 
          },
          include: {
            user: {
                include: {
                    userProfile: true
                }
            }
          }
      });
    
      if (!connectReq) {
        throw new JoinRequestError("Join request not found.", 404);
      }
  
      if (connectReq.status !== JoinRequestStatus.PENDING) {
        throw new JoinRequestError("This request is no longer pending.", 400);
      }
  
      // Approve + add membership in a transaction

      await prisma.collaboratorRequest.update({
          where: { id: connectReq.id },
          data: { status: JoinRequestStatus.APPROVED },
        });

      await prisma.userCollaborator.create({
        data: {
            userId: connectReq.userId,
            collaboratorId: connectReq.collaboratorId
        }
      });
    //   await prisma.$transaction([
    //     prisma.collaboratorRequest.update({
    //       where: { id: connectReq.id },
    //       data: { status: JoinRequestStatus.APPROVED },
    //     }),
    //     prisma.userCollaborator.upsert({
    //       where: {
    //           userId: connectReq.userId,
    //           collaboratorId: connectReq.collaboratorId,
    //       },
    //       create: {
    //         userId: connectReq.userId,
    //         collaboratorId: connectReq.collaboratorId,
    //       },
    //       update: {}, 
    //     }),
    //   ]);
      
      return true;
    }
  
  export const rejectConnectRequest = async(connectRequestId: string, authId: string) => {
    // Load the request
    const user: any = await prisma.user.findUnique({
        where: {
          superTokensId: authId,
        },
    });
  
    const connectReq = await prisma.collaboratorRequest.findUnique({
        where: { id: connectRequestId },
      });
  
      if (!connectReq) {
        throw new JoinRequestError("Connect request not found.", 404);
      }
  
      if (connectReq.status !== JoinRequestStatus.PENDING) {
        throw new JoinRequestError("This request is no longer pending.", 400);
      }
  
      await prisma.collaboratorRequest.update({
        where: { id: connectRequestId },
        data: { status: JoinRequestStatus.REJECTED },
      });
  }
//#endregion

//#region UPDATE
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
    
    return updatedUser;
  } catch (err: any) {
    if(err instanceof Error){
      console.error(err.message);
    }
    throw(err);
  }
}
//#endregion