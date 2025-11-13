import { PrismaClient, FileType } from "@prisma/client";

const prisma = new PrismaClient();

export const getFileRecords = async(authId: string) => {
  const user: any = await prisma.users.findUnique({
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

  const files = user.appFiles;
  console.log('in getFileRecords, appFiles', files);
  return files;
}

export const createFileRecord = async(authId: string, mimeType: FileType, filename: string,
        title: string, description: string
 ) => {
  const user = await prisma.users.findUnique({ where: { superTokensId: authId } });

  console.log('in createFileRecord');
  console.log('user', user);
  const file = await prisma.appFiles.create({
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
  const file = await prisma.appFiles.update({
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
    const fileMetaData = await prisma.appFiles.findUnique({
      where: {
        id: id
      }
    });

    fileUrl = (typeof fileMetaData?.url === "string") ? fileMetaData.url : "";

    //delete the record of the file
    file = await prisma.appFiles.delete({
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