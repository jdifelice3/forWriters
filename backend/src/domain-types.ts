import type { Prisma } from "@prisma/client";

export {
  DocumentType,
  ParticipantType,
  EventType,
  Genre,
  GroupType,
  FileType,
  Role,
  UrlOwnerType,
  UrlType,
  WorkType,
} from "@prisma/client";

/**
 * USER
 */

/**
 * USER PROFILE
 */
export type UserProfile = Prisma.UserProfileGetPayload<{
  include: {
    user: true;
  };
}>;

/**
 * USER URL
 */
export type UserUrl = Prisma.UserUrlGetPayload<{
  include: {
    user: true;
  };
}>;

/**
 * GROUP
 */
export type Group = Prisma.GroupGetPayload<{
  include: {
    groupAddress: true;
    groupUser: {
      include: {
        user: true;
      };
    };
    groupNews: true;
    reading: {
      include: {
        readingAuthor: true;
      };
    };
    groupUrl: true;
    user: true; // creator
  };
}>;

export type GroupGetBasic = Prisma.GroupGetPayload<{
  include: {
    groupAddress: true;
    groupUrl: true;
  };
}>;

export type GroupCreate = Prisma.GroupGetPayload<{
  include: {
    groupAddress: true;
    groupUser: true;
  };
}>;

/**
 * GROUP ADDRESS
 */
export type GroupAddress = Prisma.GroupAddressGetPayload<{
  include: {
    group: true;
    reading: true;
  };
}>;

/**
 * GROUP NEWS
 */
export type GroupNews = Prisma.GroupNewsGetPayload<{
  include: {
    group: true;
  };
}>;

/**
 * GROUP USER
 */
export type GroupUser = Prisma.GroupUserGetPayload<{
  include: {
    user: true;
    group: true;
  };
}>;

/**
 * GROUP URL
 */
export type GroupUrl = Prisma.GroupUrlGetPayload<{
  include: {
    group: true;
  };
}>;

/**
 * APP FILE
 */
export type AppFile = Prisma.AppFileGetPayload<{
  include: {
    user: true;
  };
}>;

/**
 * READING
 */
export type Reading = Prisma.ReadingGetPayload<{
  include: {
    readingAuthor: {
      include: {
        userProfile: true,
        authorAppFile: {
          include: {
            appFile: {
              include: {
                user: {
                  include: {
                    userProfile: true;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
}>;

export type ReadingAuthor = Prisma.ReadingAuthorGetPayload<{
      include: {
        userProfile: true,
        authorAppFile: {
          include: {
            appFile: {
              include: {
                user: {
                  include: {
                    userProfile: true
                  }
                }
              },
            },
          },
        }
      }
}>;

export type AuthorAppFile = Prisma.AuthorAppFileGetPayload<{
  include: {
    appFile: {
      include: {
        user: {
          include: {
            userProfile: true
          }
        }
      },
    },
  },
}>;
/**
 * READING FEEDBACK
 */
export type ReadingFeedback = Prisma.ReadingFeedbackGetPayload<{
  include: {
    appFile: true;
    user: true;
  };
}>;

