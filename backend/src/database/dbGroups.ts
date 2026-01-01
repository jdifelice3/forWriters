import { Prisma, JoinRequestStatus, GroupType } from "@prisma/client";
import prisma from "../database/prisma"
import { z } from 'zod';
import { join } from "node:path";
import { GroupError, JoinRequestError } from "./types/Error";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required").max(2, "Use 2-letter code"),
  zip: z.string().min(5, "ZIP is required").max(10, "Invalid ZIP"),
});

type Address = z.infer<typeof addressSchema>;

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