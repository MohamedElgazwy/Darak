"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SmartSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "مرحبًا! أنا مساعد Darak الذكي 🤖\nأخبرني ماذا تبحث عنه؟ (مثال: شقة 3 غرف في المعادي بسعر أقل من 5 مليون)",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setQuery("");
    setIsTyping(true);

    // TODO: replace this stub with a real API call to your AI search endpoint
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "وجدت لك 2 عقارات مطابقة لطلبك:",
          results: [
            {
              id: 1,
              title: "شقة فاخرة في المعادي دجلة",
              price: "4,500,000",
              specs: "3 غرف • 2 حمام • 180م²",
            },
            {
              id: 2,
              title: "دوبلكس حديث بالقرب من الكورنيش",
              price: "5,200,000",
              specs: "4 غرف • 3 حمام • 250م²",
            },
          ],
        },
      ]);
    }, 1800);
  };

  return (
    <div className="flex h-[600px] w-full max-w-4xl mx-auto flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 flex-row-reverse bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 text-right">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">المساعد الذكي</h3>
          <p className="text-xs text-indigo-200">مدعوم بالبحث الذكي</p>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-grow space-y-6 overflow-y-auto bg-slate-50 p-6 text-right">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
            <div className={`flex max-w-[80%] flex-col gap-2 ${msg.role === "user" ? "items-start" : "items-end"}`}>
              <div
                className={`rounded-2xl p-4 shadow-sm ${
                  msg.role === "user"
                    ? "rounded-bl-none bg-indigo-600 text-white"
                    : "rounded-br-none border border-slate-100 bg-white text-slate-800"
                }`}
              >
                {msg.content}
              </div>

              {msg.results && (
                <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  {msg.results.map((prop) => (
                    <button
                      key={prop.id}
                      onClick={() => router.push(`/Properties/${prop.id}`)}
                      className="rounded-xl border border-slate-200 bg-white p-3 text-right shadow-sm transition hover:shadow-md hover:border-indigo-300"
                    >
                      <div className="mb-2 h-24 rounded-lg bg-slate-100" />
                      <p className="truncate text-sm font-bold text-slate-900">{prop.title}</p>
                      <p className="mt-0.5 text-xs font-semibold text-indigo-600">{prop.price} جنيه</p>
                      <p className="mt-1 text-xs text-slate-400">{prop.specs}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-end">
            <div className="flex gap-1.5 rounded-2xl rounded-br-none border border-slate-100 bg-white p-4 shadow-sm">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  style={{ animationDelay: `${delay}ms` }}
                  className="h-2 w-2 animate-bounce rounded-full bg-slate-300"
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSearch} className="border-t bg-white p-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اكتب وصف العقار الذي تبحث عنه..."
            className="w-full rounded-full bg-slate-100 py-4 pl-14 pr-6 text-right text-slate-900 shadow-inner transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="absolute left-2 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition hover:bg-indigo-700 active:scale-95"
          >
            <svg className="h-5 w-5 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}