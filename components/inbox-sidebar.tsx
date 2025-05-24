"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { Conversation } from "@/app/page";

interface InboxSidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation;
  onConversationSelect: (conversation: Conversation) => void;
}

export function InboxSidebar({
  conversations,
  selectedConversation,
  onConversationSelect,
}: InboxSidebarProps) {
  return (
    <div className="bg-white h-full w-full flex flex-col border-r border-gray-100 relative">
      {/* Subtle gradient effect at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-blue-100 to-transparent opacity-60 pointer-events-none"
        style={{ filter: "blur(8px)" }}
      ></div>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Inbox</h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm" className="text-xs">
            5 Open <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Waiting request <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onConversationSelect(conversation)}
            className={`p-2 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
              conversation.id === selectedConversation.id
                ? "bg-blue-50 border-l-2 border-l-blue-500"
                : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-medium">
                  {conversation.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <span className="text-xs text-gray-500">
                      {conversation.time}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {conversation.subject}
                </p>

                {conversation.status && (
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${conversation.statusColor}`}
                    ></div>
                    <span className="text-xs text-gray-500">
                      {conversation.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
