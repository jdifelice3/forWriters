import express from "express";
import { PrismaClient } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import { GroupCreate } from "../domain-types";
import { 
  createGroup, 
  getGroup, 
  getGroupByUserId, 
  updateGroup,
  getGroupSearch 
} from "../database/dbGroups";
import { 
  createNewsItem, 
  getNews 
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

router.get("/search/search", async (_req, res) => {
  console.log('in eventRoutes /search');
  const query:string = (_req.query.query as string) || "";
  console.log('query', query);
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

//#endregion

//#region POST

router.post("/", async( _req, res) => {
  const session = await Session.getSession(_req, res);
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
      } = _req.body;
    const group: GroupCreate  = await createGroup(authId, name, address, description, groupType, imageUrl, websiteUrl);

    res.json(group);
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ err: 'Error creating group' });
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

//#endregion

//#region PUT
router.put("/", async(_req, res) => {
  
  try{
    const {
      groupId,
      addressId,
      authId, 
      name, 
      address, 
      description, 
      imgUrl,
      websiteUrl
    } = _req.body;

    const group = await updateGroup(
      groupId,
      addressId,
      name, 
      address, 
      description, 
      imgUrl,
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