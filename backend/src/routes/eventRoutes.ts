import express from "express";
import Session from "supertokens-node/recipe/session";
import { createGroup, getGroup, getGroupByUserId, } from "../database/dbGroups";
import { createNewsItem, getNews } from '../database/dbNews';
import { getEvents, createEvent, eventAddUser, getEventSubmissions, createEventFeedback } from '../database/dbEvents';

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
    const { title, content } = req.body;
    const signup = await eventAddUser(eventId, userId, eventType);
    res.json(signup);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

router.post("/:id/feedback", async(_req, res) => {
  try {
    const {eventId, userId, appFileId} = _req.body;
    const eventAppFileId = await createEventFeedback(eventId, userId, appFileId);
    res.json(eventAppFileId)    
  } catch (err) {
    console.error('Error adding an event feedback file:', err);
    res.status(500).json({ error: 'Error adding an event feedback file' });
  }
});

router.get("/:id/submissions", async(req, res) => {
  const eventId:string = req.params.id;
  try {
    const events = await getEventSubmissions(eventId);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

export default router;