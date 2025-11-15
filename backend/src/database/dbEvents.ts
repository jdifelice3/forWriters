import { PrismaClient, GroupType } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

export const getEvents = async(groupId: string) => {
  try {
    const events: any = await prisma.groupsEvents.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        signups: true
      },
      orderBy: {
        eventDate: 'asc',
      },
    });

    return events;
  } catch (err) {
      console.error('Error getting events:', err);
      throw err; 
  }
}

export const getEventSignups = async(eventId: string) => {

  try {
    
    const events: any = await prisma.groupsEvents.findMany({
      where: {
        id: eventId
      },
      include: {
        signups: {
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
      const eventItem = await prisma.eventSignups.create({
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