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
        "مرحبًا! أنا مساعد MAWA الذكي 🤖\nأخبرني ماذا تبحث عنه؟ (مثال: شقة 3 غرف في المعادي بسعر أقل من 5 مليون)",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const aiResponse = {
        role: "system",
        content: "وجدت لك 3 عقارات مطابقة لطلبك في المعادي:",
        results: [
          {
            id: 1,
            title: "شقة فاخرة في المعادي دجلة",
            price: "4,500,000",
            image: "/images/property1.jpg",
            specs: "3 غرف • 2 حمام • 180م²",
          },
          {
            id: 2,
            title: "دوبلكس حديث بالقرب من الكورنيش",
            price: "5,200,000",
            image: "/images/property5.jpg",
            specs: "4 غرف • 3 حمام • 250م²",
          },
        ],
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[600px] w-full max-w-4xl mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 flex items-center gap-3 flex-row-reverse text-right">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">المساعد الذكي</h3>
          <p className="text-primary-100 text-xs">مدعوم بالبحث الذكي</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50 text-right">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] flex flex-col gap-2 ${
                msg.role === "user" ? "items-start" : "items-end"
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary-600 text-white rounded-bl-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-br-none"
                }`}
              >
                {msg.content}
              </div>

              {/* Results */}
              {msg.results && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 w-full">
                  {msg.results.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => router.push(`/Properties/${prop.id}`)}
                      className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all group text-right"
                    >
                      <div className="h-32 bg-gray-200 rounded-lg mb-3 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                          معاينة الصورة
                        </div>

                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          {prop.price} جنيه
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-primary-600">
                        {prop.title}
                      </h4>

                      <p className="text-xs text-gray-500">{prop.specs}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-end">
            <div className="bg-white p-4 rounded-2xl rounded-br-none border border-gray-100 shadow-sm flex gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSearch} className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اكتب وصف العقار الذي تبحث عنه..."
            className="w-full pr-6 pl-14 py-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all shadow-inner text-right"
          />

          <button
            type="submit"
            className="absolute left-2 p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-lg"
          >
            <svg
              className="w-5 h-5 transform -rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}