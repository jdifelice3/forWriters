"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const session = await session_1.default.getSession(req, res);
        const authId = session.getUserId(true);
        const user = await prisma.user.findUnique({
            where: { superTokensId: authId },
            select: { id: true, email: true, username: true, createdAt: true, updatedAt: true },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found in database" });
        }
        res.json(user);
    }
    catch (err) {
        console.error("In meRoute.ts, GET:", err);
        return res.status(401).json({ error: "Unauthorized" });
    }
});
exports.default = router;
