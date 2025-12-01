import { PrismaClient, ReadingFeedback } from "@prisma/client";
import { Reading, ReadingAuthor, ReadingAuthorByUser } from "../domain-types";

const prisma = new PrismaClient();

//#region GET
export const getReadings = async(groupId: string): Promise<Reading[]> => {
  try {
    const events: any = await prisma.reading.findMany({
        where: {
            groupId: groupId,
        },
        orderBy: {
            readingDate: 'asc',
        },
        include: {
            readingAuthor: {
                include: {
                    readingFeedback: true,              
                    authorAppFile: {
                        include: {
                            appFile: {
                                include: {
                                    user: {
                                        include: {
                                            userProfile: true
                                        },
                                    },
                                },
                            },
                        },
                    }  
                },
            }
        }
    });

    return events;
  } catch (err) {
      console.error('Error getting events:', err);
      throw err; 
  }
}

export const getReadingsByUserId = async(authId: string) => {
  try {
    const user: any = await prisma.user.findUnique({
        where: {
            superTokensId: authId,
        },
        include: {
            userProfile: true,
        }
    });

    const appFiles = await prisma.appFile.findMany({
      where: {
        userId: user.id, // Fetch files for the specific user
      },
    });

    const readingAuthors: ReadingAuthorByUser[] = await prisma.readingAuthor.findMany({
        where: {
            authorId: user.id,
        },
        include: {
            reading: true,
            readingFeedback: {
                include: {
                    user: {
                        include: {
                            userProfile: true
                        }
                    },
                    readingFeedbackComment: {
                        orderBy: {
                            source: "asc"
                        }
                    }            
                }
            },
            authorAppFile: {
                where: {
                    appFileId: {
                        in: appFiles.map(file => file.id), // Map the fetched appFile IDs
                    },
                },
                include: {
                    appFile: { 
                        include: {
                            user: {
                                include : {
                                    userProfile: true
                                }
                            }
                        }
                },
            },
            
        },
        }
    });

    return readingAuthors;
  } catch (err) {
    console.log('Error in getReadingsByUserId');
    throw err;
  }

}

// export const getReading = async (readingId: string): Promise<Reading> => {
//   console.log("=== getReading DEBUG for readingId:", readingId, "===\n");

//   // 1) Direct DB check for all ReadingFeedback rows for this reading
//   const rawFeedbackRows = await prisma.$queryRaw<
//     { id: string; readingAuthorId: string; feedbackUserId: string }[]
//   >`
//     SELECT rf.id, rf."readingAuthorId", rf."feedbackUserId"
//     FROM "ReadingFeedback" rf
//     WHERE rf."readingAuthorId" IN (
//       SELECT ra.id FROM "ReadingAuthor" ra WHERE ra."readingId" = ${readingId}
//     )
//   `;
//   console.log("RAW DB ReadingFeedback rows:");
//   console.dir(rawFeedbackRows, { depth: null });
//   console.log("\n");

//   // 2) Big nested include query (what you had originally)
//   const reading = await prisma.reading.findUnique({
//     where: { id: readingId },
//     include: {
//       readingAuthor: {
//         include: {
//           // if this no longer matches your schema, tweak, but KEEP readingFeedback include
//           readingFeedback: {
//             include: {
//               readingFeedbackComment: {
//                 orderBy: { source: "asc" },
//               },
//             },
//           },
//           authorAppFile: {
//             include: {
//               appFile: {
//                 include: {
//                   user: {
//                     include: {
//                       userProfile: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           // if you now have `user` on ReadingAuthor, you can include it too
//           // user: true,
//         },
//       },
//     },
//   });

//   console.log("NESTED PRISMA reading.readingAuthor[*].readingFeedback[*]:");
//   if (reading?.readingAuthor) {
//     for (const ra of reading.readingAuthor) {
//       for (const rf of ra.readingFeedback) {
//         console.log("  RF from nested query:", {
//           id: rf.id,
//           readingAuthorId: rf.readingAuthorId,
//           feedbackUserId: rf.feedbackUserId,
//         });
//       }
//     }
//   } else {
//     console.log("  No readingAuthor rows found in nested query.");
//   }
//   console.log("\n");

//   // 3) Cross-check each nested ReadingFeedback row against a fresh findUnique()
//   if (reading?.readingAuthor) {
//     for (const ra of reading.readingAuthor) {
//       for (const rf of ra.readingFeedback) {
//         const fresh = await prisma.readingFeedback.findUnique({
//           where: { id: rf.id },
//         });

//         console.log("CROSS-CHECK for ReadingFeedback id:", rf.id);
//         console.log("  From nested query   feedbackUserId:", rf.feedbackUserId);
//         console.log(
//           "  From findUnique()    feedbackUserId:",
//           fresh?.feedbackUserId,
//         );
//         console.log(
//           "  From raw SQL rows    feedbackUserId:",
//           rawFeedbackRows.find((row) => row.id === rf.id)?.feedbackUserId,
//         );
//       }
//     }
//   }

//   console.log("\n=== END getReading DEBUG ===\n");

//   // Return the same data shape your route expects
//   return reading;
// };

export const getReading = async(readingId: string) => {//: Promise<Reading> => {
  try {
//     const raw = await prisma.$queryRaw`
//   SELECT * FROM "ReadingFeedback"
//   WHERE id = 'cmijw1g5h000ea8q8hwwupvsd'
// `;

// console.log("RAW TABLE ROW:", raw);


// const api = await prisma.readingFeedback.findUnique({
//   where: { id: "cmijw1g5h000ea8q8hwwupvsd" },
//   include: {
//     userProfile: true
//   }
// });

// console.log("PRISMA RESULT:", api);
// const dbInfo = await prisma.$queryRaw`SELECT current_database(), inet_server_addr(), inet_server_port()`;
// console.log("DB:", dbInfo);

    const reading: any = await prisma.reading.findUnique({
      where: {
        id: readingId,
      },
      include: {
        readingAuthor: {
          include: {
            readingFeedback: {
                include: {
                    readingFeedbackComment: {
                        orderBy: {
                            source: "asc"
                        }
                    }
                }
            },
            authorAppFile: {
              include: {
                appFile: {
                  include: {
                    user: {
                      include: {
                        userProfile: true
                      },
                    },
                  },
                }
              }
            }
          },
        },
      },
    });
    console.log('reading', reading);
    return reading;
  } catch (err) {
    console.error('Error getting reading:', err);
    throw err;
  }
}

export const getReadingAuthors = async(readingId: string): Promise<ReadingAuthor> => {
  try {
    const readings: any = await prisma.readingAuthor.findMany({
      where: {
        id: readingId
      },
      include: {
        readingFeedback: {
            include: {
                readingFeedbackComment: true
            }
        },
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
    });
      return readings[0];
    } catch (err) {
        console.error('Error getting events:', err);
        throw err; 
    }
}
//#endregion

export const createReading = async(
    groupId: string, 
    name: string, 
    createdUserId: string,
    readingDate: string,
    readingStartTime: string,
    readingEndTime: string,
    submissionDeadline: string,
    description: string    
  ) => {
  try {
  console.log('in create reading');

    const reading = await prisma.reading.create({
      data: {
        groupId: groupId,
        readingDate: new Date(readingDate),
        submissionDeadline: new Date(submissionDeadline),
        name: name,
        createdUserId: createdUserId,
        readingStartTime: readingStartTime, 
        readingEndTime: readingEndTime, 
        description: description,
      }
    });

    return reading;
  } catch (error) {
    console.error('Error creating reading:', error);
    throw error; 
  }
} 

export const createReadingAuthor = async(readingId: string, userId: string) => {

    try {
      const readingAuthor = await prisma.readingAuthor.create({
        data: {
          readingId: readingId,
          authorId: userId,
        }
      });

    return readingAuthor;

  } catch (error) {
    console.error('Error adding a user to a Reading:', error);
    throw error; 
  }
}

export const createReadingFeedback = async(readingAuthorId: string, feedbackFileId: string) => {//}: Promise<ReadingFeedback> => {
  try {
    // const result = await prisma.readingFeedback.create({
    //   data: {
    //     readingAuthorId: readingAuthorId,
    //     feedbackFileId: feedbackFileId
    //   },
    // });
    // console.log('dbEvents.createReadingFeedback', result);

    return null;//result;
  } catch (err) {
    console.error('Error adding a feedback file to readingFeedback:', err);
    throw err;
  }
}

export const addFileToReading = async(readingAuthorId: string, appFileId: string) => {
  //delete all associated AuthorAppFiles
  try {
    const deleteReadingAuthor = await prisma.authorAppFile.delete({
      where: {
        readingAuthorId: readingAuthorId
      }
    });
  } catch (err) {
    //will throw an error if there are no records to delete
  }

  const result = await prisma.authorAppFile.create({
    data: {
      readingAuthorId: readingAuthorId,
      appFileId: appFileId
    }
  });

  return result;
} 