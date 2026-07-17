const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { profile: true }
  });

  let count = 0;
  for (const user of users) {
    if (user.email && user.profile) {
      if (!user.profile.publicEmail || user.profile.publicEmail.endsWith('@flexcard.ci') || user.profile.publicEmail !== user.email) {
        await prisma.profile.update({
          where: { id: user.profile.id },
          data: { publicEmail: user.email }
        });
        count++;
      }
    }
  }

  console.log(`Updated ${count} profiles with the correct login email.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
