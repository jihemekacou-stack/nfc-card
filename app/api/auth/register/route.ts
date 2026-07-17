import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit faire au moins 6 caractères" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        emailVerified: new Date(), // Important for allowDangerousEmailAccountLinking
      },
    });
    
    const baseName = (user.name || "user").toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    const shortSlug = `${baseName}-${randomSuffix}`;

    await prisma.profile.create({
      data: {
        userId: user.id,
        slug: shortSlug,
        displayName: user.name || "Nouvel Utilisateur",
        publicEmail: user.email || "",
        avatarUrl: user.image || "",
        plan: "free",
        visibility: "public",
        isPrimary: true,
      },
    });

    return NextResponse.json(
      { message: "Compte créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite lors de la création du compte" },
      { status: 500 }
    );
  }
}
