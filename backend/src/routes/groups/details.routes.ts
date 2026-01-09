// src/routes/groups/details.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "./group.middleware";
import Session from "supertokens-node/recipe/session";
import { JoinRequestError } from "../../database/types/Error";
import { PrismaClient, Prisma, JoinRequestStatus, GroupType } from "@prisma/client";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

// const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
//     Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", async (req: Request, res: Response) => {
    const group = await prisma.group.findUnique({
        where: { id: req.group.id },
        include: {
            groupAddress: true,
            groupUrl: true,
            groupUser: {
                include: {
                    user: {
                        include: { userProfile: true },
                    },
                },
            },
        },
    });

    res.json(group);
});

router.put("/", async (req: Request, res: Response) => {
  
    const {
        name,
        addressId,
        imageUrl,
        websiteUrl,
        description,
        street,
        city,
        state,
        zip,
    } = req.body;

    const group = await prisma.group.update({
        where: {
            id: req.group.id,
        },
    data: {
        name: name,
        description: description !== undefined ? description : "",
        imageUrl: imageUrl !== undefined ? imageUrl : "",
        websiteUrl: websiteUrl !== undefined ? websiteUrl : "",
        groupAddress: {
            update: {
                where: {
                    id: addressId,
                },
                data: { 
                    street: street,
                    city: city,
                    state: state,
                    zip: zip,
                },
            },
        },
    },
  });
    
    return res.json(group);
});

router.get("/members", async (req: Request, res: Response) => {
  const groupUsers = await prisma.groupUser.findMany({
    where: { groupId: req.group.id },
    include: {
      user: {
        include: { userProfile: true },
        omit: {
          id: true,
          superTokensId: true,
          email: true,
          role: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    omit: {
      id: true,
      userId: true,
      groupId: true,
      invitedBy: true,
      createdAt: true,
    },
  });

  res.json(groupUsers);
});

router.get("/join-requests", async (req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    
    const user: any = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
    }); 

    const requests = await prisma.joinRequest.findMany({
        where: {
            groupId: req.group.id,
            status: JoinRequestStatus.PENDING,
        },
        orderBy: { createdAt: "asc" },
        include: {
            user: true,
            group: true,
        },
    });
    // Shape data for frontend
    if(requests){
        const payload = requests.map((req) => ({
            id: req.id,
            userId: req.userId,
            userName: req.user.username,
            groupId: req.groupId,
            groupName: req.group.name,
            createdAt: req.createdAt,
        }));

    res.json(payload);
    } else {
        return res.json([]);
    }
});

router.get("/news", async (req: Request, res: Response) => {
    const news: any = await prisma.groupNews.findMany({
        where: {
            groupId: req.group.id,
            archived: false
        },
        orderBy: [
            { postedAt: 'desc'}
        ]
    });

    res.json(news);
});

router.post("/news", async (req: Request, res: Response) => {
    const { content } = req.body;
    const newsItem = await prisma.groupNews.create({
        data: {
            groupId: req.group.id,
            content: content
        }
    });
    res.json(newsItem);
});

router.put("/news/:newsId/archive", async (req: Request, res: Response) => {
    const newsItemId = req.params.newsId;
    const archivedNewsItem = await prisma.groupNews.update({
        where: {
            id: newsItemId,
            groupId: req.group.id
        },
        data: {
            archived: true
        }
    });

    res.json(archivedNewsItem);
});

export default router;
