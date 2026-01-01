import express from "express";
import { PrismaClient, Role } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import {deleteUser} from "supertokens-node";
import { 
    updateUserProfile, 
    getUserProfile, 


} from "../database/dbUsers";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { 
  JoinRequestError
} from "../database/types/Error";

const router = express.Router();



//#region GET
router.get("/", async (_req, res) => {
    try{
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        //let users = await getUsers();
        res.json(users);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ error: "Database error",
                               stack: JSON.stringify(err)
         });
    }
});



//#region DELETE
router.delete("/:id", async(_req, res) => {
    let userId = _req.params.id;
    await deleteUser(userId); // this will succeed even if the userId didn't exist.

    res.json({"message": `deleted userId ${userId}`});
});
//#endregion


// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
// router.get("/api/tenants", async (_req, res) => {
//     const tenants = await Multitenancy.listAllTenants();
//     res.send(tenants);
// });

export default router;