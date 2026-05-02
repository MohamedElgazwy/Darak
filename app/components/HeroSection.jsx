"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const tabs = [
  { id: "buy", label: "شراء", value: "sale" },
  { id: "rent", label: "إيجار", value: "rent" },
  // can be added.
  // { id: "commercial", label: "تجاري", value: "commercial" },
];

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");

  const handleSearch = (e) => {
    e.preventDefault();
    const target = tabs.find((tab) => tab.id === activeTab);
    router.push(`/Search?type=${target?.value || "sale"}`);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/home.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-shell flex h-full items-center justify-center">
        <div className="max-w-4xl text-center">

          {/* Badge */}
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs tracking-[0.16em] backdrop-blur">
            عقارات مدعومة بالذكاء الاصطناعي
          </p>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            ابحث عن عقارك القادم بثقة
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
            تصفح عقارات موثوقة، تواصل مباشرة مع المالكين، وتجنب عمولات الوسطاء.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl shadow-2xl"
          >

            {/* Tabs */}
            <div className="mb-3 flex flex-wrap gap-2 px-1 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="أدخل المدينة أو المنطقة أو الكمبوند"
                className="h-12 flex-1 rounded-xl border border-white/20 bg-white/80 px-4 text-slate-900 outline-none focus:border-indigo-500 text-right"
              />

              <button type="submit" className="btn-primary h-12 px-8">
                بحث
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}