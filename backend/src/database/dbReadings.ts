import { PrismaClient, ReadingFeedback } from "@prisma/client";
import { Reading, ReadingAuthor } from "../domain-types";

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
            userProfile: true,
            readingFeedback: true
          },
        },
      },
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
    where: 
        {
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
      authorAppFile: {
        where: {
          appFileId: {
            in: appFiles.map(file => file.id), // Map the fetched appFile IDs
          },
        },
        include: {
          appFile: true, // Include the actual appFile details if needed
        },
      },
      reading: {
        include: {
          group: true,
        },
      },
    },
});

    return readingAuthors;
  } catch (err) {
    console.log('Error in getReadingsByUserId');
    throw err;
  }

}

export const getReading = async(readingId: string): Promise<Reading> => {
  try {
      const reading: any = await prisma.reading.findUnique({
      where: {
        id: readingId,
      },
      include: {
        readingAuthor: {
          include: {
            userProfile: true,
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
                }
              }
            }
          },
        },
      },
    });

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
  console.log('readingId', readingId, 'userId', userId);
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
    console.log('deleteReadingAuthor', deleteReadingAuthor);
  } catch (err) {
    //will throw an error if there are no records to delete
  }

  const result = await prisma.authorAppFile.create({
    data: {
      readingAuthorId: readingAuthorId,
      appFileId: appFileId
    }
  });
  console.log('dbReadings.addFileToReading:', result);

  return result;
} 