"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Bot,
  X,
  Send,
  Minimize2,
  Maximize2,
  Upload,
  FileText,
} from "lucide-react";
import { RenderMD } from "@/lib/markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Record<string, Message[]> = {
  employee: [
    {
      role: "assistant",
      content:
        "Hi! I'm your PM&D Growth Agent. I can help you with goals, feedback, check-in prep, craft skills assessment, promotion readiness, and development planning. What would you like to work on?",
    },
  ],
  manager: [
    {
      role: "assistant",
      content:
        "Welcome! I'm your Manager Assist co-pilot. I can help with team performance synthesis, 1:1 prep, feedback drafting, calibration prep, and risk detection. How can I help?",
    },
  ],
};

const QUICK_ACTIONS_EMPLOYEE = [
  "My goals",
  "Craft skills",
  "Promotion readiness",
  "Outcomes",
  "Development",
];

const QUICK_ACTIONS_MANAGER = [
  "Team overview",
  "Risks",
  "Promo pipeline",
  "Development priorities",
];

export default function AgentChat() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "employee";
  const mode = role === "manager" ? "manager" : "employee";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    INITIAL_MESSAGES[mode] || INITIAL_MESSAGES.employee
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [contextDocs, setContextDocs] = useState("");
  const [showContext, setShowContext] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages(INITIAL_MESSAGES[mode] || INITIAL_MESSAGES.employee);
  }, [mode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    if (!input.trim() || typing) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          mode,
          contextDocs: contextDocs || undefined,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || data.error || "Something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error — please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setContextDocs((prev) => (prev ? prev + "\n\n---\n\n" + text : text));
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const quickActions = mode === "manager" ? QUICK_ACTIONS_MANAGER : QUICK_ACTIONS_EMPLOYEE;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-intuit-blue text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-105 z-50"
      >
        <Bot size={24} />
      </button>
    );
  }

  return (
    <div
      className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all ${
        minimized ? "w-80 h-14" : "w-[420px] h-[580px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-intuit-navy rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-intuit-blue flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">PM&D Agent</p>
            <p className="text-blue-300 text-[10px]">
              {mode === "employee" ? "Growth Assist" : "Manager Assist"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowContext(!showContext)}
            className={`p-1.5 transition-colors ${
              contextDocs
                ? "text-green-300 hover:text-green-100"
                : "text-blue-300 hover:text-white"
            }`}
            title="Add context"
          >
            <FileText size={14} />
          </button>
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1.5 text-blue-300 hover:text-white transition-colors"
          >
            {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-blue-300 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Context Panel (collapsible) */}
          {showContext && (
            <div className="p-3 border-b border-gray-100 bg-gray-50 max-h-32 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-600">
                  Context Documents{" "}
                  {contextDocs && (
                    <span className="text-green-600">
                      ({contextDocs.split("\n").length} lines)
                    </span>
                  )}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="text-[10px] px-2 py-0.5 bg-intuit-blue text-white rounded hover:bg-blue-700"
                  >
                    <Upload size={10} className="inline mr-1" />
                    Upload
                  </button>
                  {contextDocs && (
                    <button
                      onClick={() => setContextDocs("")}
                      className="text-[10px] px-2 py-0.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".txt,.md,.csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              <textarea
                value={contextDocs}
                onChange={(e) => setContextDocs(e.target.value)}
                placeholder="Paste context here (performance notes, strategy docs, weekly updates…)"
                className="w-full text-[11px] text-gray-600 bg-white border border-gray-200 rounded p-2 resize-none h-14 focus:outline-none focus:ring-1 focus:ring-intuit-blue"
              />
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-intuit-blue text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="agent-md">
                      <RenderMD text={msg.content} />
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
            {quickActions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your PM&D Agent..."
                className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-intuit-blue/30 focus:border-intuit-blue"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={typing}
                className="w-9 h-9 rounded-lg bg-intuit-blue text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
