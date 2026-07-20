import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const profile = await prisma.profile.findFirst();
    if (!profile) {
      console.log("No profile found");
      return;
    }
    console.log("Using profile:", profile.id);

    const contact = await prisma.contact.create({
      data: {
        ownerProfileId: profile.id,
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "+22500000000",
        company: "Test Co",
        message: "This is a test message",
        source: "exchange",
      },
    });

    console.log("Contact created:", contact);
  } catch (error) {
    console.error("Error creating contact:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
