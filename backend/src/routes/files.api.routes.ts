import express from "express";
import { PrismaClient, CommentSource } from "@prisma/client";
import Session from "supertokens-node/recipe/session";
import prisma from "../database/prisma";
import { 
    getFileRecords, 
    updateFileRecord, 
    deleteFileRecord, 
    updateCurrentVersion,
    getFileSearch,
    getFileDescription
} from "../database/dbFiles";

const router = express.Router();

router.get("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({
        where: 
            {
                superTokensId: authId,
            },
            include: {
                userProfile: true,
            }
    });

    const files = await prisma.appFileMeta.findMany({
        include: {
            appFile: true
        },
        where: {
            userId: user?.id
        },
     
        orderBy: { title: "asc" }
    });

    res.json(files);
});

router.get("/:id/description", async(req, res) => {
    const file = await getFileDescription(req.params.id);
    res.json(file);
});

router.get("/search", async (req, res) => {
    const query:string = (req.query.query as string) || "";
    if (!query.trim()) {
      return res.json([]);
    }
    const files = await getFileSearch(query);
    
    res.json(files);
});

router.put("/", async(req, res) => {
    const { id, title, description } = req.body;
    const file = await updateFileRecord(id, title, description);
    res.json(file);
});

router.put("/version", async(req, res) => {
    let id: string = "";
    let version: string = "";
    
    if(typeof req.query.id === "string"){
        id = req.query.id;
    } else {
        throw new Error("");
    }
    if(typeof req.query.version === "string"){
        version = req.query.version;
    } else {
        throw new Error("");
    }

    const file = await updateCurrentVersion(id, Number(version));
    res.status(200).json(file);
});

router.delete("/", async(req, res) => {
  let id: string = "";
    if(typeof req.query.id === "string"){
        id = req.query.id;
        const fileUrl = await deleteFileRecord(id);
        
        res.status(200).json({status: "OK"})
    } else {
        throw new Error("Expecting a string data type in the query string for file id");
    }
});
export default router;