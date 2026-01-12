import { PrismaClient, CommentSource, DocumentType, FileType } from "@prisma/client";
import { getDocumentTypeFromString } from "../util/Enum";
import { extractCommentsWithTargets } from "../services/docxExtractor";
import path from 'path';
import { mapMimeToEnum } from "../util/Enum";


const prisma = new PrismaClient({
    log: [
    { level: "query", emit: "event" },
  ],
});

//#region GET
export const getFileRecords = async(authId: string) => {
    const user: any = await prisma.user.findUnique({
        where: 
            {
                superTokensId: authId,
            },
            include: {
                userProfile: true,
            }
    });

    const files = await prisma.appFileMeta.findMany({
        include: {
            appFile: true
        },
        where: {
            userId: user?.id
        },
     
        orderBy: { title: "asc" }
    });
    return files;
}

export const getFileDescription = async(appFileId: string) => {
  const currentDate = new Date();
  try {
    const appFile = await prisma.appFile.findUnique({
      where: {
        id: appFileId,
      },
    });

    if(appFile){
        const appFileMeta = await prisma.appFileMeta.findUnique({
            where: {
                id: appFile.appFileMetaId
            }
        });
        return appFileMeta;
    } else {
        throw new Error("File version not found");
    }
  } catch (err) {
      console.error('Error getting file description:', err);
      throw err; 
  }
}

export const getFileSearch = async(query: string) => {
  const groups = await prisma.appFile.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: 10,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        appFileMetaId: true
        // add any other fields you want to show
      },
   }); 

   return groups;
}
//#endregion

//#region CREATE
export const createFileRecordBasic = async(
    authId: string, 
    mimeType: string, 
    filename: string,
    title: string, 
    description: string,
    url: string
 ) => {
  const currentDate = new Date();

  const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

  const file = await prisma.appFileMeta.create({
    data: {
      title: title,
      description: description,
      userId: user ? user.id : '',
      currentVersionId: 1,
    },
  });

    const version = await prisma.appFile.create({
    data: {
      appFileMetaId: file.id,
      version: 1,
      name: `1-${title}-${currentDate.toLocaleDateString()}`,
      filename: filename,
      mimetype: mapMimeToEnum(mimeType),
      url: url,
      userId: user ? user.id : '',
    },
  });

  return {file, version};
}

export const createFileVersionRecord = async(
    authId: string, 
    appFileMetaId: string,
    mimeType: string, 
    filename: string,
    url: string
 ) => {
  
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

    const appFile = await prisma.appFile.aggregate({
        _max: {
            version: true
        },
        where: {
            appFileMetaId: appFileMetaId
        },
    });

    const newVersion = appFile._max.version !== null ? appFile._max.version + 1 : 0;

    const version = await prisma.appFile.create({
        data: {
            appFileMetaId: appFileMetaId,
            version: newVersion,
            filename: filename,
            mimetype: mapMimeToEnum(mimeType),
            url: url,
            userId: user ? user.id : '',
        },
    });

    const file = await prisma.appFileMeta.update({
        where: {
            id: appFileMetaId, 
        },
        data: {
            currentVersionId: newVersion
        },    
    });

    return { version };
}

export const createFileRecordReadingFeedback = async(
    authId: string, 
    mimeType: string, 
    filename: string,
    title: string, 
    description: string,
    readingAuthorId: string,
    s3Url: string,
    additionalFeedback?: string,
 ) => {
  
  try {
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });
    if(!user){
        throw new Error("user not found");
    }
    const fileMeta = await prisma.appFileMeta.create({
      data: {
        title: title,
        description: description,
        userId: user ? user.id : '',
        currentVersionId: 1,
      },
    });

    const version = await prisma.appFile.create({
      data: {
        appFileMetaId: fileMeta.id,
        version: 1,
        filename: filename,
        mimetype: mapMimeToEnum(mimeType),
        url: s3Url,
        userId: user ? user.id : '',
        documentType: getDocumentTypeFromString(DocumentType.FEEDBACK)
      },
    });

    return {fileMeta, version};
  } catch (err) {
    console.error('err', err);
    throw err;
  }
  
}
//#endregion