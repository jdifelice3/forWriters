"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const express_2 = require("supertokens-node/framework/express");
const config_1 = require("./config");
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userProfileRoutes_1 = __importDefault(require("./routes/userProfileRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
const meRoute_1 = __importDefault(require("./routes/meRoute"));
const readingRoutes_1 = __importDefault(require("./routes/readingRoutes"));
supertokens_node_1.default.init(config_1.SuperTokensConfig);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.WEB_HOST,
    allowedHeaders: ["content-type", ...supertokens_node_1.default.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));
app.use((0, express_2.middleware)());
// Logging Middleware
app.use((req, res, next) => {
    // Store original response send method
    const originalSend = res.send.bind(res); // Bind the res context to originalSend
    // Override the response send method
    res.send = function (body) {
        return originalSend(body); // Call the original send method
    };
    next();
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/userProfile', userProfileRoutes_1.default);
app.use('/api/files', fileRoutes_1.default);
app.use('/api/pdfs', pdfRoutes_1.default);
app.use('/api/groups', groupRoutes_1.default);
app.use('/api/me', meRoute_1.default);
app.use('/api/events', readingRoutes_1.default);
const uploadDir = path_1.default.join(process.cwd(), "uploads");
app.use("/uploads", express_1.default.static(uploadDir));
// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
    res.send("hello");
});
app.get("/api/sessioninfo", async (req, res, next) => {
    try {
        const session = await session_1.default.getSession(req, res, { sessionRequired: true });
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(true),
            accessTokenPayload: session.getAccessTokenPayload(),
        });
    }
    catch (err) {
        next(err);
    }
});
// In case of session related errors, this error handler returns 401 to the client.
app.use((0, express_2.errorHandler)());
const PORT = process.env.PORT || "3001";
app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));
