import express from "express";
import Session from "supertokens-node/recipe/session";
import prisma from "../database/prisma";
import { getUser } from "../database/util/user";

const router = express.Router();

router.get("/", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await getUser(authId);

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
    const appFileId = req.params.id;

    const appFile = await prisma.appFile.findUnique({
      where: {
        id: appFileId,
      },
    });

    const appFileMeta = await prisma.appFileMeta.findUnique({
        where: {
            id: appFile?.appFileMetaId
        }
    });

    res.json(appFileMeta);
});

router.get("/search", async (req, res) => {
    const query:string = (req.query.query as string) || "";
    if (!query.trim()) {
      return res.json([]);
    }
    const files = await prisma.appFile.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        appFileMetaId: true
        // add any other fields you want to show
      },
   });
    
    res.json(files);
}); 

router.put("/", async(req, res) => {
   
    const { fileMetaId, title, description } = req.body;
    const file = await prisma.appFileMeta.update({
        where: {
            id: fileMetaId, 
        },
        data: {
            title: title,
            description: description
        },
    });
    
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

    const file = await prisma.appFileMeta.update({
        where: {
            id: id
        },
        data: {
            currentVersionId: Number(version)
        }
    })
    res.status(200).json(file);
});

router.delete("/", async(req, res) => {
    let id: string = "";
    if(typeof req.query.id === "string"){
        id = req.query.id;
        const file = await prisma.appFile.deleteMany({
            where: {
                appFileMetaId: id
            }
        });

        const fileMeta = await prisma.appFileMeta.delete({
            where: {
                id: id
            }
        });
        
        res.status(200).json({status: "OK"})
    } else {
        res.status(500).json({error: "Expecting a string data type in the query string for file id"});
    }
});
export default router;