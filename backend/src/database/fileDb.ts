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

// Worked
// SELECT 
//     u.id AS userId,
//     u.email,
//     u.username,
//     af.id AS appFileId,
//     af.title,
//     af.description,
//     af.filename,
//     af.url,
//     af."uploadedAt"
// FROM 
//     "Users" AS u
// INNER JOIN 
//     "AppFiles" AS af ON af."userId" = u.id;