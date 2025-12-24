import "dotenv/config";
import path from 'path';
import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./config";

if (typeof process.env.WEB_HOST === undefined) {
  throw new Error("Environment variable process.env.SUPERTOKENS_CONNECTION_URI is undefined");
}

import bodyParser from "body-parser";   
import userRoutes from './routes/userRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import fileRoutes from './routes/fileRoutes';
import pdfRoutes from './routes/pdfRoutes';
import groupRoutes from './routes/groupRoutes';
import meRoute from './routes/meRoute';
import eventRoutes from './routes/readingRoutes';
import apiRoutes from "./routes/apiRoutes";

supertokens.init(SuperTokensConfig);

const app = express();

app.set("trust proxy", true);

app.use(
    cors({
        origin: process.env.WEB_HOST,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
        exposedHeaders: ["Content-Disposition"]
    })
);

app.use("/auth", middleware());

const uploadDir = path.join(process.cwd(), "uploads");

app.use(
  "/uploads",
  express.static(uploadDir, {
    setHeaders: (res, filePath) => {
      // 1. CORS
      res.setHeader("Access-Control-Allow-Origin", process.env.WEB_HOST!);
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // 2. Allow browser to read Content-Disposition
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

      // 3. Force download behavior
      const filename = path.basename(filePath);
      console.log('filePath', filePath);
      console.log('download filename', filename)
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    }
  })
);
app.use('/api/files', fileRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/filesApi', apiRoutes);

app.use('/api/users', userRoutes); 

app.use('/api/userProfile', userProfileRoutes);

app.use('/api/pdfs', pdfRoutes);

app.use('/api/groups', groupRoutes);

app.use('/api/me', meRoute);

app.use('/api/events', eventRoutes);

app.use(errorHandler());

const PORT: string = process.env.PORT || "3001";
app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));
