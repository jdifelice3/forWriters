"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReading = exports.deleteReadingAuthor = exports.addFileToReading = exports.createReadingFeedback = exports.createReadingAuthor = exports.createReading = exports.getReadingAuthors = exports.getReading = exports.getReadingsByUserId = exports.getReadings = void 0;
const client_1 = require("@prisma/client");
const Error_1 = require("../types/Error");
const Enum_1 = require("../util/Enum");
const prisma = new client_1.PrismaClient();
//#region GET
const getReadings = async (groupId) => {
    try {
        const events = await prisma.reading.findMany({
            where: {
                groupId: groupId,
            },
            orderBy: {
                readingDate: 'desc',
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
    }
    catch (err) {
        console.error('Error getting events:', err);
        throw err;
    }
};
exports.getReadings = getReadings;
const getReadingsByUserId = async (authId) => {
    try {
        const user = await prisma.user.findUnique({
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
        const readingAuthors = await prisma.readingAuthor.findMany({
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
                            omit: {
                                description: true,
                                documentType: true,
                                filename: true,
                                genre: true,
                                manuscriptIsVisible: true,
                                //mimetype:  true, 
                                pageCount: true,
                                //title:  true, 
                                uploadedAt: true,
                                url: true,
                                wordCount: true,
                                workType: true,
                            },
                            include: {
                                user: {
                                    omit: {
                                        createdAt: true,
                                        email: true,
                                        role: true,
                                        superTokensId: true,
                                        updatedAt: true,
                                    },
                                    include: {
                                        userProfile: {
                                            select: {
                                                id: true,
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            }
        });
        return readingAuthors;
    }
    catch (err) {
        console.error('Error in getReadingsByUserId');
        throw err;
    }
};
exports.getReadingsByUserId = getReadingsByUserId;
const getReading = async (readingId) => {
    try {
        const reading = await prisma.reading.findUnique({
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
        return reading;
    }
    catch (err) {
        console.error('Error getting reading:', err);
        throw err;
    }
};
exports.getReading = getReading;
const getReadingAuthors = async (readingId) => {
    try {
        const readings = await prisma.readingAuthor.findMany({
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
    }
    catch (err) {
        console.error('Error getting events:', err);
        throw err;
    }
};
exports.getReadingAuthors = getReadingAuthors;
//#endregion
//#region CREATE
const createReading = async (groupId, name, createdUserId, readingDate, readingStartTime, readingEndTime, submissionDeadline, description, schedule) => {
    try {
        const scheduledType = (0, Enum_1.getReadingScheduleTypeFromString)(schedule);
        const reading = await prisma.reading.create({
            data: {
                groupId: groupId,
                readingDate: scheduledType === client_1.ReadingScheduleType.SCHEDULED ? new Date(readingDate) : null,
                submissionDeadline: scheduledType === client_1.ReadingScheduleType.SCHEDULED ? new Date(submissionDeadline) : null,
                name: name,
                createdUserId: createdUserId,
                readingStartTime: scheduledType === client_1.ReadingScheduleType.SCHEDULED ? readingStartTime : null,
                readingEndTime: scheduledType === client_1.ReadingScheduleType.SCHEDULED ? readingEndTime : null,
                description: description,
                scheduledType: scheduledType
            }
        });
        return reading;
    }
    catch (error) {
        console.error('Error creating reading:', error);
        throw error;
    }
};
exports.createReading = createReading;
const createReadingAuthor = async (readingId, userId) => {
    try {
        const readingAuthor = await prisma.readingAuthor.create({
            data: {
                readingId: readingId,
                authorId: userId,
            }
        });
        return readingAuthor;
    }
    catch (error) {
        console.error('Error adding a user to a Reading:', error);
        throw error;
    }
};
exports.createReadingAuthor = createReadingAuthor;
const createReadingFeedback = async (readingAuthorId, feedbackFileId) => {
    try {
        return null;
    }
    catch (err) {
        console.error('Error adding a feedback file to readingFeedback:', err);
        throw err;
    }
};
exports.createReadingFeedback = createReadingFeedback;
const addFileToReading = async (readingAuthorId, appFileId) => {
    //delete all associated AuthorAppFiles
    try {
        const deleteReadingAuthor = await prisma.authorAppFile.delete({
            where: {
                readingAuthorId: readingAuthorId
            }
        });
    }
    catch (err) {
        //will throw an error if there are no records to delete
    }
    const result = await prisma.authorAppFile.create({
        data: {
            readingAuthorId: readingAuthorId,
            appFileId: appFileId
        }
    });
    return result;
};
exports.addFileToReading = addFileToReading;
//#endregion
//#region DELETE
const deleteReadingAuthor = async (readingId, authorId) => {
    const deleteAuthorFromReading = await prisma.readingAuthor.delete({
        where: {
            readingId_authorId: {
                readingId: readingId,
                authorId: authorId
            }
        }
    });
    return true;
};
exports.deleteReadingAuthor = deleteReadingAuthor;
const deleteReading = async (readingId, groupId) => {
    //make sure the reading belongs to the group
    const readingInGroup = await prisma.reading.findUnique({
        where: {
            id: readingId,
            groupId: groupId
        }
    });
    if (!readingInGroup) {
        throw new Error_1.ReadingDeleteInvalidGroupIdError("You are trying to delete a reading that does not belong to your group.", 403);
    }
    //make sure there are no authors associated with the reading
    const authors = await prisma.readingAuthor.findMany({
        where: {
            readingId: readingId
        }
    });
    if (authors.length > 0) {
        throw new Error_1.ReadingDeleteError("You cannot delete a reading that has authors associated with it.", 403);
    }
    const deletedReading = await prisma.reading.delete({
        where: {
            id: readingId
        }
    });
    return deletedReading;
};
exports.deleteReading = deleteReading;
//#endregion
//#region VERBOSE CODE
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
//#endregion
