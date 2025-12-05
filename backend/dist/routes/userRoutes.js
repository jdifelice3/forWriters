"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const supertokens_node_1 = require("supertokens-node");
const dbUsers_1 = require("../database/dbUsers");
const domain_types_1 = require("../domain-types");
const router = express_1.default.Router();
//#region GET
router.get("/", async (_req, res) => {
    try {
        const prisma = new client_1.PrismaClient();
        const users = await prisma.user.findMany();
        //let users = await getUsers();
        res.json(users);
    }
    catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ error: "Database error",
            stack: JSON.stringify(err)
        });
    }
});
// router.get("/search", async (_req, res) => {
//     console.log('in user search route');
//     const query:string = (_req.query.query as string) || "";
//     console.log('query', query);
//     try {
//         if (!query.trim()) {
//         return res.json([]);
//         }
//         const groups = await getUserSearch(query);
//         res.json(groups);
//     } catch (err) {
//         console.error("Error searching groups:", err);
//         res.status(500).json({ error: "Failed to search groups." });
//     }
// });
router.get("/search", async (_req, res) => {
    const session = await session_1.default.getSession(_req, res);
    const authId = session.getUserId(); //need current user to exclude it from the search results
    const query = _req.query.query || "";
    try {
        if (!query.trim()) {
            return res.json([]);
        }
        const groups = await (0, dbUsers_1.getUserSearch)(authId, query);
        res.json(groups);
    }
    catch (err) {
        console.error("Error searching groups:", err);
        res.status(500).json({ error: "Failed to search groups." });
    }
});
router.get("/admin/requests", async (req, res) => {
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId();
        const requests = await (0, dbUsers_1.getAdminRequests)(authId);
        res.status(200).json(requests);
    }
    catch (err) {
        console.error("Error loading admin join requests:", err);
        res.status(500).json({ error: "Failed to load join requests." });
    }
});
//#endregion
//#region POST
router.post("/:collaboratorId/connect", async (req, res) => {
    const { collaboratorId } = req.params;
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId();
        const collaboratorRequest = await (0, dbUsers_1.createMemberConnectRequest)(authId, collaboratorId);
        res.json(collaboratorRequest);
    }
    catch (err) {
        if (err instanceof domain_types_1.JoinRequestError) {
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
        const authId = session.getUserId();
        const isApproved = await (0, dbUsers_1.approveConnectRequest)(id, authId);
        if (isApproved) {
            res.status(200).json({
                message: "Member connect request had been approved.",
            });
        }
    }
    catch (err) {
        console.error("Error approving join request:", err);
        if (err instanceof domain_types_1.JoinRequestError) {
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
        const authId = session.getUserId();
        const result = await (0, dbUsers_1.rejectConnectRequest)(id, authId);
        res.status(200).json({
            message: "Member connect request has been rejected.",
        });
    }
    catch (err) {
        console.error("Error rejecting join request:", err);
        if (err instanceof domain_types_1.JoinRequestError) {
            res.status(err.statusCode).json({ error: err.message });
        }
        res.status(500).json({ error: "Failed to reject join request." });
    }
});
//#endregion
//#region DELETE
router.delete("/:id", async (_req, res) => {
    let userId = _req.params.id;
    await (0, supertokens_node_1.deleteUser)(userId); // this will succeed even if the userId didn't exist.
    res.json({ "message": `deleted userId ${userId}` });
});
//#endregion
// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
// router.get("/api/tenants", async (_req, res) => {
//     const tenants = await Multitenancy.listAllTenants();
//     res.send(tenants);
// });
exports.default = router;
