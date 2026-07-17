import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
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
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Identifiants manquants");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Email ou mot de passe incorrect");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Email ou mot de passe incorrect");
        }

        return user;
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("[SIGN_IN CALLBACK] provider:", account?.provider, "email:", user?.email);
      
      if (account?.provider === "google" && user?.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          });
          
          if (existingUser) {
            console.log("[SIGN_IN CALLBACK] Existing user found:", existingUser.id);
            const existingAccount = await prisma.account.findUnique({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId
                }
              }
            });
            
            if (!existingAccount) {
              console.log("[SIGN_IN CALLBACK] Creating account link manually!");
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state as string,
                }
              });
              
              // Sync User name and image if they are missing
              if (!existingUser.image || !existingUser.name) {
                await prisma.user.update({
                  where: { id: existingUser.id },
                  data: {
                    name: existingUser.name || user.name,
                    image: existingUser.image || user.image,
                  }
                });
              }

              // Sync Profile avatar and name
              const existingProfile = await prisma.profile.findUnique({ where: { userId: existingUser.id } });
              if (existingProfile && (!existingProfile.avatarUrl || existingProfile.displayName === "Nouvel Utilisateur")) {
                await prisma.profile.update({
                  where: { id: existingProfile.id },
                  data: {
                    displayName: existingProfile.displayName === "Nouvel Utilisateur" ? user.name || "Nouvel Utilisateur" : existingProfile.displayName,
                    avatarUrl: existingProfile.avatarUrl || user.image || "",
                  }
                });
              }
              
              console.log("[SIGN_IN CALLBACK] Manual link created successfully!");
            } else {
              console.log("[SIGN_IN CALLBACK] Account already linked in DB.");
            }
          }
        } catch (error) {
          console.error("[SIGN_IN CALLBACK] Error during manual link:", error);
        }
      }
      return true;
    },
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
