import express from "express";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { PrismaClient } from "@prisma/client";
import { SessionRequest } from "supertokens-node/framework/express";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", verifySession(), async (req: SessionRequest, res) => {
    try{
        console.log("ME route entered")
        // 1. Get the session
        const session = req.session!;

        // 2. Extract Supertokens userId
        const authId = session.getUserId();
        
        // 3. Do ONLY this prisma lookup
        const user = await prisma.user.findUnique({
            where: { superTokensId: authId },
            select: {
            id: true,
            email: true,
            username: true,
            createdAt: true,
            updatedAt: true,
            },
        });

        return res.json(user);
    } catch (err) {
        console.error("ME ROUTE CRASH", err);
        res.status(500).json({ error: "me crashed" });
    }
  
});

router.get("/profile", async(req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

    if(!user) throw new Error("User not found");
    const profile = await prisma.userProfile.findUnique({
        where: {
            id: user.id 
        }
    });

    return profile;
});

router.put("/profile", async(req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    const { firstName, lastName, phone, bio } = req.body;

    if(!user) throw new Error("User not found");
    const profile = await prisma.userProfile.update({
        where: {
            id: user.id
        },
        data: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            bio: bio
        }
    });

    return profile;
});

router.get("/groups", verifySession(), async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

    if(!user) {
        res.status(404).json({"error": "User not found"});
    }
    const groups = await prisma.groupUser.findMany({
        where: {
            userId: user!.id,
        },
        select: {
        group: {
            select: {
            id: true,
            name: true,
            groupType: true,
            },
        },
        user: {
            select: {
                role: true
            }
        },
        },
    });

    res.status(200).json(
        groups.map(g => ({
            id: g.group.id,
            name: g.group.name,
            role: g.user.role,
            groupType: g.group.groupType
        }))
    );
});

export default router;
