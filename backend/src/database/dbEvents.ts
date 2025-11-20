import { PrismaClient } from "@prisma/client";
import { Reading } from "../domain-types";

const prisma = new PrismaClient();

export const getReadings = async(groupId: string) => {
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
            user: {
              include: {
                userProfile: true
              },
            },
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

export const getReading = async(readingId: string) => {
  try {
      const reading: any = await prisma.reading.findUnique({
      where: {
        id: readingId,
      },
      include: {
        readingAuthor: {
          include: {
            readingManuscript: {
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

export const getReadingAuthors = async(readingId: string) => {

  try {
    
    const events: any = await prisma.readingAuthor.findMany({
      where: {
        id: readingId
      },
      include: {
        readingManuscript: {
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
      return events[0];
    } catch (err) {
        console.error('Error getting events:', err);
        throw err; 
    }
}

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

export const createReadingFeedback = async(readingManuscriptId: string, feedbackFileId: string, userId: string) => {
  try {
    const result = await prisma.readingFeedback.create({
      data: {
        readingManuscriptId: readingManuscriptId,
        feedbackFileId: feedbackFileId,
        userId: userId
      },
    });
    console.log('dbEvents.createReadingFeedback', result);
    return result;
  } catch (err) {
    console.error('Error adding a feedback file to readingFeedback:', err);
    throw err;
  }
}