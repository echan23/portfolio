"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Searchbar from "@/components/Searchbar";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasProcessedSearch = useRef<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const extractMessageFromChunk = useCallback((chunk: string): string => {
    const matches = [...chunk.matchAll(/0:"(.*?)"/g)];
    return matches.map((m) => m[1].replace(/\\n/g, "\n")).join("");
  }, []);

  const generateGPTResponse = useCallback(
    async (userMessage: Message) => {
      const aiMessageId = (Date.now() + 1).toString();
      const initialAiMessage: Message = {
        id: aiMessageId,
        text: "",
        isUser: false,
      };

      setMessages((prev) => [...prev, initialAiMessage]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: userMessage.text,
              },
            ],
          }),
        });

        if (!res.ok || !res.body) {
          throw new Error("Failed to fetch AI response");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const extracted = extractMessageFromChunk(chunk);

          if (extracted) {
            buffer += extracted;

            const characters = buffer.split("");
            buffer = "";

            for (let i = 0; i < characters.length; i++) {
              const char = characters[i];

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId
                    ? { ...msg, text: msg.text + char }
                    : msg
                )
              );

              await new Promise((resolve) => setTimeout(resolve, 20));
            }
          }
        }
      } catch (e) {
        console.error("Error fetching AI response:", e);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  text: "Sorry, I encountered an error. Please try again.",
                }
              : msg
          )
        );
      }
    },
    [extractMessageFromChunk]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("q");

    if (searchQuery && searchQuery.trim() && !hasProcessedSearch.current) {
      hasProcessedSearch.current = true;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: searchQuery.trim(),
        isUser: true,
      };

      setMessages([userMessage]);
      generateGPTResponse(userMessage);

      router.replace("/chat", { scroll: false });
    }
  }, [searchParams, router, generateGPTResponse]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
    };

    setMessages([userMessage]);
    setInput("");

    setTimeout(() => generateGPTResponse(userMessage), 0);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-lg text-gray-400 block text-center">
            Ask me anything!
          </span>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? "bg-gray-100 text-gray-900"
                    : "bg-gray-50 text-gray-800 border border-gray-100"
                }`}
              >
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <Searchbar input={input} setInput={setInput} onSubmit={handleSend} />
    </div>
  );
};

export default Chat;
