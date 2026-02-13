import { Router, Request, Response, NextFunction } from "express";
import prisma from "../database/prisma";
import Session from "supertokens-node/recipe/session";
import { JoinRequestError } from "../database/types/Error";
import { JoinRequestStatus, GroupRole } from "@prisma/client";

const router = Router();

router.get("/", async (req, res) => {
  const session = await Session.getSession(req, res);
  const authId = session.getUserId();

  const query = (req.query.query as string) || "";
  const groupId = req.query.groupId as string | undefined;

  if (!query.trim()) {
    return res.json([]);
  }

  // Load current user once so we can exclude them
//   const currentUser = await prisma.user.findUnique({
//     where: { superTokensId: authId },
//     select: { id: true },
//   });

//   if (!currentUser) {
//     return res.status(401).json({ error: "User not found" });
//   }

  const users = await prisma.user.findMany({
    where: {
    //   id: {
    //     not: currentUser.id,
    //   },

      // Optional group filter
      ...(groupId && {
        groupUser: {
          some: {
            groupId,
          },
        },
      }),

      // Name search
      userProfile: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    },

    take: 10,

    orderBy: [
      { userProfile: { lastName: "asc" } },
      { userProfile: { firstName: "asc" } },
    ],

    select: {
      id: true,
      userProfile: {
        select: {
          firstName: true,
          lastName: true,
          bio: true,
        },
      },
    },
  });

  // Shape the response to match userSearch
  const results = users.map((u) => ({
    userId: u.id,
    fullName: [u.userProfile?.firstName, u.userProfile?.lastName]
      .filter(Boolean)
      .join(" "),
    bio: u.userProfile?.bio ?? null,
  }));

  res.json(results);
});

export default router;