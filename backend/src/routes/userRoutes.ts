import express from "express";
import { PrismaClient, Role } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import {deleteUser} from "supertokens-node";
import { 
    updateUserProfile, 
    getUserProfile, 
    getUserSearch,
    createMemberConnectRequest,
    approveConnectRequest,
    rejectConnectRequest,
    getAdminRequests
} from "../database/dbUsers";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { 
  JoinRequestError
} from "../types/Error";

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

router.get("/search", async (_req, res) => {
    const session = await Session.getSession(_req, res);
    const authId = session.getUserId(true); //need current user to exclude it from the search results
    const query:string = (_req.query.query as string) || "";
    try {
        if (!query.trim()) {
        return res.json([]);
        }
        const groups = await getUserSearch(authId, query);
        
        res.json(groups);
    } catch (err) {
        console.error("Error searching groups:", err);
        res.status(500).json({ error: "Failed to search groups." });
    }
});

router.get("/admin/requests", async (req, res) => {
  try {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const requests = await getAdminRequests(authId);
      
    res.status(200).json(requests);
    
  } catch (err) {
    console.error("Error loading admin join requests:", err);
    res.status(500).json({ error: "Failed to load join requests." });
  }
});
//#endregion

//#region POST
router.post("/:collaboratorId/connect", async (req, res) => {
  const { collaboratorId  } = req.params;

  try {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const collaboratorRequest = await createMemberConnectRequest(authId, collaboratorId);

    res.json(collaboratorRequest);

  } catch (err) {
    if(err instanceof JoinRequestError){
      res.status(err.statusCode).json({error: err.message});      
    } else {
      console.error("Error creating join request:", err);
      res.status(500).json({ error: "Failed to create join request." });
    }
  }
});

router.post("/admin/requests/:id/approve", async (req, res) => {
    const { id } = req.params;

    try {
      const session = await Session.getSession(req, res);
      const authId = session.getUserId(true);
      const isApproved = await approveConnectRequest(id, authId);
      if(isApproved){
        res.status(200).json({
            message: "Member connect request had been approved.",
          });
      }
    } catch (err) {
      console.error("Error approving join request:", err);
      if(err instanceof JoinRequestError){
        res.status(err.statusCode).json({error: err.message});
      } else {
        res.status(500).json({ error: "Failed to approve join request." });
      }
    }
  }
);

router.post("/admin/requests/:id/reject",async (req, res) => {
    const { id } = req.params;

    try {
      const session = await Session.getSession(req, res);
      const authId = session.getUserId(true);
      const result = await rejectConnectRequest(id, authId);
      res.status(200).json({
        message: "Member connect request has been rejected.",
      });
    } catch (err) {
      console.error("Error rejecting join request:", err);
      if(err instanceof JoinRequestError){
        res.status(err.statusCode).json({error: err.message});
      }
      res.status(500).json({ error: "Failed to reject join request." });
    }
  }
);
//#endregion

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