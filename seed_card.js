const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.physicalCard.upsert({
    where: { code: '123456' },
    update: {},
    create: { code: '123456' },
  });
  console.log('Test card 123456 created!');
}
main().catch(console.error).finally(() => prisma.$disconnect());
