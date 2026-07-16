import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Gestion du client Prisma pour éviter de multiples instances en développement
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const authOptions: NextAuthOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  events: {
    createUser: async ({ user }) => {
      // Générer un slug court et propre
      const baseName = (user.name || "user").toLowerCase().replace(/[^a-z0-9]/g, '');
      const randomSuffix = Math.random().toString(36).substring(2, 5); // 3 chars
      const shortSlug = `${baseName}-${randomSuffix}`;

      // Create a default profile automatically
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
    },
  },
};
