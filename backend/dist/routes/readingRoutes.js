"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Error_1 = require("../types/Error");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const dbReadings_1 = require("../database/dbReadings");
const dbReadings_2 = require("../database/dbReadings");
const router = express_1.default.Router();
//#region GET
router.get("/:groupId", async (_req, res) => {
    const groupId = _req.params.groupId;
    try {
        const group = await (0, dbReadings_1.getReadings)(groupId);
        res.json(group);
    }
    catch (err) {
        console.error(`Error retrieving events for groupid ${groupId}`, err);
        res.status(500).json({ err: `Error retrieving events for groupid ${groupId}` });
    }
});
router.get("/:readingId/reading", async (_req, res) => {
    const readingId = _req.params.readingId;
    try {
        const reading = await (0, dbReadings_1.getReading)(readingId);
        res.json(reading);
    }
    catch (err) {
        console.error(`Error retrieving reading for readingId ${readingId}`, err);
        res.status(500).json({ err: `Error retrieving reading for readingId ${readingId}` });
    }
});
router.get("/user/author", async (_req, res) => {
    try {
        const session = await session_1.default.getSession(_req, res);
        const authId = session.getUserId(true);
        const readings = await (0, dbReadings_1.getReadingsByUserId)(authId);
        res.status(200).json(readings);
    }
    catch (err) {
        console.error(`Error retrieving readings with userId.`, err);
        res.status(500).json({ err: `Error retrieving readings with userId.` });
    }
});
router.get("/:id/readingauthors", async (req, res) => {
    const readingId = req.params.id;
    try {
        const events = await (0, dbReadings_1.getReadingAuthors)(readingId);
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error signing up for event:', error);
        res.status(500).json({ error: 'Error signing up for event' });
    }
});
//#endregion
//#region POST
router.post("/:groupId", async (req, res) => {
    try {
        let { name, createdUserId, readingDate, readingStartTime, readingEndTime, submissionDeadline, description, schedule } = req.body;
        const reading = await (0, dbReadings_1.createReading)(req.params.groupId, name, createdUserId, readingDate, readingStartTime, readingEndTime, submissionDeadline, description, schedule);
        res.json(reading);
    }
    catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Error creating event' });
    }
});
router.post("/:id/signup", async (req, res) => {
    try {
        const { userId } = req.body;
        const readingId = req.params.id;
        //const { title, content } = req.body;
        const signup = await (0, dbReadings_1.createReadingAuthor)(readingId, userId);
        res.json(signup);
    }
    catch (error) {
        console.error('Error signing up for event:', error);
        res.status(500).json({ error: 'Error signing up for event' });
    }
});
router.post("/:id/feedback", async (_req, res) => {
    try {
        const { readingAuthorId, feedbackFileId } = _req.body;
        const eventAppFileId = await (0, dbReadings_1.createReadingFeedback)(readingAuthorId, feedbackFileId);
        res.json(eventAppFileId);
    }
    catch (err) {
        console.error('Error adding an event feedback file:', err);
        res.status(500).json({ error: 'Error adding an event feedback file' });
    }
});
router.post("/file/add", async (_req, res) => {
    // Add File to Reading
    try {
        const { readingAuthorId, appFileId } = _req.body;
        const addedFile = await (0, dbReadings_2.addFileToReading)(readingAuthorId, appFileId);
        res.status(200).json(addedFile);
    }
    catch (err) {
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
        const withdraw = await (0, dbReadings_1.deleteReadingAuthor)(readingId, userId);
        res.status(200).json(withdraw);
    }
    catch (error) {
        console.error('Error signing up for event:', error);
        res.status(500).json({ error: 'Error signing up for event' });
    }
});
router.delete("/:id/group/:groupId", async (req, res) => {
    try {
        const readingId = req.params.id;
        const groupId = req.params.groupId;
        const deletedReading = await (0, dbReadings_1.deleteReading)(readingId, groupId);
        res.status(200).json(deletedReading);
    }
    catch (err) {
        if (err instanceof Error_1.ReadingDeleteError) {
            res.status(err.statusCode).json({ error: err.message });
        }
        else if (err instanceof Error_1.ReadingDeleteInvalidGroupIdError) {
            res.status(err.statusCode).json({ error: err.message });
        }
        else {
            console.error("Error deleting reading:", err);
            res.status(500).json({ error: "Reading deletion failed. Unspecified error." });
        }
    }
});
//#endregion
exports.default = router;
