import { GroupUser, PrismaClient } from "@prisma/client";
import { 
  Group, 
  GroupGetBasic, 
  GroupType, 
  GroupCreate,
  JoinRequest,
  JoinRequestStatus,
  JoinRequestError,
  Reading,
  GroupError
} from "../domain-types";
import { z } from 'zod';
import { join } from "node:path";

const prisma = new PrismaClient();

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required").max(2, "Use 2-letter code"),
  zip: z.string().min(5, "ZIP is required").max(10, "Invalid ZIP"),
});

type Address = z.infer<typeof addressSchema>;

//#region GET
export const getGroup = async(groupId: string) => {
  const currentDate = new Date();
  try {
    const group: GroupGetBasic | null = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        groupAddress: true,
        groupUrl: true,
        groupUser: true,
        reading: {
          where: {
            submissionDeadline: {
              lte: currentDate
            },
            readingDate: {
              gt: currentDate
            }
          },
          orderBy: {
            submissionDeadline: 'asc',
          },
        },
      },
    });
    console.log('in getGroup. group:', group);
    return group;
  } catch (err) {
      console.error('Error creating group:', err);
      throw err; 
  }
}

export const getGroupByUserId = async(userId: string): Promise<Group> => {
  try {
    const groupsByUserId:GroupUser[] = await prisma.groupUser.findMany({
      where: {
        userId: userId
      }
    });
    let groupIdArray = []; 

    for(let i=0; i < groupsByUserId.length; i++){
      groupIdArray.push(groupsByUserId[i].groupId);
    }

    if(!groupsByUserId){
      throw new GroupError('User has not joined any groups', 404);
    }

    const groups: any = await prisma.group.findMany({
      where: {
        id: {
          in: groupIdArray
        }
      },
      include: {
        reading: true,
        groupAddress: true,
        groupUrl: true,
        groupUser: {
          where: {
            userId: userId
          }
        },
      },
    });

    return groups;
  } catch (err) {
      console.error('Error creating group:', err);
      throw err; 
  }
}

export const getGroupSearch = async(query: string) => {
  const groups = await prisma.group.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        // add any other fields you want to show
      },
   }); 

   return groups;
}

export const getAdminRequests = async(authId: string): Promise<JoinRequest[] | null> => {
  const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });  
  
  // Find groups where this user is an ADMIN
    const adminMemberships = await prisma.groupUser.findMany({
      where: {
        userId: user.id,
        isAdmin: true,
      },
      select: { groupId: true },
    });

    const groupIds = adminMemberships.map((m) => m.groupId);

    if (groupIds.length === 0) {
      return null; // no admin groups -> no requests
    }

    const requests: JoinRequest[] = await prisma.joinRequest.findMany({
      where: {
        groupId: { in: groupIds },
        status: JoinRequestStatus.PENDING,
      },
      orderBy: { createdAt: "asc" },
      include: {
        user: true,
        group: true,
      },
    });

    return requests;
}
//#endregion

//#region CREATE
export const createGroup = async (
      authId: string, 
      name: string, 
      address: Address, 
      description: string, 
      groupType: GroupType,
      imgUrl?: string,
      websiteUrl?: string
  ) => {
  
  try {
    // Get userId from authId
    const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const group: GroupCreate | null = await prisma.group.create({
      data: {
        name: name,
        description: description,
        creatorUserId: user.id, 
        imageUrl: (imgUrl !== undefined) ? imgUrl : "",
        groupType: groupType,
        groupAddress: {
          create: {
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,            
          }
        },
        groupUser: {
          create: {
            userId: user.id,
            isAdmin: true,
          }
        }
      },
      include: {
        groupUser: true,       // REQUIRED
        groupAddress: true,    // REQUIRED if you include it in the type
      },
    });

    console.log('Group created successfully:', group);
    if(group){
      return group;
    } else {
      throw new Error("Create group failed.");
    }
  } catch (error) {
    console.error('Error creating group:', error);
    throw error; 
  }
};

export const createJoinGroupRequest = async(authId: string, groupId: string): Promise<JoinRequest> => {
  const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
    });

  //Check if Group exists  
  const group = await prisma.group.findUnique({
      where: { id: groupId },
  });
  console.log('In createJoinGroupRequest. groupId:', groupId);
  if (!group) {
    const joinGroupError = new JoinRequestError("Group not found.", 404);
    throw joinGroupError;
  }

  // Check if user already a member
  const existingMember = await prisma.groupUser.findUnique({
    where: {
      groupId_userId: {
        userId: user.id,
        groupId: groupId
      }
    }
  });

  console.log('existingMember', existingMember);

  if (existingMember) {
    const joinGroupError = new JoinRequestError("You are already a member of this group.", 400);
    throw joinGroupError;
  }

  // Check if there's already a pending request
  const existingRequest = await prisma.joinRequest.findFirst({
    where: {
      userId: user.id,
      groupId,
      status: JoinRequestStatus.PENDING,
    },
  });
  console.log('existingRequest', existingRequest);
  if (existingRequest) {
    const joinGroupError = new JoinRequestError("You already have a pending join request.", 400);
    throw joinGroupError;
  }

  // Create new join request
  const joinRequest: JoinRequest = await prisma.joinRequest.create({
    data: {
      userId: user.id,
      groupId,
      status: JoinRequestStatus.PENDING,
    },
    include: {
      user: true,
      group: true
    }
  });

  return joinRequest;
  }

export const approveJoinRequest = async(joinRequestId: string, authId: string) => {
    const user: any = await prisma.user.findUnique({
          where: {
            superTokensId: authId,
          },
    });
    
    const joinReq = await prisma.joinRequest.findUnique({
        where: { 
          id: joinRequestId 
        },
        include: {
          group: true,
        },
    });
  
    if (!joinReq) {
      throw new JoinRequestError("Join request not found.", 404);
    }

    if (joinReq.status !== JoinRequestStatus.PENDING) {
      throw new JoinRequestError("This request is no longer pending.", 400);
    }

    // Verify current user is admin for this group
    const adminMembership = await prisma.groupUser.findUnique({
      where: {
        groupId_userId: {
          groupId: joinReq.group.id,
          userId: user.id,
        },
      },
    });

    if (!adminMembership || !adminMembership.isAdmin) {
      throw new JoinRequestError("You are not an admin for this group.", 403);
      
    }

    // Approve + add membership in a transaction
    await prisma.$transaction([
      prisma.joinRequest.update({
        where: { id: joinReq.id },
        data: { status: JoinRequestStatus.APPROVED },
      }),
      prisma.groupUser.upsert({
        where: {
          groupId_userId: {
            userId: joinReq.userId,
            groupId: joinReq.groupId,
          }
        },
        create: {
          userId: joinReq.userId,
          groupId: joinReq.groupId,
          isAdmin: false,
        },
        update: {}, // membership already exists -> nothing to change
      }),
    ]);
    
    return true;
  }

export const rejectJoinRequest = async(joinRequestId: string, authId: string) => {
  // Load the request
  const user: any = await prisma.user.findUnique({
      where: {
        superTokensId: authId,
      },
  });

  const joinReq = await prisma.joinRequest.findUnique({
      where: { id: joinRequestId },
    });

    if (!joinReq) {
      throw new JoinRequestError("Join request not found.", 404);
    }

    if (joinReq.status !== JoinRequestStatus.PENDING) {
      throw new JoinRequestError("This request is no longer pending.", 400);
    }

    // Verify current user is admin for this group
    const adminMembership = await prisma.groupUser.findUnique({
      where: {
        groupId_userId: {
          userId: user.id,
          groupId: joinReq.groupId,
        },
      },
    });

    if (!adminMembership || !adminMembership.isAdmin) {
      throw new JoinRequestError("You are not an admin for this group.", 403);
    }

    await prisma.joinRequest.update({
      where: { id: joinRequestId },
      data: { status: JoinRequestStatus.REJECTED },
    });
}
//#endregion

//#region UPDATE
export const updateGroup = async(
    groupId: string,
    name: string,
    addressId: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    description?: string,
    imageUrl?: string,
    websiteUrl?: string

  ) => {

  const group = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      name: name,
      description: description !== undefined ? description : "",
      imageUrl: imageUrl !== undefined ? imageUrl : "",
      websiteUrl: websiteUrl !== undefined ? websiteUrl : "",
      groupAddress: {
        update: {
          where: {
            id: addressId, // Specify the ID of the address to update
          },
          data: { // Use 'data' instead of 'update'
            street: street,
            city: city,
            state: state,
            zip: zip,
          },
        },
      },
    },
  });
return group;
}
//#endregion