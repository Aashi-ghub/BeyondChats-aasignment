"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AskCopilotModal } from "@/components/ask-copilot-modal";
import { ClientOnly } from "@/components/client-only";
import type { Message } from "@/app/page";

interface MessageBubbleProps {
  message: Message;
  onTextEdit: (text: string) => void;
}

export function MessageBubble({ message, onTextEdit }: MessageBubbleProps) {
  const [showAskCopilot, setShowAskCopilot] = useState(false);

  // Safety check for message
  if (!message) {
    return null;
  }

  const handleMessageClick = () => {
    if (message.sender === "customer") {
      setShowAskCopilot(true);
    }
  };

  return (
    <>
      <div
        className={`flex gap-3 ${
          message.sender === "agent" ? "justify-end" : "justify-start"
        }`}
      >
        {message.sender === "customer" && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-purple-100 text-purple-700 text-sm font-medium">
              {message.avatar || "U"}
            </AvatarFallback>
          </Avatar>
        )}

        <div
          onClick={handleMessageClick}
          className={`max-w-md p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${
            message.sender === "agent"
              ? "bg-blue-200 text-blue-900"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.content || ""}</p>
          <div className="flex items-center justify-between mt-1">
            <ClientOnly
              fallback={<p className="text-xs text-gray-400">Loading...</p>}
            >
              <p
                className={`text-xs ${
                  message.sender === "agent" ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {message.time || ""}
              </p>
            </ClientOnly>
            {message.sender === "agent" && (
              <span className="text-xs text-blue-700">Seen</span>
            )}
          </div>
        </div>

        {message.sender === "agent" && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
              {message.avatar || "A"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {showAskCopilot && (
        <AskCopilotModal
          message={message}
          onClose={() => setShowAskCopilot(false)}
        />
      )}
    </>
  );
}
