import "dotenv/config";
import path from 'path';
import Session from "supertokens-node/recipe/session";
import { SessionRequest } from "supertokens-node/framework/express";
import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./config";

console.log("=== Loaded SuperTokensConfig ===");
console.log("apiDomain =", SuperTokensConfig.appInfo.apiDomain);
console.log("websiteDomain =", SuperTokensConfig.appInfo.websiteDomain);
console.log("Expected cookieDomain =", ".onrender.com");
console.log("SUPERTOKENS_URI =", process.env.SUPERTOKENS_CONNECTION_URI);
console.log("SUPERTOKENS_API_KEY =", process.env.SUPERTOKENS_API_KEY ? "[SET]" : "[MISSING]");
console.log("================================");

import bodyParser from "body-parser";   
import userRoutes from './routes/userRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import fileRoutes from './routes/fileRoutes';
import pdfRoutes from './routes/pdfRoutes';
import groupRoutes from './routes/groupRoutes';
import meRoute from './routes/meRoute';
import eventRoutes from './routes/readingRoutes';

supertokens.init(SuperTokensConfig);

const app = express();

app.set("trust proxy", true);

app.use(bodyParser.json());

app.use(
    cors({
        origin: process.env.WEB_HOST,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use("/auth", middleware());

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

app.use('/api/users', userRoutes); 
app.use('/api/userProfile', userProfileRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/me', meRoute);
app.use('/api/events', eventRoutes);
const uploadDir = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadDir));


// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
    res.send("hello");
});

// app.get("/api/sessioninfo", async (req, res, next) => {
//   try {
//     const session = await Session.getSession(req, res, { sessionRequired: true });

//     res.send({
//       sessionHandle: session.getHandle(),
//       userId: session.getUserId(true),
//       accessTokenPayload: session.getAccessTokenPayload(),
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// In case of session related errors, this error handler returns 401 to the client.

app.use("/auth", errorHandler());

const PORT: string = process.env.PORT || "3001";
app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));
