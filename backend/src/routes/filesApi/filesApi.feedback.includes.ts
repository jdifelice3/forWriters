import { Prisma } from "@prisma/client";

export const fullFeedbackInclude = {
  reviewerUser: {
    select: {
        id: true,
        username: true,
    },
  },
  appFile: {
    select: {
      id: true,
      version: true,
      filename: true,
      documentType: true,
      wordCount: true,
      pageCount: true,
    },
  },
  fileFeedbackComment: {
    orderBy: {
      createdAt: "asc",
    },
    include: {
      reviewerUser: {
        select: {
            id: true,
            username: true,
        },
      },
      targets: {
        orderBy: [
          { paragraphId: "asc" },
          { from: "asc" },
        ],
      },
    },
  },
} satisfies Prisma.FileFeedbackInclude;
