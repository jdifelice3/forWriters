import express from "express";
import Session from "supertokens-node/recipe/session";
import { createGroup, getGroup, getGroupByUserId, } from "../database/dbGroups";
import { createNewsItem, getNews } from '../database/dbNews';
import { getEvents, createEvent, eventAddUser, getEventSignups } from '../database/dbEvents';

interface EventItem {
  eventId: string;
  uesrId: string;
  eventType: string;
}

const router = express.Router();

router.get("/:groupId", async(_req, res) => {
  const groupId = _req.params.groupId;
    try {
      const group = await getEvents(groupId);

      res.json(group);
    } catch (err) {
      console.error(`Error retrieving events for groupid ${groupId}`, err);
      res.status(500).json({ err: `Error retrieving events for groupid ${groupId}` });
    }
});

router.post("/:groupId", async (req, res) => {
  try {
    const {eventDate, submissionDeadline} = req.body;
    const eventItem = await createEvent(req.params.groupId, eventDate, submissionDeadline);
    res.json(eventItem);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Error creating event' });
  }
});

router.post("/:id/signup", async (req, res) => {
  try {
    const { userId, eventType } = req.body;
    const eventId = req.params.id;
    console.log('in groupRoutes.ts signup');
    console.log('Request.Body', req.body);
    const { title, content } = req.body;
    const signup = await eventAddUser(eventId, userId, eventType);
    res.json(signup);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

router.get("/:id/signups", async(req, res) => {
  console.log('in eventRoutes.get/id/signups');
  const eventId:string = req.params.id;
  try {
    const events = await getEventSignups(eventId);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

export default router;