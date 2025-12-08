"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbUsers_1 = require("../database/dbUsers");
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const authId = _req.query.authId;
        if (typeof authId === 'string') {
            const results = await (0, dbUsers_1.getUserProfile)(authId);
            res.status(200).json(results);
        }
        else {
            res.send(`Name parameter is not a string (${typeof authId})`);
        }
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        else {
            res.status(500).json({ error: 'An unspecified error ocurred' });
        }
    }
});
router.put("/", async (_req, res) => {
    try {
        const { userId, firstName, lastName, bio } = _req.body;
        const results = await (0, dbUsers_1.updateUserProfile)(userId, firstName, lastName, bio);
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        else {
            res.status(500).json({ error: 'An unspecified error ocurred' });
        }
    }
});
exports.default = router;
