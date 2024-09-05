"use client";

import { cn } from "../../lib/utils";
import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { createPortal } from "react-dom";

export default function AIChatBox({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      setIsLoading(true);
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const data = await res.json();
      const aiMessage = { id: Date.now(), role: "assistant", content: data.content };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearMessages = () => {
    setMessages([]);
    setError(null);
  };

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return isBrowser
    ? createPortal(
        <>
          {open && (
            <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-[999] pointer-events-none"></div>
          )}

          <div
            className={cn(
              "fixed bottom-0 right-0 z-[1000] w-full max-w-[500px] p-4 xl:right-20 transition-transform duration-300 ease-in-out transform",
              open ? "translate-y-0" : "translate-y-full"
            )}
          >
            <button onClick={onClose} className="mb-1 ms-auto block">
              <XCircle size={30} className="rounded-full bg-white dark:bg-black cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" />
            </button>
            <div className="flex h-[500px] flex-col rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="mt-3 h-full overflow-y-auto px-4 py-2" ref={scrollRef}>
                {messages.map((message) => (
                  <ChatMessage message={message} key={message.id} />
                ))}
                {isLoading && lastMessageIsUser && (
                  <ChatMessage
                    message={{
                      id: "loading",
                      role: "assistant",
                      content: "Thinking...",
                    }}
                  />
                )}
                {error && (
                  <ChatMessage
                    message={{
                      id: "error",
                      role: "assistant",
                      content: error,
                    }}
                  />
                )}
                {!error && messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-gray-600 dark:text-gray-300">
                    <Bot size={28} className="text-foreground dark:text-dark-foreground" />
                    <p className="text-lg font-medium">
                      Send a message to start the AI chat!
                    </p>
                    <p>
                      You can ask the chatbot any question about me, and it will find the relevant information.
                    </p>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t dark:border-gray-800">
                <button
                  type="button"
                  className="flex w-10 h-10 flex-none items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Clear chat"
                  onClick={handleClearMessages}
                >
                  <Trash size={20} />
                </button>
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Say something..."
                  className="flex-grow rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  ref={inputRef}
                />
                <button
                  type="submit"
                  className="flex w-10 h-10 flex-none items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
                  disabled={input.length === 0 || isLoading}
                  title="Submit message"
                >
                  <SendHorizontal size={20} />
                </button>
              </form>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
}

function ChatMessage({ message }) {
  const isAiMessage = message.role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end"
      )}
    >
      {isAiMessage && <Bot className="mr-2 flex-none text-foreground dark:text-dark-foreground" />}
      <div
        className={cn(
          "rounded-md border px-3 py-2 max-w-xs",
          isAiMessage
            ? "bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"
            : "bg-foreground text-background dark:bg-dark-foreground dark:text-dark-background"
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="text-primary dark:text-dark-primary hover:underline"
              />
            ),
            p: ({ node, ...props }) => <p {...props} className="mt-3 first:mt-0" />,
            ul: ({ node, ...props }) => (
              <ul {...props} className="mt-3 list-inside list-disc first:mt-0" />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
