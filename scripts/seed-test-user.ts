import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    }
  });

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      slug: "test-profile",
      displayName: "Test User",
      jobTitle: "Developer",
      company: "Acme Corp",
      bio: "Hello world this is a bio",
      plan: "free",
      visibility: "public"
    }
  });
  console.log("Created test profile with slug test-profile");
}
main().catch(console.error).finally(() => prisma.$disconnect());
