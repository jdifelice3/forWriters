import express from "express";
import Session from "supertokens-node/recipe/session";
import { 
    getFileRecords, 
    updateFileRecord, 
    deleteFileRecord, 
    updateCurrentVersion,
    getFileSearch,
    getFileDescription
} from "../database/dbFiles";

const router = express.Router();

//#region GET
router.get("/", async (_req, res) => {
  try{
    const session = await Session.getSession(_req, res);
    const authId = session.getUserId(true);
    const files = await getFileRecords(authId);

    res.json(files);
  } catch (err) {
      console.error('Error retrieving file records:', err);
      res.status(500).json({ err: 'Error retrieving file records' });
  }
});

router.get("/:id/description", async(_req, res) => {
    try {
      const file = await getFileDescription(_req.params.id);
      res.json(file);
    } catch (err) {
      console.error('Error retrieving file description:', err);
      res.status(500).json({ err: 'Error retrieving file description' });
    }
});

router.get("/search", async (_req, res) => {
  const query:string = (_req.query.query as string) || "";
  
  try {
    if (!query.trim()) {
      return res.json([]);
    }
    const files = await getFileSearch(query);
    
    res.json(files);
  } catch (err) {
    console.error("Error searching groups:", err);
    res.status(500).json({ error: "Failed to search groups." });
  }
});

// router.get("/type/:documentType", async(_req, res) => {
//   try{
    
//     const documentType = _req.params.documentType;

//     if(!documentType){
//         res.status(404).json({error: "Document Type not found"});
//     }
    
//     const session = await Session.getSession(_req, res);
//     const authId = session.getUserId(true);
//     const files = await getFileRecords(authId, documentType);

//     res.json(files);
//   } catch (err) {
//       console.error('Error retrieving file records:', err);
//       res.status(500).json({ err: 'Error retrieving file records' });
//   }
//});
//#endregion

//#region POST
//#endregion

//#region PUT
router.put("/", async(_req, res) => {
  try{
    const { id, title, description } = _req.body;
    const file = await updateFileRecord(id, title, description);
    res.json(file);
  } catch (err) {
    console.error('Error updating file record', err);
    res.status(500).json({ err: 'Error updating file record' });
  }
});

router.put("/version", async(_req, res) => {
    let id: string = "";
    let version: string = "";
    
    if(typeof _req.query.id === "string"){
        id = _req.query.id;
    } else {
        throw new Error("");
    }
    if(typeof _req.query.version === "string"){
        version = _req.query.version;
    } else {
        throw new Error("");
    }


  try{
    const file = await updateCurrentVersion(id, Number(version));
    res.status(200).json(file);

  } catch (err) {
    console.error(`Error updating current version for file ${id}`, err);
    res.status(500).json({ err: `Error updating current version for file ${id}` });
  }
})
//#endregion

//#region DELETE
router.delete("/", async(_req, res) => {
  let id: string = "";
  try {
    if(typeof _req.query.id === "string"){
      id = _req.query.id;
      
      const fileUrl = await deleteFileRecord(id);
      
      res.status(200).json({status: "OK"})
      
    } else {
      throw new Error("Expecting a string data type in the query string for file id");
    }
  } catch (err) { 
      console.error('Error deleting file:', err);
      res.status(500).json({ err: 'Error deleting file' });
  }
});
//#endregion
export default router;