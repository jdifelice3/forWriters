import { Router } from "express";
import prisma from "../../database/prisma";

const router = Router();

router.get("/", async (req, res) => {
    const query:string = (req.query.query as string) || "";
    
    if (!query.trim()) {
            return res.json([]);
        }

        const groups = await prisma.group.findMany({
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
            },
        }); 
      
      res.json(groups);
});
export default router;