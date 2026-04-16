"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "buy", label: "Buy", value: "sale" },
  { id: "rent", label: "Rent", value: "rent" },
  { id: "commercial", label: "Commercial", value: "commercial" },
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
    <section className="relative overflow-hidden bg-slate-950 pt-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),_transparent_45%)]" />
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="container-shell relative pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.16em] text-slate-200">
            AI-powered real estate
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Find your next property with confidence.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            Browse verified homes, connect directly with owners, and skip broker commissions.
          </p>

          <form onSubmit={handleSearch} className="mt-10 rounded-2xl border border-white/20 bg-white/95 p-3 text-left shadow-2xl shadow-indigo-900/40">
            <div className="mb-3 flex flex-wrap gap-2 px-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Enter city, area, or compound"
                className="h-12 flex-1 rounded-xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-indigo-500"
              />
              <button type="submit" className="btn-primary h-12 px-8">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
