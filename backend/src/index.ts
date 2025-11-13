import "dotenv/config";
import Session from "supertokens-node/recipe/session";
import { SessionRequest } from "supertokens-node/framework/express";
import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./config";
import bodyParser from "body-parser";   
import userRoutes from './routes/userRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import fileRoutes from './routes/fileRoutes';
import pdfRoutes from './routes/pdfRoutes';
import groupRoutes from './routes/groupRoutes';
import meRoute from './routes/meRoute';
import eventRoutes from './routes/eventRoutes';

supertokens.init(SuperTokensConfig);

const app = express();
console.log(`${process.env.WEB_HOST}:${process.env.WEB_PORT}`);

app.use(bodyParser.json());

app.use(
    cors({
        origin: `${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

app.use('/api/users', userRoutes); 
app.use('/api/userProfile', userProfileRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/me', meRoute);
app.use('/api/events', eventRoutes);

// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
    res.send("hello");
});

app.get("/api/sessioninfo", async (req, res, next) => {
  try {
    const session = await Session.getSession(req, res, { sessionRequired: true });

    res.send({
      sessionHandle: session.getHandle(),
      userId: session.getUserId(),
      accessTokenPayload: session.getAccessTokenPayload(),
    });
  } catch (err) {
    next(err);
  }
});

// In case of session related errors, this error handler returns 401 to the client.
app.use(errorHandler());

app.listen(process.env.API_PORT, () => console.log(`API Server listening on port ${process.env.API_PORT}`));
