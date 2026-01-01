import { Router, Request, Response, NextFunction } from "express";
import prisma from "../database/prisma";
import Session from "supertokens-node/recipe/session";
import { JoinRequestError } from "../database/types/Error";
import { JoinRequestStatus, GroupRole } from "@prisma/client";

const router = Router();

router.get("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true); //need current user to exclude it from the search results
    const query:string = (req.query.query as string) || "";
    
    if (!query.trim()) {
        return res.json([]);
    }
        
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

    res.json(users);
});
export default router;