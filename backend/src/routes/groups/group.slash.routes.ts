import { Router } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { Prisma } from "@prisma/client";

const router = Router();

router.post("/", async( req, res, next) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);

    try {
        const {name, 
            description,
            imageUrl,
            eventType,
            address,
            defaultMinDaysBetweenReads,
            defaultMaxConsecutiveReads,
            inviteEmailsCsv,
            websiteUrl,
            groupType
        } = req.body;
    
        const user: any = await prisma.user.findUnique({
            where: {
                superTokensId: authId,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }
        let group: any = null;
        switch (groupType) {
            case "WRITING":
                group = await prisma.group.create({
                data: {
                    name: name,
                    description: description,
                    creatorUserId: user.id, 
                    imageUrl: (imageUrl !== undefined) ? imageUrl : "",
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
                            role: "ADMIN",
                        }
                    }
                },
                include: {
                    groupUser: true,       // REQUIRED
                    groupAddress: true,    // REQUIRED if you include it in the type
                },
                });
                break;
            case "PERSONAL":
                group = await prisma.group.create({
                data: {
                    name: name,
                    description: description,
                    creatorUserId: user.id, 
                    imageUrl: (imageUrl !== undefined) ? imageUrl : "",
                    groupType: groupType,
                    groupUser: {
                        create: {
                            userId: user.id,
                            role: "ADMIN",
                        }
                    }
                },
                include: {
                    groupUser: true
                },
                });
                break;
            default: 
                res.status(403).json({error: "Invalid GroupType value"})
        } 

        if(group){
            res.json(group);
        } else {
            next(new Error("Group creation failed"));
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                console.error("error message:", err.message);
                if(err.message.indexOf("Unique constraint failed on the fields: (`name`)") !== -1){
                    throw new Error("A group with this name already exists. Please choose another.")
                }
                console.error('There is a unique constraint violation, a new user cannot be created with this email');
            }
        } else {
            console.error('Error creating group:', err);
            next(err);
        }
    }
});
export default router;