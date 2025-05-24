"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, ArrowUp } from "lucide-react";
import type { Message } from "@/app/page";

interface AskCopilotModalProps {
  message: Message;
  onClose: () => void;
}

export function AskCopilotModal({ message, onClose }: AskCopilotModalProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // Handle AI question submission
      console.log("Asking Fin:", question);
      setQuestion("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 m-0">
      <div className="bg-white w-full h-full max-h-full max-w-full overflow-auto hide-scrollbar relative">
        {/* Gradient effect at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300 via-pink-200/50 to-transparent opacity-70 pointer-events-none"
          style={{ filter: "blur(8px) saturate(1.8)" }}
        ></div>
        {/* Header */}
        <div className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <Bot className="w-5 h-5 mr-2" />
          <span className="font-medium">Ask Fin Copilot</span>
        </div>

        {/* Message Display */}
        <div className="p-6 bg-gray-50 relative z-10">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <p className="text-sm text-gray-900">{message.content}</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <span>📅</span>
              {message.time}
            </p>
          </div>
        </div>

        {/* Question Input */}
        <div className="p-6 relative z-10">
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex-1 relative">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a follow up question..."
                className="flex-1 w-full pr-12 rounded-full bg-gray-50 border-gray-200 shadow-sm"
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Close Button */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <Button variant="outline" onClick={onClose} className="px-6">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
