import express from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";

const router = express.Router();

router.get("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({
        where: 
            {
                superTokensId: authId,
            },
            include: {
                userProfile: true,  
            }
    });
    
    res.status(200).json(user);
});

router.put("/", async (req, res) => {
    const { userId, firstName, lastName, bio } = req.body;
    
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

    res.status(200).json(updatedUser);
});

export default router;