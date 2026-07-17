const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:');
  users.forEach(u => {
    console.log(`Email: ${u.email}, emailVerified: ${u.emailVerified}, id: ${u.id}`);
  });
  
  const accounts = await prisma.account.findMany();
  console.log('\nAccounts in DB:');
  accounts.forEach(a => {
    console.log(`UserId: ${a.userId}, Provider: ${a.provider}, type: ${a.type}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
