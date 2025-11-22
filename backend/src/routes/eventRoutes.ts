import express from "express";
import { Reading } from "../domain-types";
import Session from "supertokens-node/recipe/session";
import { createGroup, getGroup, getGroupByUserId, } from "../database/dbGroups";
import { createNewsItem, getNews } from '../database/dbNews';
import { 
  getReadings, 
  createReading, 
  createReadingAuthor, 
  getReadingAuthors, 
  createReadingFeedback,
  getReading 
} from '../database/dbEvents';

interface EventItem {
  eventId: string;
  uesrId: string;
  eventType: string;
}

const router = express.Router();

router.get("/:groupId", async(_req, res) => {
  const groupId = _req.params.groupId;
    try {
      const group = await getReadings(groupId);

      res.json(group);
    } catch (err) {
      console.error(`Error retrieving events for groupid ${groupId}`, err);
      res.status(500).json({ err: `Error retrieving events for groupid ${groupId}` });
    }
});

router.get("/:readingId/reading", async(_req, res) => {
  const readingId = _req.params.readingId;

  try {
    const reading: Reading = await getReading(readingId);

    res.json(reading);
  } catch (err) {
    console.error(`Error retrieving reading for readingId ${readingId}`, err);
    res.status(500).json({ err: `Error retrieving reading for readingId ${readingId}` });
  }
});

router.post("/:groupId", async (req, res) => {
  try {
    const {
        name, 
        createdUserId,
        readingDate,
        readingStartTime,
        readingEndTime,
        submissionDeadline,
        description
    } = req.body;
    const reading = await createReading(
      req.params.groupId, 
      name, 
      createdUserId,
      readingDate,
      readingStartTime,
      readingEndTime,
      submissionDeadline,
      description
    );
    res.json(reading);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Error creating event' });
  }
});

router.post("/:id/signup", async (req, res) => {
  try {
    const { userId } = req.body;
    const readingId = req.params.id;
    //const { title, content } = req.body;
    const signup = await createReadingAuthor(readingId, userId);
    res.json(signup);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

router.post("/:id/feedback", async(_req, res) => {
  try {
    const {readingAuthorId, feedbackFileId } = _req.body;
    const eventAppFileId = await createReadingFeedback(readingAuthorId, feedbackFileId);
    res.json(eventAppFileId)    
  } catch (err) {
    console.error('Error adding an event feedback file:', err);
    res.status(500).json({ error: 'Error adding an event feedback file' });
  }
});

router.get("/:id/readingauthors", async(req, res) => {
  const readingId:string = req.params.id;
  try {
    const events = await getReadingAuthors(readingId);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

export default router;