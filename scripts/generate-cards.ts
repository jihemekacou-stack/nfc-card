import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateDigits(): string {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
}

async function main() {
  console.log("Suppression des anciennes cartes non assignées...");
  await prisma.physicalCard.deleteMany({
    where: { profileId: null }
  });

  const numberOfCards = 200;
  let generated = 0;

  console.log(`Génération de ${numberOfCards} nouvelles cartes avec ID FLX-xxxxxx et code xxxxxx...`);

  while (generated < numberOfCards) {
    const digits = generateDigits();
    const id = `FLX-${digits}`;
    const code = digits;

    // Vérifier si le code existe déjà
    const existing = await prisma.physicalCard.findUnique({
      where: { code },
    });

    if (!existing) {
      await prisma.physicalCard.create({
        data: {
          id: id,
          code: code,
        },
      });
      generated++;
      if (generated % 50 === 0) {
        console.log(`${generated} cartes générées...`);
      }
    }
  }

  console.log('Génération terminée avec succès !');
}

main()
  .catch((e) => {
    console.error('Erreur lors de la génération:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
