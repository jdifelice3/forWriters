import { Router, Request, Response } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { Prisma } from "@prisma/client";

const router = Router();

router.get("/groupcount", async(req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const user: any = await prisma.user.findUnique({where: {superTokensId: authId}});
    
    const group = await prisma.group.findMany({
        include: {
            groupUser: {
                where: {
                    userId: user.id
                }
            }
        }
    });

    let groupCount = {
        count: group.length
    }

    res.json(groupCount);
});

router.post("/", async( req, res, next) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();

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

        const group = await prisma.group.create({
            data: {
                name,
                description,
                creatorUserId: user.id,
                imageUrl: imageUrl ?? "",
                groupType,
                ...(groupType === "WRITING" && {
                groupAddress: {
                    create: address,
                },
                }),
                groupUser: {
                create: {
                    userId: user.id,
                    role: "ADMIN",
                },
                },
            },
            select: { 
                id: true,
                name: true, 
                groupType: true,
            },
        });

        res.status(200).json(group);
        
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                console.error("error message:", err.message);
                if(err.message.indexOf("Unique constraint failed on the fields: (`name`)") !== -1){
                    res.status(500).json({error: "A group with this name already exists. Please choose another."});
                }
                console.error('There is a unique constraint violation, a new user cannot be created with this name');
            }
        } else {
            console.error('Error creating group:', err);
            res.status(500).json({error: "The group could not be created."})
            //next(err);
        }
    }
});
export default router;