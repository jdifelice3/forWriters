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

prisma.$on('query', e => {
  console.log(e.query);
});

export const getFileRecords = async(authId: string, documentType?: string) => {
    const user: any = await prisma.user.findUnique({
        where: 
            {
                superTokensId: authId,
            },
            include: {
                userProfile: true,
            }
    });

    const files = await prisma.appFile.findMany({
        where: {
            userId: user?.id,
            ...(documentType && {
            documentType: getDocumentTypeFromString(documentType)
            })
        },
     
        orderBy: { title: "asc" }
    });
    return files;
}

export const createFileRecordBasic = async(
    authId: string, 
    mimeType: string, 
    filename: string,
    title: string, 
    description: string,
    url: string
 ) => {
  
  const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

  const file = await prisma.appFile.create({
    data: {
      title: title,
      description: description,
      filename: filename,
      mimetype: mapMimeToEnum(mimeType),
      url: url,
      userId: user ? user.id : '',
    },
  });

  return file;
}

// export const createImageRecord = async(
//     authId: string, 
//     mimeType: string, 
//     filename: string,
//     title: string, 
//     description: string,
//     url: string
//  ) => {
  
//   const user = await prisma.user.findUnique({ where: { superTokensId: authId } });

//   const file = await prisma.appFile.create({
//     data: {
//       title: title,
//       description: description,
//       filename: filename,
//       mimetype: mapMimeToEnum(mimeType),
//       url: url,
//       userId: user ? user.id : '',
//     },
//   });

//   return file;
// }

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
    const file = await prisma.appFile.create({
      data: {
        title: title,
        description: description,
        filename: filename,
        mimetype: mapMimeToEnum(mimeType),
        url: s3Url,
        userId: user ? user.id : '',
        documentType: getDocumentTypeFromString(DocumentType.FEEDBACK)
      },
    });

    const feedback = await prisma.readingFeedback.create({
      data: {
        readingAuthorId: readingAuthorId,
        feedbackUserId: user.id,
        feedbackFileId: file.id,
      }
    });

    const filePath: string = path.join(process.cwd(), "uploads/",filename);
    const comments = await extractCommentsWithTargets(filePath);
    
    let input = [];
    //add additional feedback
    input.push({
        readingAuthorId: readingAuthorId,
        readingFeedbackId: feedback.id,
        source: CommentSource.MANUAL,
        commentText: (additionalFeedback ? additionalFeedback : ""),
        targetText: "",
    })
    
    for(let i = 0; i < comments.length; i++){
        input.push({
            readingAuthorId: readingAuthorId,
            readingFeedbackId: feedback.id,
            source: CommentSource.DOCX,
            commentText: comments[i].commentText,
            targetText: comments[i].targetText
        })
    }
    
    const commentsResults = await prisma.readingFeedbackComment.createMany({
        data: input
    });

    return file;
  } catch (err) {
    console.error('err', err);
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