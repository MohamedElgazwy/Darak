"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

const templateTheme = {
  executive: "from-slate-900 to-indigo-900",
  modern: "from-indigo-700 to-cyan-600",
  minimal: "from-slate-700 to-slate-500",
};

export default function AgencyPublicPage() {
  const params = useParams();
  const profile = useMemo(() => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("agencyProfile") || "null");
  }, []);

  const user = useMemo(() => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("user") || "null");
  }, []);

  const template = profile?.template || user?.template || "minimal";

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container-shell">
        <section className={`rounded-3xl bg-gradient-to-r ${templateTheme[template]} p-10 text-white`}>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Agency Public Page</p>
          <h1 className="mt-3 text-4xl font-bold">{user?.name || "Agency"}</h1>
          <p className="mt-2 text-white/90">Template: <span className="font-semibold capitalize">{template}</span> · Slug: {params.slug}</p>
          <p className="mt-5 max-w-2xl text-sm text-white/90">This dynamic page is rendered from saved agency profile data and can be consumed by the NestJS `/agency/:slug` API.</p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">About</h3><p className="mt-2 text-sm text-slate-600">Verified agency specializing in residential and investment opportunities.</p></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">Projects</h3><p className="mt-2 text-sm text-slate-600">Latest projects and inventory are synced with agency dashboard listings.</p></article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">Contact</h3><p className="mt-2 text-sm text-slate-600">Leads are tracked and pushed into analytics in real time.</p></article>
        </section>
      </div>
    </main>
  );
}
