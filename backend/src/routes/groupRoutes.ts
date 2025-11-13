import express from "express";
//import { GroupType } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import { createGroup, getGroup, getGroupByUserId, } from "../database/dbGroups";
import { createNewsItem, getNews } from '../database/dbNews';
import { getEvents, createEvent, eventAddUser } from '../database/dbEvents';

const router = express.Router();

router.get("/:id", async(_req, res) => {
    try {
      const group = await getGroup(_req.params.id);
      res.json(group);
    } catch (err) {
      console.error('Error retrieving group:', err);
      res.status(500).json({ err: 'Error retrieving group' });
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
      } = _req.body;
    const group = await createGroup(authId, name, address, description, imageUrl);

    res.json(group);
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ err: 'Error creating group' });
  }
})

/******* News */

router.post("/:id/news", async (req, res) => {
  try {
    console.log('in groupRoutes.ts');
    console.log('Request.Body', req.body);
    const { title, content } = req.body;
    const newsItem = await createNewsItem(req.params.id, title, content);
    res.json(newsItem);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Error creating group' });
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



export default router;