/**
 * @file chat-window.tsx
 * @description The main chat interface component that displays conversation messages
 * and provides functionality for users to compose and send new messages.
 * 
 * @author BeyondChats Team
 * @created 2025-05-24
 * @lastModified 2025-05-24
 */

"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Smile,
  Paperclip,
  Send,
  X,
  Bold,
  Italic,
  Code,
  Link,
  Hash,
} from "lucide-react";
import { MessageBubble } from "@/components/message-bubble";
import { TextEditor } from "@/components/text-editor";
import type { Conversation } from "@/app/page";

/**
 * @interface ChatWindowProps
 * @description Props interface for the ChatWindow component
 */
interface ChatWindowProps {
  /** The currently selected conversation object */
  conversation: Conversation;
  /** Callback function to handle sending messages */
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ conversation, onSendMessage }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingText, setEditingText] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextEdit = (text: string) => {
    setEditingText(text);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingText("");
  };

  const handleEditorApply = (newText: string) => {
    setMessage(newText);
    setShowEditor(false);
    setEditingText("");
  };

  // Safety check for conversation and messages
  if (!conversation || !conversation.messages) {
    return (
      <div className="bg-white h-full w-full flex items-center justify-center">
        <p className="text-gray-500">No conversation selected</p>
      </div>
    );
  }

  return (
    <div className="bg-white h-full w-full flex flex-col relative border-r border-gray-100">
      {/* Very subtle gradient in chat */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-gray-50 to-transparent opacity-30 pointer-events-none"
        style={{ filter: "blur(12px)" }}
      ></div>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-purple-100 text-purple-700 text-sm font-medium">
              {conversation.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {conversation.status && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <div
                className={`w-2 h-2 ${conversation.statusColor} rounded-full mr-1`}
              ></div>
              {conversation.status}
            </Badge>
          )}
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-6">
        {conversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onTextEdit={handleTextEdit}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
            Chat
          </Button>
          <span className="text-xs text-gray-400">Use ⌘K for shortcuts</span>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <Bold className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <Italic className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <Code className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <Link className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-xs">
            H1
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-xs">
            H2
          </Button>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <Hash className="w-3 h-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-4 pr-20 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <Paperclip className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                <Smile className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSend}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Text Editor Overlay */}
      {showEditor && (
        <TextEditor
          text={editingText}
          onClose={handleEditorClose}
          onApply={handleEditorApply}
        />
      )}
    </div>
  );
}
