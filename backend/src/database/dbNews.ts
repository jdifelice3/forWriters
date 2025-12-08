import { PrismaClient, GroupType } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();


export const getNews = async(groupId: string) => {
  try {
    const news: any = await prisma.groupNews.findMany({
      where: {
        groupId: groupId,
        archived: false
      },
      orderBy: [
        { postedAt: 'desc'}, 
        { title: 'asc' }
      ]
    });

    return news;
  } catch (err) {
      console.error('Error creating group:', err);
      throw err; 
  }
}

export const createNewsItem = async (groupId: string, title: string, content: string) => {
  try {

    const newsItem = await prisma.groupNews.create({
      data: {
        groupId: groupId,
        title: title,
        content: content
      }
    });

    return newsItem;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error; 
  }
};

export const archiveNewsItem = async(newsItemId: string) => {
    console.log('in archiveNewsItem')
    const archivedNewsItem = await prisma.groupNews.update({
        where: {
            id: newsItemId
        },
        data: {
            archived: true
        }
    });
    console.log('archivedNewsItem',archivedNewsItem)
    return archivedNewsItem;
}