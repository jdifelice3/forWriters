"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
const Error_1 = require("../types/Error");
const dbGroups_1 = require("../database/dbGroups");
const dbNews_1 = require("../database/dbNews");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
//#region GET
router.get("/:id", async (_req, res) => {
    try {
        const group = await (0, dbGroups_1.getGroup)(_req.params.id);
        res.json(group);
    }
    catch (err) {
        console.error('Error retrieving group:', err);
        res.status(500).json({ err: 'Error retrieving group' });
    }
});
router.get("/:id/description", async (_req, res) => {
    try {
        const group = await (0, dbGroups_1.getGroupDescription)(_req.params.id);
        res.json(group);
    }
    catch (err) {
        console.error('Error retrieving group:', err);
        res.status(500).json({ err: 'Error retrieving group' });
    }
});
router.get("/search/search", async (_req, res) => {
    const query = _req.query.query || "";
    try {
        if (!query.trim()) {
            return res.json([]);
        }
        const groups = await (0, dbGroups_1.getGroupSearch)(query);
        res.json(groups);
    }
    catch (err) {
        console.error("Error searching groups:", err);
        res.status(500).json({ error: "Failed to search groups." });
    }
});
router.get("/user/:id", async (_req, res) => {
    try {
        const group = await (0, dbGroups_1.getGroupByUserId)(_req.params.id);
        res.json(group);
    }
    catch (err) {
        console.error('Error retrieving group:', err);
        res.status(500).json({ err: 'Error retrieving group' });
    }
});
router.get("/:groupId/groupuser", async (_req, res) => {
    try {
        const groupUsers = await (0, dbGroups_1.getGroupUsers)(_req.params.groupId);
        res.json(groupUsers);
    }
    catch (err) {
        console.error('Error retrieving group:', err);
        res.status(500).json({ err: 'Error retrieving group' });
    }
});
router.get("/:id/news", async (_req, res) => {
    const groupId = _req.params.id;
    try {
        const group = await (0, dbNews_1.getNews)(groupId);
        res.json(group);
    }
    catch (err) {
        console.error(`Error retrieving news for groupid ${groupId}`, err);
        res.status(500).json({ err: `Error retrieving news for groupid ${groupId}` });
    }
});
router.get("/admin/requests", async (req, res) => {
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId(true);
        const requests = await (0, dbGroups_1.getAdminRequests)(authId);
        // Shape data for frontend
        if (requests) {
            const payload = requests.map((req) => ({
                id: req.id,
                userId: req.userId,
                userName: req.user.username,
                groupId: req.groupId,
                groupName: req.group.name,
                createdAt: req.createdAt,
            }));
            res.json(payload);
        }
        else {
            return res.json([]);
        }
    }
    catch (err) {
        console.error("Error loading admin join requests:", err);
        res.status(500).json({ error: "Failed to load join requests." });
    }
});
//#endregion
//#region POST
router.post("/", async (_req, res) => {
    const session = await session_1.default.getSession(_req, res);
    const authId = session.getUserId(true);
    try {
        const { name, description, imageUrl, eventType, address, defaultMinDaysBetweenReads, defaultMaxConsecutiveReads, inviteEmailsCsv, websiteUrl, groupType } = _req.body;
        const group = await (0, dbGroups_1.createGroup)(authId, name, address, description, groupType, imageUrl, websiteUrl);
        res.json(group);
    }
    catch (err) {
        console.error('Error creating group:', err);
        res.status(500).json({ err: 'Error creating group' });
    }
});
router.post("/:id/news", async (req, res) => {
    try {
        const { title, content } = req.body;
        const newsItem = await (0, dbNews_1.createNewsItem)(req.params.id, title, content);
        res.json(newsItem);
    }
    catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Error creating group' });
    }
});
router.post("/:groupId/join", async (req, res) => {
    const { groupId, } = req.params;
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId(true);
        const joinRequest = await (0, dbGroups_1.createJoinGroupRequest)(authId, groupId);
        res.json(joinRequest);
    }
    catch (err) {
        if (err instanceof Error_1.JoinRequestError) {
            res.status(err.statusCode).json({ error: err.message });
        }
        else {
            console.error("Error creating join request:", err);
            res.status(500).json({ error: "Failed to create join request." });
        }
    }
});
router.post("/admin/requests/:id/approve", async (req, res) => {
    const { id } = req.params;
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId(true);
        const isApproved = await (0, dbGroups_1.approveJoinRequest)(id, authId);
        if (isApproved) {
            res.status(200).json({
                message: "User approved and added to the group.",
            });
        }
    }
    catch (err) {
        console.error("Error approving join request:", err);
        if (err instanceof Error_1.JoinRequestError) {
            res.status(err.statusCode).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "Failed to approve join request." });
        }
    }
});
router.post("/admin/requests/:id/reject", async (req, res) => {
    const { id } = req.params;
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId(true);
        const result = await (0, dbGroups_1.rejectJoinRequest)(id, authId);
        res.status(200).json({
            message: "User join request has been rejected.",
        });
    }
    catch (err) {
        console.error("Error rejecting join request:", err);
        if (err instanceof Error_1.JoinRequestError) {
            res.status(err.statusCode).json({ error: err.message });
        }
        res.status(500).json({ error: "Failed to reject join request." });
    }
});
//#endregion
//#region PUT
router.put("/:groupId", async (_req, res) => {
    const groupId = _req.params.groupId;
    try {
        const { name, addressId, imageUrl, websiteUrl, description, street, city, state, zip, } = _req.body;
        const group = await (0, dbGroups_1.updateGroup)(groupId, name, addressId, street, city, state, zip, description, imageUrl, websiteUrl);
        return res.json(group);
    }
    catch (err) {
        console.error('Error updating group:', err);
        res.status(500).json({ err: 'Error updating group' });
    }
});
//#endregion
exports.default = router;
