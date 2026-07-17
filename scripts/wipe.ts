import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Détachement des cartes physiques...");
  await prisma.physicalCard.updateMany({
    data: { profileId: null }
  });

  console.log("Suppression des utilisateurs et des données liées en cascade...");
  await prisma.user.deleteMany({});
  
  console.log("Suppression des sessions et comptes OAuth...");
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  // Just to be sure, delete profiles if any remain
  await prisma.profile.deleteMany({});
  await prisma.contact.deleteMany({});
  await prisma.profileSection.deleteMany({});

  console.log("Nettoyage de la base de données terminé avec succès !");
  
  const cardCount = await prisma.physicalCard.count();
  console.log(`Nombre de cartes physiques conservées: ${cardCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
