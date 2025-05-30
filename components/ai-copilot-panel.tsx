"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, ArrowRight, Copy, ChevronDown, X } from "lucide-react";
import type { Conversation } from "@/app/page";

interface AICopilotPanelProps {
  conversation: Conversation;
  onClose?: () => void;
}

interface AIResponse {
  id: string;
  question: string;
  answer: string;
  sources: string[];
  isGenerating: boolean;
}

export function AICopilotPanel({ conversation }: AICopilotPanelProps) {
  const [activeTab, setActiveTab] = useState<"copilot" | "details">("copilot");
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestedPrompts = [
    "How do I get a refund?",
    "What's your return policy?",
    "How can I track my order?",
    "Do you offer international shipping?",
  ];

  const relevantSources = [
    "Getting a refund",
    "Refund for an order placed by mistake",
    "Refund for an unwanted gift",
    "Return policy guidelines",
    "Order tracking information",
  ];

  const simulateAIResponse = async (userQuestion: string): Promise<string> => {
    // Simulate typing effect
    const responses = {
      "How do I get a refund?":
        "We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.\n\nTo assist you with your refund request, could you please provide your order ID and proof of purchase.",
      "What if the order was over 60 days ago?":
        "I understand your concern about the 60-day policy. While our standard policy is 60 days, we do review exceptions on a case-by-case basis. Let me check what options might be available for your specific situation.",
      default:
        "I'd be happy to help you with that question. Let me gather some relevant information for you.",
    };

    const response =
      responses[userQuestion as keyof typeof responses] || responses.default;

    // Simulate gradual text generation
    return new Promise((resolve) => {
      setTimeout(() => resolve(response), 1500);
    });
  };

  const handleSubmit = async (questionText: string) => {
    if (!questionText.trim()) return;

    const newResponse: AIResponse = {
      id: `response-${responses.length + 1}`,
      question: questionText,
      answer: "",
      sources: relevantSources.slice(0, 3),
      isGenerating: true,
    };

    setResponses((prev) => [...prev, newResponse]);
    setIsGenerating(true);
    setQuestion("");

    try {
      const answer = await simulateAIResponse(questionText);

      setResponses((prev) =>
        prev.map((r) =>
          r.id === newResponse.id ? { ...r, answer, isGenerating: false } : r
        )
      );
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(question);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSubmit(prompt);
  };

  return (
    <div className="bg-white h-full w-full flex flex-col border-0 relative">
      {/* Gradient effect at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300 via-pink-200/50 to-transparent opacity-70 pointer-events-none"
        style={{ filter: "blur(8px) saturate(1.8)" }}
      ></div>
      {/* Header with Tabs */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("copilot")}
            className={`flex items-center gap-2 px-3 py-2 border-b-2 transition-colors ${
              activeTab === "copilot"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="font-medium">AI Copilot</span>
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-3 py-2 border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="font-medium">Details</span>
          </button>
        </div>

        {activeTab === "copilot" && (
          <div className="text-center mt-3 mb-2">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Hi, I'm Fin AI Copilot
            </h3>
            <p className="text-sm text-gray-600 px-6">
              Ask me anything about this conversation
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10">
        {activeTab === "copilot" ? (
          <div className="p-6">
            {/* AI Responses */}
            {responses.length > 0 && (
              <div className="space-y-8 mb-6">
                {responses.map((response) => (
                  <div key={response.id} className="space-y-4">
                    {/* User Question */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-medium">You</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 bg-gray-100 p-3 rounded-lg inline-block">
                          {response.question}
                        </p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gradient-to-r from-pink-100 to-purple-200 rounded-lg p-4 shadow-sm">
                          {response.isGenerating ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                              <span className="text-sm text-gray-600">
                                Generating response...
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-900 whitespace-pre-line">
                              {response.answer}
                            </p>
                          )}
                        </div>{" "}
                        {!response.isGenerating &&
                          response.sources.length > 0 && (
                            <div className="mt-4">
                              <p className="text-xs text-gray-500 mb-3">
                                {response.sources.length} relevant sources found
                              </p>
                              <div className="space-y-1">
                                {response.sources.map((source, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <span className="text-xs text-blue-500">
                                      •
                                    </span>
                                    <span className="text-gray-700">
                                      {source}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-blue-500 mt-3 p-0 h-auto hover:text-blue-700 transition-colors"
                              >
                                See all <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Prompts */}
            {responses.length === 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  Suggested
                </h4>
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="w-full justify-between text-left h-auto p-4 mb-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-all"
                    disabled={isGenerating}
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3 h-3 text-blue-500" />
                  </Button>
                ))}
              </div>
            )}

            {/* Add to Composer */}
            {responses.length > 0 && (
              <div className="mb-6">
                <Button
                  variant="outline"
                  className="w-full justify-between p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-blue-500" />
                    <span>Add to composer</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-blue-500" />
                </Button>
              </div>
            )}

            {/* Relevant Sources */}
            {responses.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  15 relevant sources found
                </p>
                <div className="space-y-3">
                  {relevantSources.slice(0, 3).map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-700">{source}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-blue-500 mt-3 p-0 h-auto hover:text-blue-700 transition-colors"
                >
                  See all <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-4 text-lg">
              Conversation Details
            </h4>
            <div className="space-y-4 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              <div>
                <span className="text-gray-500">Customer:</span>
                <span className="ml-2 text-gray-900">{conversation.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <Badge
                  variant="outline"
                  className="ml-2 bg-green-50 text-green-700 border-green-200"
                >
                  {conversation.status}
                </Badge>
              </div>
              <div>
                <span className="text-gray-500">Last activity:</span>
                <span className="ml-2 text-gray-900">{conversation.time}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {activeTab === "copilot" && (
        <div className="p-6 border-t border-gray-100 relative z-10">
          <form onSubmit={handleQuestionSubmit} className="relative">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="pr-12 rounded-full border-gray-200 focus:border-blue-500 shadow-sm"
              disabled={isGenerating}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600"
              disabled={isGenerating || !question.trim()}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
