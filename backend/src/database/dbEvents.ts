import { PrismaClient, GroupType } from "@prisma/client";
import { AppFile } from "../types/FileTypes";
import { z } from 'zod';

const prisma = new PrismaClient();

export const getEvents = async(groupId: string) => {
  try {
    const events: any = await prisma.groupsEvents.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        eventDate: 'asc',
      },
      include: {
        eventSubmission: {
          include: {
            users: {
              include: {
                userProfiles: true
              }
            }
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

export const getEventSubmissions = async(eventId: string) => {

  try {
    
    const events: any = await prisma.groupsEvents.findMany({
      where: {
        id: eventId
      },
      include: {
        eventSubmission: {
          include: {
            appFiles: {
              include: {
                users: {
                  include: {
                    userProfiles: true
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

export const createEvent = async(groupId: string, eventDate: Date, submissionDeadline: Date) => {
  try {

    const eventItem = await prisma.groupsEvents.create({
      data: {
        groupId: groupId,
        eventDate: new Date(eventDate),
        submissionDeadline: new Date(submissionDeadline)
      }
    });

    return eventItem;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error; 
  }
} 

export const eventAddUser = async(eventId: string, userId: string, eventType: string) => {
  try {
      const eventItem = await prisma.eventSubmission.create({
      data: {
        eventId: eventId,
        userId: userId
      }
    });

    return eventItem;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error; 
  }
}

export const createEventFeedback = async(eventId: string, userId: string, appFileId: string) => {
  try {
    const result = await prisma.eventFeedback.create({
      data: {
        eventId: eventId,
        userId: userId,
        appFileId: appFileId
      },
    });
    console.log('dbEvents.createEventFeedback', result);
    return result;
  } catch (err) {
    console.error('Error adding a file to an event:', err);
    throw err;
  }
}