import { PrismaClient } from "@prisma/client";
import { FileType, AppFile, DocumentType } from "../domain-types";
import { getFileTypeFromString, getDocumentTypeFromString } from "../util/Enum";

const prisma = new PrismaClient();

export const getFileRecords = async(authId: string, fileType?: string) => {
  let user: any = null;

  if(fileType){
    user = await prisma.user.findUnique({
      where: 
        {
          superTokensId: authId,
        },
        include: {
          appFiles: {
            where: {
              mimetype: getFileTypeFromString(fileType)
            },
            orderBy: {
              title: 'asc', // Adjust this to the appropriate field for ordering
            },
          },
        },
    });
  } else {
    user = await prisma.user.findUnique({
      where: 
        {
            superTokensId: authId,
        },
        include: {
          appFiles: {
            orderBy: {
              title: 'asc', // Adjust this to the appropriate field for ordering
            },
          },
        },
    });
  }

  const files: AppFile[] = user.appFiles;
  return files;
}

export const createFileRecordBasic = async(authId: string, mimeType: FileType, filename: string,
        title: string, description: string
 ) => {
  console.log('in createFileRecordBasic');
  const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

  const file = await prisma.appFile.create({
    data: {
      title: title,
      description: description,
      filename: filename,
      mimetype: mimeType,
      url: `/uploads/${filename}`,
      userId: user ? user.id : '',
    },
  });

  return file;
}

// export const createFileRecordReading = async(authId: string, mimeType: FileType, filename: string,
//         title: string, description: string
//  ) => {
//   const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

//   const file = await prisma.appFile.create({
//     data: {
//       title: title,
//       description: description,
//       filename: filename,
//       mimetype: mimeType,
//       url: `/uploads/${filename}`,
//       userId: user ? user.id : '',
//     },
//   });

//   return file;
// }

export const createFileRecordReadingFeedback = async(
    authId: string, 
    mimeType: FileType, 
    filename: string,
    title: string, 
    description: string,
    readingAuthorId: string
 ) => {
  console.log('in createFileRecordReadingFeedback');
  try {
    const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

    const file = await prisma.appFile.create({
      data: {
        title: title,
        description: description,
        filename: filename,
        mimetype: mimeType,
        url: `/uploads/${filename}`,
        userId: user ? user.id : '',
        documentType: getDocumentTypeFromString(DocumentType.FEEDBACK)
      },
    });

    const feedback = await prisma.readingFeedback.create({
      data: {
        readingAuthorId: readingAuthorId,
        feedbackUserId: user?.id,
        feedbackFileId: file.id
      }
    });
    
    return file;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
  
}

export const updateFileRecord = async(id: string, title: string, description: string) => {
  const file = await prisma.appFile.update({
    where: {
      id: id, 
    },
    data: {
      title: title,
      description: description
    },
  });

  return file;
}

export const deleteFileRecord = async(id: string) => {
  let file = null;
  let fileUrl: string = "";

  //get file url to return the file path so it can be deleted
  try{
    const fileMetaData = await prisma.appFile.findUnique({
      where: {
        id: id
      }
    });

    fileUrl = (typeof fileMetaData?.url === "string") ? fileMetaData.url : "";

    //delete the record of the file
    file = await prisma.appFile.delete({
      where: {
        id: id
      }
    });
  } catch (err) {
    throw err;
  }

  console.log(`File record has been deleted. file id: ${id}`);
  console.log(`fileUrl: ${fileUrl}`);
  return fileUrl;
}