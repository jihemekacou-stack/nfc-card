"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { JeliyaChatbot } from "./JeliyaChatbot";

export function ChatFloatingButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-sidebar-bg text-white shadow-lg transition-transform hover:scale-105 active:scale-95 z-40"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white border-2 border-[var(--background)]">
          1
        </span>
      </button>

      <JeliyaChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
