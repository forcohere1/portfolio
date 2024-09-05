"use client";

import { Bot } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AppChatBox"

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setChatBoxOpen(true)}
        className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 transition-transform duration-300 transform hover:scale-110"
        aria-label="Open Chat"
      >
        <Bot
          size={24}
          className="text-primary transition-transform duration-300 transform hover:scale-110"
        />
      </button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}