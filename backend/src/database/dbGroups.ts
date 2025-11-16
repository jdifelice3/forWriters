import { PrismaClient, GroupType } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required").max(2, "Use 2-letter code"),
  zip: z.string().min(5, "ZIP is required").max(10, "Invalid ZIP"),
});

type Address = z.infer<typeof addressSchema>;


export const getGroup = async(groupId: string) => {
  try {
    const group: any = await prisma.groups.findUnique({
      where: {
        id: groupId,
      },
      include: {
        groupsAddresses: true,
        groupsUrls: true
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
    const groupsUsers: any = await prisma.groupsUsers.findMany({
      where: {
        userId: userId
      },
      include: {
        groups: true
      },
    });

    let groups:any = [];

    for (let i = 0; i < groupsUsers.length; i++){
      groups.push({
        id: groupsUsers[i].groups.id,
        userId: groupsUsers[i].groups.userId,
        groupType: groupsUsers[i].groups.groupType,
        name: groupsUsers[i].groups.name,
        description: groupsUsers[i].groups.description,
        imageUrl: groupsUsers[i].groups.imageUrl,
        createdAt: groupsUsers[i].groups.createdAt,
        updatedAt: groupsUsers[i].groups.updatedAt
      });
    }

    return groups;
  } catch (err) {
      console.error('Error creating group:', err);
      throw err; 
  }
}

export const createGroup = async (
      groupId: string,
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
    const user: any = await prisma.users.findUnique({
      where: {
        superTokensId: authId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const group = await prisma.groups.create({
      data: {
        name: name,
        description: description,
        creatorUserId: user.id, 
        imageUrl: (imgUrl !== undefined) ? imgUrl : "",
        groupType: groupType,
        groupsAddresses: {
          create: {
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,            
          }
        },
        groupsUsers: {
          create: {
            userId: user.id,
            isAdmin: true,
          }
        }
      }
    });

    console.log('Group created successfully:', group);
    return group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error; 
  }
};

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
  const group = await prisma.groups.update({
    where: {
      id: groupId,
    },
    data: {
      name: name,
      description: description,
      imageUrl: imgUrl !== undefined ? imgUrl : "",
      websiteUrl: websiteUrl,
      groupsAddresses: {
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