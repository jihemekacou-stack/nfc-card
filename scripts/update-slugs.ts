import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const profiles = await prisma.profile.findMany();

  for (const profile of profiles) {
    if (profile.slug.startsWith('cuid') || profile.slug.length > 20) {
      const baseName = (profile.displayName || "user").toLowerCase().replace(/[^a-z0-9]/g, '');
      let randomSuffix = Math.random().toString(36).substring(2, 5); // 3 chars
      let shortSlug = `${baseName}-${randomSuffix}`;
      
      // Assurer l'unicité
      let isUnique = false;
      while (!isUnique) {
        const existing = await prisma.profile.findUnique({ where: { slug: shortSlug } });
        if (!existing || existing.id === profile.id) {
          isUnique = true;
        } else {
          randomSuffix = Math.random().toString(36).substring(2, 5);
          shortSlug = `${baseName}-${randomSuffix}`;
        }
      }

      await prisma.profile.update({
        where: { id: profile.id },
        data: { slug: shortSlug },
      });
      console.log(`Updated profile ${profile.id} slug to ${shortSlug}`);
    }
  }

  console.log('Update completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
