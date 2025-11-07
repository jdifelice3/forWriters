import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "../config.js";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { getUsers } from "./db.js";

supertokens.init(SuperTokensConfig);

const app = express();

console.log('DATABASE_URL=',process.env.DATABASE_URL);
app.use(
    cors({
        origin: `${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

// This endpoint can be accessed regardless of
// having a session with SuperTokens
app.get("/hello", async (_req, res) => {
    res.send("hello");
});

app.get("/users", async (_req, res) => {
    try{
        const prisma = new PrismaClient();
        const users = await prisma.users.findMany();
        //let users = await getUsers();
        res.json(users);
    } catch (err) {
        console.error("DB error:", err);
        res.status(500).json({ error: "Database error",
                               stack: JSON.stringify(err)
         });
    }
});

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
app.get("/tenants", async (_req, res) => {
    const tenants = await Multitenancy.listAllTenants();
    res.send(tenants);
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(process.env.API_PORT, () => console.log(`API Server listening on port ${process.env.API_PORT}`));
