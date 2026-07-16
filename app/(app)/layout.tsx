import { AppSidebar } from "@/components/layout/AppSidebar";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";
import { ChatFloatingButton } from "@/components/chatbot/ChatFloatingButton";
import { CardActivationScreen } from "@/components/profile/CardActivationScreen";
import { getServerSession } from "next-auth";
import { authOptions, prisma } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  // Vérifier si l'utilisateur possède une carte
  const profile = await prisma.profile.findUnique({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: { userId: (session.user as any).id },
    include: { cards: true }
  });

  const hasCard = profile && profile.cards.length > 0;

  if (!hasCard) {
    // Si l'utilisateur n'a pas de carte, on affiche uniquement l'écran d'activation.
    // Il n'aura aucun accès au layout du dashboard.
    return <CardActivationScreen />;
  }

  return (
    <ProfileProvider>
      <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors">
        <AppSidebar />
        <main className="flex-1 lg:pl-[260px] pb-24 lg:pb-0 relative">
          {children}
          <ChatFloatingButton />
        </main>
      </div>
    </ProfileProvider>
  );
}
