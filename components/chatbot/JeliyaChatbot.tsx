/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export function JeliyaChatbot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Bonjour ! Je suis Jeliya, votre assistant personnel IA. Comment puis-je vous aider aujourd'hui ?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen, isMinimized]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: "Je suis là pour vous aider à gérer votre profil et vos cartes NFC. Pour l'instant, je suis en phase de démonstration, mais je serai bientôt connecté à mon cerveau d'IA complet !", 
        isUser: false 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className={`fixed right-6 z-50 flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 ${isMinimized ? 'bottom-6 w-72 h-16' : 'bottom-24 w-80 sm:w-96 h-[500px] max-h-[80vh]'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between bg-violet-600 px-4 py-3 cursor-pointer shrink-0" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/jeliya.png" alt="Jeliya" className="w-10 h-10 rounded-full object-cover border-2 border-white/20 bg-white" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-violet-600 rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm">Jeliya</span>
            <span className="text-violet-200 text-[11px]">Assistant IA en ligne</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50/50 dark:bg-gray-900/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                {!msg.isUser && (
                  <img src="/jeliya.png" alt="Jeliya" className="w-6 h-6 rounded-full object-cover mr-2 self-end mb-1 shrink-0 bg-white" />
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.isUser ? 'bg-violet-600 text-white rounded-br-sm' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-700'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <img src="/jeliya.png" alt="Jeliya" className="w-6 h-6 rounded-full object-cover mr-2 self-end mb-1 bg-white" />
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2 relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..." 
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full pl-4 pr-12 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
