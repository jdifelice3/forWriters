import express from "express";
import { PrismaClient } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { 
  JoinRequestError
} from "../types/Error";
import { 
  createGroup, 
  getGroup, 
  getGroupByUserId, 
  updateGroup,
  getGroupSearch,
  getAdminRequests,
  createJoinGroupRequest,
  approveJoinRequest,
  rejectJoinRequest,
  getGroupDescription,
  getGroupUsers
} from "../database/dbGroups";
import { 
  createNewsItem, 
  getNews,
  archiveNewsItem
} from '../database/dbNews';

const router = express.Router();
const prisma = new PrismaClient();

//#region GET

router.get("/:id", async(_req, res) => {
    try {
      const group = await getGroup(_req.params.id);
      res.json(group);
    } catch (err) {
      console.error('Error retrieving group:', err);
      res.status(500).json({ err: 'Error retrieving group' });
    }
});

router.get("/:id/description", async(_req, res) => {
    try {
        
      const group = await getGroupDescription(_req.params.id);
      res.json(group);
    } catch (err) {
      console.error('Error retrieving group:', err);
      res.status(500).json({ err: 'Error retrieving group' });
    }
});

router.get("/search/search", async (_req, res) => {
  const query:string = (_req.query.query as string) || "";
  
  try {
    if (!query.trim()) {
      return res.json([]);
    }
    const groups = await getGroupSearch(query);
    
    res.json(groups);
  } catch (err) {
    console.error("Error searching groups:", err);
    res.status(500).json({ error: "Failed to search groups." });
  }
});

router.get("/user/:id", async(_req, res) => {
    try {
      const group = await getGroupByUserId(_req.params.id);
      res.json(group);
    } catch (err) {
      console.error('Error retrieving group:', err);
      res.status(500).json({ err: 'Error retrieving group' });
    }
});

router.get("/:groupId/groupuser", async(_req, res) => {
    try {
      const groupUsers = await getGroupUsers(_req.params.groupId);
      res.json(groupUsers);
    } catch (err) {
      console.error('Error retrieving group:', err);
      res.status(500).json({ err: 'Error retrieving group' });
    }
});

router.get("/:id/news", async(_req, res) => {
  const groupId = _req.params.id;
    try {
      const group = await getNews(groupId);

      res.json(group);
    } catch (err) {
      console.error(`Error retrieving news for groupid ${groupId}`, err);
      res.status(500).json({ err: `Error retrieving news for groupid ${groupId}` });
    }
});

router.get("/admin/requests", async (req, res) => {
  try {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const requests = await getAdminRequests(authId);
    // Shape data for frontend
    if(requests){
      const payload = requests.map((req) => ({
        id: req.id,
        userId: req.userId,
        userName: req.user.username,
        groupId: req.groupId,
        groupName: req.group.name,
        createdAt: req.createdAt,
      }));

      res.json(payload);
    } else {

      return res.json([]);
    }
  } catch (err) {
    console.error("Error loading admin join requests:", err);
    res.status(500).json({ error: "Failed to load join requests." });
  }
});

//#endregion

//#region POST

router.post("/", async( _req, res) => {
  const session = await Session.getSession(_req, res);
  const authId = session.getUserId(true);
  console.log('in create group');
  console.log('authId', authId);
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
      } = _req.body;
    const group  = await createGroup(authId, name, address, description, groupType, imageUrl, websiteUrl);

    res.json(group);
  } catch (err: any) {
    console.error('Error creating group:', err);
    res.status(500).json({ err: err.message });
  }
});

router.post("/:id/news", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newsItem = await createNewsItem(req.params.id, title, content);
    res.json(newsItem);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Error creating group' });
  }
});

router.post("/:groupId/join", async (req, res) => {
  const { groupId,  } = req.params;

  try {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const joinRequest = await createJoinGroupRequest(authId, groupId);

    res.json(joinRequest);
   
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
      const isApproved = await approveJoinRequest(id, authId);
      if(isApproved){
        res.status(200).json({
            message: "User approved and added to the group.",
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
      const result = await rejectJoinRequest(id, authId);
      res.status(200).json({
        message: "User join request has been rejected.",
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

router.put("/news/:newsItemId/archive", async(_req, res) => {
  const newsItemId = _req.params.newsItemId;
    try {
      const archivedNewsItem = await archiveNewsItem(newsItemId);

      res.json(archivedNewsItem);
    } catch (err) {
      console.error(`Error archiving news item ${newsItemId}`, err);
      res.status(500).json({ err: `Error archiving news item ${newsItemId}` });
    }
});


//#endregion

//#region PUT
router.put("/:groupId", async(_req, res) => {
  const groupId = _req.params.groupId;
  try{
    const {
      name,
      addressId,
      imageUrl,
      websiteUrl,
      description,
      street,
      city,
      state,
      zip,
    } = _req.body;

    const group = await updateGroup(
      groupId,
      name,
      addressId,
      street,
      city,
      state,
      zip,
      description,
      imageUrl,
      websiteUrl
    );
    
    return res.json(group);
  } catch (err) {
    console.error('Error updating group:', err);
    res.status(500).json({ err: 'Error updating group' });
  }
});
//#endregion

export default router;