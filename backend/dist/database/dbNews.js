"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveNewsItem = exports.createNewsItem = exports.getNews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNews = async (groupId) => {
    try {
        const news = await prisma.groupNews.findMany({
            where: {
                groupId: groupId,
                archived: false
            },
            orderBy: [
                { postedAt: 'desc' },
                { title: 'asc' }
            ]
        });
        return news;
    }
    catch (err) {
        console.error('Error creating group:', err);
        throw err;
    }
};
exports.getNews = getNews;
const createNewsItem = async (groupId, title, content) => {
    try {
        const newsItem = await prisma.groupNews.create({
            data: {
                groupId: groupId,
                title: title,
                content: content
            }
        });
        return newsItem;
    }
    catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
};
exports.createNewsItem = createNewsItem;
const archiveNewsItem = async (newsItemId) => {
    console.log('in archiveNewsItem');
    const archivedNewsItem = await prisma.groupNews.update({
        where: {
            id: newsItemId
        },
        data: {
            archived: true
        }
    });
    console.log('archivedNewsItem', archivedNewsItem);
    return archivedNewsItem;
};
exports.archiveNewsItem = archiveNewsItem;
