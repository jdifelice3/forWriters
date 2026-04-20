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
    console.log("query", query);
    console.log("groupId", groupId);
  if (!query.trim()) {
    return res.json([]);
  }

  // Load current user once so we can exclude them
  const currentUser = await prisma.user.findUnique({
    where: { superTokensId: authId },
    select: { id: true },
  });

  if (!currentUser) {
    return res.status(401).json({ error: "User not found" });
  }

  const users = await prisma.user.findMany({
  where: {
    id: {
      not: currentUser.id,
    },

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

    groupUser: {
      where: {
        groupId,
      },
      select: {
        id: true,
      },
      take: 1,
    },
  },
});

// const usersWithMembership = users.map((user) => ({
//   id: user.id,
//   userProfile: user.userProfile,
//   isMember: user.groupUser.length > 0,
// }));
    
  // Shape the response to match userSearch
  const results = users.map((u) => ({
    userId: u.id,
    fullname: [u.userProfile?.firstName, u.userProfile?.lastName]
      .filter(Boolean)
      .join(" "),
    bio: u.userProfile?.bio ?? null,
    groupStatus: u.groupUser.length > 0 ? "already_member" : "not_in_group"
  }));

  res.json(results);
});

export default router;