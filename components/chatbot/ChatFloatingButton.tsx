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
      </button>

      <JeliyaChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
