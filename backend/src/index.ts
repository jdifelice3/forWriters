import "dotenv/config";
import "supertokens-node/recipe/session/framework/express";
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import supertokens from "supertokens-node";
import {
  middleware as supertokensMiddleware,
  errorHandler as supertokensErrorHandler,
} from "supertokens-node/framework/express";

import { SuperTokensConfig } from "./config";

// Infrastructure routes
import fileUploadRoutes from "./routes/files/files.routes";

// API router (JSON-only domain routes)
import apiRoutes from "./routes";

import billingRouter from "./routes/billing/billing.routes";

// -----------------------------------------------------------------------------
// Environment checks
// -----------------------------------------------------------------------------
if (!process.env.WEB_HOST) {
  throw new Error("WEB_HOST environment variable is undefined");
}

// -----------------------------------------------------------------------------
// SuperTokens init
// -----------------------------------------------------------------------------
supertokens.init(SuperTokensConfig);

// -----------------------------------------------------------------------------
// Express app
// -----------------------------------------------------------------------------
const app = express();
app.set("trust proxy", true);

app.use((req, _res, next) => {
  console.log("REQ:", req.method, req.path);
  next();
});

// -----------------------------------------------------------------------------
// CORS
// -----------------------------------------------------------------------------
app.use(
  cors({
    origin: process.env.WEB_HOST,
    allowedHeaders: [
      "content-type",
      ...supertokens.getAllCORSHeaders(),
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);

app.get("/__health", (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

// -----------------------------------------------------------------------------
// SuperTokens core middleware (auth plumbing)
// -----------------------------------------------------------------------------
app.use(supertokensMiddleware());

// -----------------------------------------------------------------------------
// 🚨 Upload routes (MUST come before body parsing)
// -----------------------------------------------------------------------------
app.use("/api/files", fileUploadRoutes);

// -----------------------------------------------------------------------------
// Body parsing (JSON APIs only)
// -----------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// IMPORTANT: mount billing BEFORE express.json if express.json is global
app.use(
  "/api/billing/webhook",
  bodyParser.raw({ type: "application/json" })
);

// 2️⃣ Billing routes (checkout, portal, webhook handler)
app.use("/api/billing", billingRouter);

// If your app does: app.use(express.json())
// make sure it is mounted AFTER the above line OR excluded for /api/billing/webhook.
// -----------------------------------------------------------------------------
// Static uploads (download / preview)
// -----------------------------------------------------------------------------
const uploadDir = path.join(process.cwd(), "uploads");

app.use(
  "/uploads",
  express.static(uploadDir, {
    setHeaders: (res, filePath) => {
      res.setHeader("Access-Control-Allow-Origin", process.env.WEB_HOST!);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Expose-Headers",
        "Content-Disposition"
      );

      const filename = path.basename(filePath);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
    },
  })
);

// -----------------------------------------------------------------------------
// JSON API routes (authenticated + domain logic)
// -----------------------------------------------------------------------------
app.use("/api", apiRoutes);

// -----------------------------------------------------------------------------
// SuperTokens error handler (MUST be last)
// -----------------------------------------------------------------------------
app.use(supertokensErrorHandler());

// -----------------------------------------------------------------------------
// Server start
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`);
});
