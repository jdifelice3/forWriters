import "dotenv/config";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "../config.js";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import pdfRoutes from './routes/pdfRoutes.js';

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

app.use('/api/users', userRoutes); 
app.use('/api/userProfile', userProfileRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/pdfs', pdfRoutes);
// app.get("/something", async (_req, res) => {
//     res.send("nothing");
// });


app.use(middleware());

// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.url}`);
//     console.log('Origin:', req.headers.origin);
//     next();
// });

// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
    res.send("hello");
});

app.get("/api/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

// backend: /api/me
// app.get("/api/me", async (req, res) => {
//   const session = await Session.getSession(req, res);
//   const authId: string = session.getUserId();
//   const user: any = await prisma.users.findUnique({ 
//         where: { superTokensId: authId } 
//     });
//   res.json({ id: user.id, email: user.email });
// });




// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(process.env.API_PORT, () => console.log(`API Server listening on port ${process.env.API_PORT}`));
