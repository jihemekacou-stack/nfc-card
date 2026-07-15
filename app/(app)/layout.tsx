import { AppSidebar } from "@/components/layout/AppSidebar";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";
import { ChatFloatingButton } from "@/components/chatbot/ChatFloatingButton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
