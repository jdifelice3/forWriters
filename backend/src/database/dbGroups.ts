import { PrismaClient } from "@prisma/client";
import { Group, GroupGetBasic, GroupType, GroupCreate } from "../domain-types";
import { z } from 'zod';

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
  try {
    const group: GroupGetBasic | null = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        groupAddress: true,
        groupUrl: true
      },
    });

    return group;
  } catch (err) {
      console.error('Error creating group:', err);
      throw err; 
  }
}

export const getGroupByUserId = async(userId: string) => {
  try {
    const groups: any = await prisma.group.findMany({
      include: {
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
  console.log('in getGroupSearch', 'query', query);
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
//#endregion

//#region UPDATE
export const updateGroup = async(
    groupId: string,
    addressId: string,
    name: string, 
    address: Address, 
    description: string, 
    imgUrl?: string,
    websiteUrl?: string
  ) => {

    console.log('in updateGroup');
  const group = await prisma.group.update({
    where: {
      id: groupId,
    },
    data: {
      name: name,
      description: description,
      imageUrl: imgUrl !== undefined ? imgUrl : "",
      websiteUrl: websiteUrl,
      groupAddress: {
        update: {
          where: {
            id: addressId, // Specify the ID of the address to update
          },
          data: { // Use 'data' instead of 'update'
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
          },
        },
      },
    },
  });
return group;
}
//#endregion