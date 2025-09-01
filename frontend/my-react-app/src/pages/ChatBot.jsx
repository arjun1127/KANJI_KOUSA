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
          contents: [
            // 🔹 Instruction (system-like)
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are Kanji AI Assistant. Only answer questions about kanji characters: meanings, readings (on/yomi/kun/yomi), stroke order, common compounds, etymology, and quizzes about kanji. If the user asks anything that is NOT about kanji, respond with a short refusal: 'I only answer kanji-related questions. If you'd like, ask me about a kanji character or a quiz.' Keep answers concise, factual, and provide readings and example compounds where relevant. If unsure, say 'I don't know.' Do not hallucinate meanings or readings.",
                },
              ],
            },
            // 🔹 Developer note
            {
              role: "user",
              parts: [
                {
                  text:
                    "[DEVELOPER NOTE] Always provide both kun-yomi and on-yomi. Include at least one example compound if known.",
                },
              ],
            },
            // 🔹 Few-shot example 1
            {
              role: "user",
              parts: [{ text: "What does 水 mean and how is it read?" }],
            },
            {
              role: "model",
              parts: [
                {
                  text:
                    "水 (みず, すい) — meaning: water. Kun-yomi: みず (mizu). On-yomi: スイ (sui). Example compound: 水曜日 (すいようび, Wednesday).",
                },
              ],
            },
            // 🔹 Few-shot example 2
            {
              role: "user",
              parts: [{ text: "Give me a short 3-question quiz about 木 (tree)." }],
            },
            {
              role: "model",
              parts: [
                {
                  text:
                    "Quiz: 1) What is the meaning of 木? 2) Give one on-yomi for 木. 3) What common compound uses 木 and means 'Thursday'?\nAnswers: 1) tree; 2) モク, ボク; 3) 木曜日 (もくようび).",
                },
              ],
            },
            // 🔹 Actual user input
            {
              role: "user",
              parts: [{ text: input }],
            },
          ],
          generationConfig: {
            temperature: 0.0,
            topK: 1,
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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-start min-h-screen bg-black text-gray-100 p-4 sm:p-6"
      style={{ height: "100vh" }}
    >
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
      <header className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-600 font-medium transition-colors"
        >
          Home
        </Link>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-white text-center drop-shadow-lg">
          Kanji AI Assistant
        </h1>
        <div className="w-[48px]" /> {/* spacer */}
      </header>

      <div className="w-full max-w-3xl flex flex-col bg-gray-900 bg-opacity-90 rounded-2xl shadow-xl p-4 sm:p-6 flex-grow min-h-0">
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
                className={`max-w-[85%] sm:max-w-[75%] px-4 py-2 sm:px-5 sm:py-3 rounded-2xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
                style={{ wordWrap: "break-word", fontSize: "0.95rem" }}
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
        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 w-full">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl border-2 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-800 text-white placeholder-gray-400 text-sm sm:text-base"
            placeholder="Ask about a kanji or take a quiz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-xl px-4 py-3 font-semibold shadow-md text-white w-full sm:w-auto"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>

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
