import express from "express";
import { Reading, ReadingAuthorBasic } from "../domain-types";
import Session from "supertokens-node/recipe/session";
import { createGroup, getGroup, getGroupByUserId, } from "../database/dbGroups";
import { createNewsItem, getNews } from '../database/dbNews';
import { 
  getReadings, 
  createReading, 
  createReadingAuthor, 
  getReadingAuthors, 
  createReadingFeedback,
  getReading, 
  getReadingsByUserId,
  deleteReadingAuthor
} from '../database/dbReadings';
import { ReadingAuthor } from "@prisma/client";
import { addAbortListener } from "events";
import { addFileToReading } from "../database/dbReadings";

interface EventItem {
  eventId: string;
  uesrId: string;
  eventType: string;
}

const router = express.Router();

//#region GET
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

router.get("/user/author", async(_req, res) => {
    console.log('in /api/events/user/author');
  try{
    
    const session = await Session.getSession(_req, res);
    const authId = session.getUserId();

    const readings: ReadingAuthor[] = await getReadingsByUserId(authId);
    console.log('after getReadingsByUserId');
    console.log('readings', readings);
    res.status(200).json(readings);
  } catch (err) {
    console.error(`Error retrieving readings with userId.`, err);
    res.status(500).json({ err: `Error retrieving readings with userId.` });
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
//#endregion

//#region POST
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

router.post("/file/add", async(_req, res) => {
// Add File to Reading
  try {
    
    console.log('_req.body', _req.body);
    const { readingAuthorId, appFileId } = _req.body;
    const addedFile = await addFileToReading(readingAuthorId, appFileId);
    res.status(200).json(addedFile); 
  } catch (err) {
    console.error('Error adding a file to a reading:', err);
    res.status(500).json({ error: 'Error adding a file to a reading' });
  }
});

//#endregion

//#region DELETE

router.delete("/:id/withdraw", async (req, res) => {
  try {
    const { userId } = req.body;
    const readingId = req.params.id;
    const withdraw = await deleteReadingAuthor(readingId, userId);
    res.status(200).json(withdraw);
  } catch (error) {
    console.error('Error signing up for event:', error);
    res.status(500).json({ error: 'Error signing up for event' });
  }
});

//#endregion

export default router;