import { PrismaClient } from "@prisma/client";
import { FileType, AppFile } from "../domain-types";
import { getFileTypeFromString } from "../util/Enum";

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

export const createFileRecord = async(authId: string, mimeType: FileType, filename: string,
        title: string, description: string
 ) => {
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