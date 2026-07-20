import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    if (!userId) {
       return NextResponse.json({ error: "ID manquant" }, { status: 401 });
    }

    const contacts = await prisma.contact.findMany({
      where: {
        ownerProfile: {
          userId: userId
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { ownerProfileId, firstName, lastName, email, phone, company, message, source } = data;

    if (!ownerProfileId || !firstName) {
      return NextResponse.json({ error: "ownerProfileId and firstName are required" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        ownerProfileId,
        firstName,
        lastName: lastName || "",
        email: email || null,
        phone: phone || null,
        company: company || null,
        message: message || null,
        source: source || "exchange",
      },
    });

    await prisma.analyticsEvent.create({
      data: {
        profileId: ownerProfileId,
        type: "CONTACT_ADDED",
        source: source || "exchange",
        metadata: { contactId: contact.id }
      }
    });

    return NextResponse.json(contact);
  } catch (error: unknown) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to create contact" }, { status: 500 });
  }
}
