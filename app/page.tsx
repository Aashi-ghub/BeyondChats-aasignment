/**
 * @file page.tsx
 * @description Main page component for the BeyondChats application.
 * This component serves as the entry point for the chat interface,
 * orchestrating the layout for inbox, chat window, and AI copilot features.
 * It manages conversation state and handles responsive behavior.
 * 
 * @author BeyondChats Team
 * @created 2025-05-24
 * @lastModified 2025-05-24
 */

"use client";

import { useState } from "react";
import { InboxSidebar } from "@/components/inbox-sidebar";
import { ChatWindow } from "@/components/chat-window";
import { AICopilotPanel } from "@/components/ai-copilot-panel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * @interface Conversation
 * @description Defines the structure of a conversation entity with all relevant properties
 * including user information, conversation status, and message history.
 */
export interface Conversation {
  /** Unique identifier for the conversation */
  id: number;
  /** Name of the customer or lead */
  name: string;
  /** Initials or avatar reference for display */
  avatar: string;
  /** Brief excerpt or subject line of the conversation */
  subject: string;
  /** Current status of the conversation (e.g., "Open", "Waiting request") */
  status: string;
  /** Tailwind CSS color class for the status indicator */
  statusColor: string;
  /** Human-readable time indicator (e.g., "2m", "1h") */
  time: string;
  /** Flag indicating if the conversation contains unread messages */
  unread: boolean;
  /** Array of Message objects representing the conversation history */
  messages: Message[];
}

/**
 * @interface Message
 * @description Defines the structure of a message within a conversation.
 */
export interface Message {
  /** Unique identifier for the message */
  id: number;
  /** Indicates whether the message is from a customer or an agent */
  sender: "customer" | "agent";
  /** The text content of the message */
  content: string;
  /** Timestamp for when the message was sent */
  time: string;
  /** Initials or avatar reference for the message sender */
  avatar: string;
}

/**
 * @constant conversationsData
 * @description Sample conversation data for demonstration purposes.
 * In a production environment, this would be fetched from an API or database.
 */
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

/**
 * @component Home
 * @description The main page component of the BeyondChats application.
 * Manages the state of conversations, selected conversation, and UI visibility.
 * Handles responsive layout switching between desktop and mobile views.
 * 
 * @returns {JSX.Element} The rendered Home component
 */
export default function Home() {
  // State management for conversations and UI
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(conversationsData[0]);
  const [conversations, setConversations] =
    useState<Conversation[]>(conversationsData);
  const [showInbox, setShowInbox] = useState(false);
  const [showAICopilot, setShowAICopilot] = useState(false);
  const isMobile = useIsMobile();

  /**
   * @function handleConversationSelect
   * @description Updates the selected conversation when a user clicks on a conversation in the inbox
   * 
   * @param {Conversation} conversation - The conversation selected by the user
   */
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  /**
   * @function handleSendMessage
   * @description Processes a new message from the agent, adds it to the conversation history,
   * and updates both the conversations state and the selected conversation
   * 
   * @param {string} content - The text content of the message to be sent
   */
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: selectedConversation.messages.length + 1,
      sender: "agent",
      content,
      time: formatTimeClient(),
      avatar: "A",
    };

    /**
     * @function formatTimeClient
     * @description Formats the current time for display in messages
     * Uses client-side time formatting to ensure accurate timestamps
     * 
     * @returns {string} Formatted time string (e.g., "3:45 PM")
     */
    function formatTimeClient() {
      // Use a ClientOnly component approach in actual rendering
      return typeof window === "undefined"
        ? "00:00" // Default value for server rendering
        : new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
    }

    // Update the conversations array with the new message
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
      <div className="flex h-full w-full relative">
        {/* 
          Mobile menu toggle button
          Only visible on mobile devices, provides access to the inbox sidebar
        */}
        {isMobile && (
          <Button
            variant="ghost"
            className="absolute top-2 left-2 z-50 bg-white/80 backdrop-blur-sm shadow-sm"
            onClick={() => setShowInbox(!showInbox)}
            aria-label="Toggle inbox sidebar"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        {/* 
          Left Sidebar - Inbox
          Displays conversation list with responsive behavior for mobile/desktop
        */}
        <div
          className={`${
            isMobile
              ? showInbox
                ? "block fixed inset-0 z-40 w-[85%] max-w-[300px]"
                : "hidden"
              : "w-1/4 flex-shrink-0"
          }`}
        >
          <InboxSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onConversationSelect={(conversation) => {
              handleConversationSelect(conversation);
              if (isMobile) setShowInbox(false);
            }}
          />
        </div>

        {/* 
          Backdrop overlay when mobile sidebar is open
          Provides a semi-transparent overlay and click target to close the sidebar
        */}
        {isMobile && showInbox && (
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setShowInbox(false)}
            aria-label="Close sidebar"
          ></div>
        )}

        {/* 
          Center - Chat Window
          Main conversation area showing message history and input field
        */}
        <div className={`${isMobile ? "w-full" : "w-2/4"} relative`}>
          <ChatWindow
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* 
          Right Panel - AI Copilot
          Shows AI assistant interface with responsive behavior for mobile/desktop
        */}
        <div
          className={`${
            isMobile
              ? showAICopilot
                ? "block fixed inset-0 z-40 w-[85%] max-w-[300px] right-0 left-auto"
                : "hidden"
              : "w-1/4 flex-shrink-0"
          }`}
        >
          <AICopilotPanel
            conversation={selectedConversation}
            onClose={isMobile ? () => setShowAICopilot(false) : undefined}
          />
        </div>

        {/* 
          Backdrop overlay when mobile AI panel is open
          Provides a semi-transparent overlay and click target to close the AI panel
        */}
        {isMobile && showAICopilot && (
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setShowAICopilot(false)}
            aria-label="Close AI copilot"
          ></div>
        )}

        {/* 
          AI Copilot floating button (mobile only)
          Fixed position button to open the AI panel on mobile devices
        */}
        {isMobile && !showAICopilot && (
          <Button
            className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-black shadow-md z-20 flex items-center justify-center"
            onClick={() => setShowAICopilot(true)}
            aria-label="Open AI copilot"
          >
            <Bot className="w-6 h-6 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
}
