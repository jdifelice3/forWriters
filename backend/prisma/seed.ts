import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

const main = async() => {
  // idempotent upsert
  let john: any = null;
  let adam: any = null;
  let BucksCounty: any = null;

  john = await prisma.users.create({
    data: {
      email: 'johndifelice@protonmail.com',
      superTokensId: 'ac0222c1-4a99-4991-a167-f5f4b2c203fa',
      role: Role.ADMIN,
      username: 'johndifelice'
    }
  }); 

  await prisma.userProfiles.create({
    data: {
      userId: john.id,
      firstName: 'John',
      lastName: 'DiFelice'
    }
  }); 

  adam = await prisma.users.create({
    data: {
      email: 'newyoutopia@gmail.com',
      superTokensId: 'none',
      role: Role.EDITOR,
      username: 'adamnewton'
    }
  }); 

  BucksCounty = await prisma.writingGroups.create({
    data: {
      name: 'Bucks Country Writers Group',
      city: 'Doylestown',
      state: 'PA',
    }
  }); 

  await prisma.writingGroupsUsers.create({
    data: {
      writingGroupId: BucksCounty.id, 
      userId: john.id,
      isAdmin: true
    }
  }); 

  await prisma.writingGroupsUsers.create({
    data: {
      writingGroupId: BucksCounty.id, 
      userId: adam.id,
      isAdmin: true
    }
  }); 

  console.log(`✔ Seeding completed`);
}

main().finally(() => prisma.$disconnect());
