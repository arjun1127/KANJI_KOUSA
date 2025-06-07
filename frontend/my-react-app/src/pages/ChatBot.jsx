import React, { useState } from "react";
import { Link } from "react-router-dom";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
  GEMINI_API_KEY;

function cleanResponseText(text) {
  if (!text) return "";
  let cleaned = text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*\* /gm, "- ")
    .replace(/^(\d+)\.\s+/gm, (match, p1) => `${p1}. `);
  return cleaned.trim();
}

const ChatBotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: input }] }],
          safetySettings: [
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
          },
        }),
      });

      const data = await response.json();
      const rawReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t understand that.";
      const cleanedReply = cleanResponseText(rawReply);

      setMessages((prev) => [...prev, { sender: "bot", text: cleanedReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong." }]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-start min-h-screen bg-black text-gray-100 p-6 overflow-visible"
      style={{ height: "100vh" }}
    >
      {/* ❄️ Snowflakes */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 5}s`,
            fontSize: `${Math.random() * 8 + 10}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ❄
        </div>
      ))}

      {/* ✨ Glowing dots background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(2px 2px at 20% 20%, rgba(255,255,255,0.8), transparent), " +
            "radial-gradient(1.5px 1.5px at 40% 40%, rgba(255,255,255,0.6), transparent), " +
            "radial-gradient(2.5px 2.5px at 60% 70%, rgba(255,255,255,0.7), transparent), " +
            "radial-gradient(1px 1px at 80% 30%, rgba(255,255,255,0.5), transparent)",
          backgroundRepeat: "no-repeat",
          animation: "glowDots 30s linear infinite",
        }}
      />

      {/* 🏠 Header */}
      <header className="w-full max-w-3xl flex items-center justify-between mb-4 flex-shrink-0">
        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-600 font-medium transition-colors"
        >
          Home
        </Link>
        <h1 className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">
          Kanji AI Assistant
        </h1>
        <div style={{ width: 48 }} />
      </header>

      {/* 💬 Chat area */}
      <div
        className="w-full max-w-3xl flex flex-col bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-6 flex-grow"
        style={{ minHeight: 0 }}
      >
        <div
          className="flex-1 overflow-y-auto mb-4 pr-2"
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            scrollbarWidth: "thin",
            scrollbarColor: "#4f46e5 transparent",
            minHeight: 0,
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-3 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } fade-in`}
              style={{ animationDuration: "0.5s", animationFillMode: "forwards" }}
            >
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
                style={{ wordWrap: "break-word" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-400 mt-4 font-mono animate-pulse">
              Thinking...
            </div>
          )}
        </div>

        {/* ✍️ Input + Send */}
        <div className="flex gap-2 flex-shrink-0">
          <input
            type="text"
            className="flex-1 p-3 rounded-l-2xl border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-800 text-white placeholder-gray-400"
            placeholder="Ask about a kanji or take a quiz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-r-2xl px-6 py-3 font-semibold shadow-lg text-white flex items-center justify-center"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>

      {/* 🌟 CSS styles */}
      <style>{`
        @keyframes glowDots {
          0% {
            background-position:
              20% 20%,
              40% 40%,
              60% 70%,
              80% 30%;
          }
          100% {
            background-position:
              80% 80%,
              60% 60%,
              40% 30%,
              20% 70%;
          }
        }

        /* ❄ Snowflake animation */
        .snowflake {
          position: absolute;
          top: -5%;
          color: white;
          opacity: 0.8;
          user-select: none;
          animation: snowFall linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes snowFall {
          0% {
            transform: translateY(-5vh);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }

        /* Chat message fade-in */
        .fade-in {
          opacity: 0;
          animation-name: fadeInUp;
          animation-timing-function: ease-out;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* WebKit scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #4f46e5;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ChatBotPage;
