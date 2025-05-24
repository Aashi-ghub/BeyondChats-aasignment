"use client";

import { useState } from "react";
import { InboxSidebar } from "@/components/inbox-sidebar";
import { ChatWindow } from "@/components/chat-window";
import { AICopilotPanel } from "@/components/ai-copilot-panel";

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  status: string;
  statusColor: string;
  time: string;
  unread: boolean;
  messages: Message[];
}

export interface Message {
  id: number;
  sender: "customer" | "agent";
  content: string;
  time: string;
  avatar: string;
}

const conversationsData: Conversation[] = [
  {
    id: 1,
    name: "Luis Easton",
    avatar: "LE",
    subject:
      "I bought a product from your store in November as a Christmas gift for a...",
    status: "Open",
    statusColor: "bg-green-500",
    time: "2m",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        content:
          "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund this, as it is un-opened.",
        time: "2:45 PM",
        avatar: "LE",
      },
      {
        id: 2,
        sender: "agent",
        content: "Let me just look into this for you, Luis.",
        time: "2:46 PM",
        avatar: "A",
      },
      {
        id: 3,
        sender: "agent",
        content:
          "Just a heads-up:\nWe can only refund orders from the last 60 days.\nYour item must meet our return condition requirements.\n\nOnce confirmed, I'll send you a returns QR code for easy processing.\n\nThanks for your cooperation!",
        time: "2:47 PM",
        avatar: "A",
      },
      {
        id: 4,
        sender: "customer",
        content:
          "I placed the order over 60 days ago 😔. Could you make an exception, please?",
        time: "1min",
        avatar: "LE",
      },
    ],
  },
  {
    id: 2,
    name: "Dan Mills",
    avatar: "DM",
    subject: "Hi there, I have a qu...",
    status: "Waiting request",
    statusColor: "bg-yellow-500",
    time: "5m",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hi there, I have a question about my recent order.",
        time: "3:15 PM",
        avatar: "DM",
      },
    ],
  },
  {
    id: 3,
    name: "Lead from New York",
    avatar: "LN",
    subject: "Good morning, tell me...",
    status: "",
    statusColor: "",
    time: "1h",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Good morning, tell me more about your pricing plans.",
        time: "1:30 PM",
        avatar: "LN",
      },
    ],
  },
];

export default function Home() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(conversationsData[0]);
  const [conversations, setConversations] =
    useState<Conversation[]>(conversationsData);

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: selectedConversation.messages.length + 1,
      sender: "agent",
      content,
      time: formatTimeClient(),
      avatar: "A",
    };

    // Function to format time on client side only
    function formatTimeClient() {
      // Use a ClientOnly component approach in actual rendering
      return typeof window === "undefined"
        ? "00:00" // Default value for server rendering
        : new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
    }

    const updatedConversations = conversations.map((conv) =>
      conv.id === selectedConversation.id
        ? { ...conv, messages: [...conv.messages, newMessage] }
        : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-100 via-purple-50 to-blue-50">
      <div className="flex h-full w-full">
        {/* Left Sidebar - Inbox (25% of screen) */}
        <div className="w-1/4 flex-shrink-0">
          <InboxSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onConversationSelect={handleConversationSelect}
          />
        </div>

        {/* Center - Chat Window (50% of screen) */}
        <div className="w-2/4">
          <ChatWindow
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right Panel - AI Copilot (25% of screen) */}
        <div className="w-1/4 flex-shrink-0">
          <AICopilotPanel conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
}
