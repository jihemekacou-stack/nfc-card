import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { id } = params;
    const body = await request.json();

    // Verify ownership
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: { ownerProfile: true }
    });

    if (!contact || contact.ownerProfile.userId !== userId) {
      return NextResponse.json({ error: "Contact introuvable ou non autorisé" }, { status: 404 });
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        jobTitle: body.jobTitle,
        message: body.message,
        tags: body.tags !== undefined ? body.tags : undefined,
      }
    });

    return NextResponse.json({ success: true, contact: updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { id } = params;

    // Verify ownership
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: { ownerProfile: true }
    });

    if (!contact || contact.ownerProfile.userId !== userId) {
      return NextResponse.json({ error: "Contact introuvable ou non autorisé" }, { status: 404 });
    }

    await prisma.contact.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
