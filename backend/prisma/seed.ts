import { PrismaClient, Role } from "@prisma/client";
import { 
  createUser, 
  createUserProfile,
  updateUserProfile
} from '../src/database/dbUsers';
import {
  createGroup,
  updateGroup
} from '../src/database/dbGroups';

const prisma = new PrismaClient();

/*

            email            | role  |        createdAt        |            id             |          username           |            superTokensId             |        updatedAt
-----------------------------+-------+-------------------------+---------------------------+-----------------------------+--------------------------------------+-------------------------
 johndifelice@protonmail.com | ADMIN | 2025-11-11 16:59:07.457 | cmhutfxoh0000a8w0yokyw8j0 | johndifelice@protonmail.com | f4843bc5-33a3-4f21-8364-b354f0714b97 | 2025-11-11 16:59:07.457
(1 row)

*/
const main = async() => {

  const user = await createUser('ac0222c1-4a99-4991-a167-f5f4b2c203fa','johndifelice@protonmail.com', Role.ADMIN);
  const userProfile = await createUserProfile(user.id);
  const updatedProfile = await updateUserProfile(user.id, "John", "DiFelice", `My name is John, and I'm a semi-professional writer of fiction. Semi-professional means that I'm occasionally paid for my writing. It means I'm good enough for sporadic publication and a nominal fee, but either not good enough or not ambitious enough to earn a living with it. This site contains many of my published and unpublished works, so have a read and you be the judge.`);

  const group = await createGroup(
    'ac0222c1-4a99-4991-a167-f5f4b2c203fa',
    'Bucks Country Writers Group',
    {
      street: '590 North Broad Street',
      city: 'Doylestown',
      state: 'PA',
      zip: '18901'
    },
    '',
    'WRITING',
    'https://i0.wp.com/thebcwritersgroup.com/wp-content/uploads/2025/03/DSCF0966-scaled.jpeg?resize=2048%2C1365&ssl=1',
    'https://thebcwritersgroup.com'
  )

// insert into "GroupUrl" (id,url, "groupId", "urlType") values ('qwpoeirqoiewrqpoiewr','https://www.meetup.com/bucks-county-writers-meetup', 'cmi4uk6es0004a8i88iqoy5av','MEETUP')
// insert into "GroupUrl" (id,url, "groupId", "urlType") values ('xxxqwpoeirqoiewrqpoiewr','https://www.facebook.com/groups/168592620450312', 'cmi4uk6es0004a8i88iqoy5av','FACEBOOK')  
  console.log(`✔ Seeding completed`);
}

main().finally(() => prisma.$disconnect());
