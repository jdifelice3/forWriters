import express from "express";
import { updateUserProfile, getUserProfile } from "../database/dbUsers";

const router = express.Router();

router.get("/", async (_req, res) => {

    try{
        const authId = _req.query.authId;
        console.log('authId', authId);
        if (typeof authId === 'string') {
            const results = await getUserProfile(authId);
            res.status(200).json(results);
        } else {
            res.send(`Name parameter is not a string (${typeof authId})`);
        }
    } catch (err: unknown) {
        console.error(err); 
        if (err instanceof Error) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        } else {
            res.status(500).json({ error: 'An unspecified error ocurred' });
        }
    }
});

router.put("/", async (_req, res) => {
    try{
        console.log('_req.body', _req.body);
        const { userId, firstName, lastName, bio } = _req.body;
        const results = await updateUserProfile(userId, firstName, lastName, bio);
        res.status(200).json(results);
    } catch (err: unknown) {
        console.error(err); 
        if (err instanceof Error) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        } else {
            res.status(500).json({ error: 'An unspecified error ocurred' });
        }
    }
});

export default router;