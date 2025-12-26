import { 
    PrismaClient, ReadingScheduleType
} from "@prisma/client";
import { 
    ReadingDeleteError,
    ReadingDeleteInvalidGroupIdError
} from "../types/Error";
import { 
    getReadingScheduleTypeFromString,
    getReadingScheduleTypeString
} from "../util/Enum";

const prisma = new PrismaClient();

//#region GET
export const getReadings = async(groupId: string) => {
  try {
    const events: any = await prisma.reading.findMany({
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
                    authorAppFileMeta: {
                        include: {
                            appFileMeta: {
                                include: {
                                    user: {
                                        include: {
                                            userProfile: true
                                        },
                                    },
                                    appFile: true
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

    const appFileMetas = await prisma.appFileMeta.findMany({
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
            authorAppFileMeta: {
                where: {
                    appFileMetaId: {
                        in: appFileMetas.map(file => file.id), // Map the fetched appFile IDs
                    },
                },
                include: {
                    appFileMeta: { 
                        // omit: {
                        //     description:  true, 
                        //     documentType:  true, 
                        //     filename:  true, 
                        //     genre:  true, 
                        //     manuscriptIsVisible:  true, 
                        //     //mimetype:  true, 
                        //     pageCount:  true, 
                        //     //title:  true, 
                        //     uploadedAt:  true, 
                        //     url:  true, 
                        //     wordCount: true,
                        //     workType: true,
                        // },
                        include: {
                            user: {
                                omit: {
                                    createdAt: true, 
                                    email: true, 
                                    role:  true,
                                    superTokensId:  true,
                                    updatedAt:  true,
                              },
                                include : {
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
  } catch (err) {
    console.error('Error in getReadingsByUserId');
    throw err;
  }

}

export const getReading = async(readingId: string) => {
  try {
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
            authorAppFileMeta: {
                  include: {
                    appFileMeta: {
                        include: {
                            user: {
                                include: {
                                    userProfile: true
                                },
                            },
                            appFile: true
                      },
                    },
                },
            },
          },
        }
      }
    });
    
    return reading;
  } catch (err) {
    console.error('Error getting reading:', err);
    throw err;
  }
}

export const getReadingAuthors = async(readingId: string) => {
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
        authorAppFileMeta: {
          include: {
            appFileMeta: {
              include: {
                user: {
                  include: {
                    userProfile: true
                  }
                },
                appFile: true
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

//#region CREATE
export const createReading = async(
    groupId: string, 
    name: string, 
    createdUserId: string,
    readingDate: string,
    readingStartTime: string,
    readingEndTime: string,
    submissionDeadline: string,
    description: string,
    schedule: string
  ) => {
  try {
    const scheduledType: ReadingScheduleType = getReadingScheduleTypeFromString(schedule);
   
    const reading = await prisma.reading.create({
      data: {
        groupId: groupId,
        readingDate: scheduledType  === ReadingScheduleType.SCHEDULED ? new Date(readingDate) : null,
        submissionDeadline: scheduledType  === ReadingScheduleType.SCHEDULED ? new Date(submissionDeadline) : null,
        name: name,
        createdUserId: createdUserId,
        readingStartTime: scheduledType  === ReadingScheduleType.SCHEDULED ? readingStartTime : null, 
        readingEndTime: scheduledType  === ReadingScheduleType.SCHEDULED ? readingEndTime : null, 
        description: description,
        scheduledType: scheduledType
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

export const createReadingFeedback = async(readingAuthorId: string, feedbackFileId: string) => {
  try {
    return null;
  } catch (err) {
    console.error('Error adding a feedback file to readingFeedback:', err);
    throw err;
  }
}

export const addFileToReading = async(readingAuthorId: string, appFileId: string, appFileMetaId: string) => {
  //delete all associated AuthorAppFiles
  try {
    
    const deleteReadingAuthor = await prisma.authorAppFileMeta.delete({
      where: {
        readingAuthorId: readingAuthorId
      }
    });
  } catch (err) {
    //will throw an error if there are no records to delete
  }

  const result = await prisma.authorAppFileMeta.create({
    data: {
      readingAuthorId: readingAuthorId,
      appFileMetaId: appFileMetaId
    }
  });

  return result;
} 
//#endregion

//#region UPDATE
export const updateReadingFileVersion = (authorAppFileMetaId: string, version: number) => {
    const authorAppFileMeta = prisma.authorAppFileMeta.update({
        where: {
            id: authorAppFileMetaId
        },
        data: {
            appFileVersion: version
        }
    });
}
//#endregion

//#region DELETE
export const deleteReadingAuthor = async(readingId: string, authorId: string) => {
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

export const deleteReading = async(readingId: string, groupId: string) => {
    
    //make sure the reading belongs to the group
    const readingInGroup = await prisma.reading.findUnique({
        where: {
            id: readingId,
            groupId: groupId
        }
    });

    if (!readingInGroup) {
        throw new ReadingDeleteInvalidGroupIdError("You are trying to delete a reading that does not belong to your group.", 403);
    } 

    //make sure there are no authors associated with the reading
    const authors = await prisma.readingAuthor.findMany({
        where: {
            readingId: readingId
        }
    });

    if(authors.length > 0){
        throw new ReadingDeleteError("You cannot delete a reading that has authors associated with it.", 403);
    }

    const deletedReading = await prisma.reading.delete({
        where: {
            id: readingId
        }
    });
    
    return deletedReading;
}
//#endregion