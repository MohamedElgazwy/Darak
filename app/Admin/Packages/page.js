"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { packageApi } from "../../services/api"; // ✅ fixed: was ../services/api

const featureIcons = ["🏠", "📸", "📞", "📋", "🏗️", "⭐", "❓"];

export default function PackagesPage() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("authToken") || localStorage.getItem("token")
      : null;
    if (!token) { router.push("/Auth/login"); return; }

    packageApi.list()
      .then((data) => setPackages(data.items || []))
      .catch((e) => setError(e?.response?.data?.message || "تعذّر تحميل الباقات"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-right">
      <main className="container-shell py-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">الباقات</h1>
          <p className="mt-1 text-slate-500">عرض وإدارة باقات الاشتراك</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {packages.length === 0 && !error ? (
          <div className="surface-card p-16 text-center text-slate-500">لا توجد باقات متاحة</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => {
              const id = pkg.id || pkg.packageId;
              const features = Array.isArray(pkg.features)
                ? pkg.features
                : Object.entries(pkg)
                    .filter(([k]) => !["id","packageId","name","price","nameAr"].includes(k))
                    .map(([k, v]) => `${k}: ${v}`);

              return (
                <div
                  key={id}
                  onClick={() => setSelected(selected?.id === id ? null : pkg)}
                  className={`surface-card cursor-pointer p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                    selected?.id === id ? "ring-2 ring-indigo-500" : ""
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between flex-row-reverse">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 font-bold text-sm">
                      #{id}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {pkg.nameAr || pkg.name || `باقة ${id}`}
                    </h3>
                  </div>

                  {pkg.price !== undefined && (
                    <p className="mb-4 text-2xl font-bold text-indigo-600">
                      {Number(pkg.price).toLocaleString()} جنيه
                      {pkg.duration && <span className="mr-1 text-sm font-medium text-slate-400">/ {pkg.duration}</span>}
                    </p>
                  )}

                  <ul className="space-y-2">
                    {features.slice(0, 5).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 flex-row-reverse text-sm text-slate-600">
                        <span className="text-emerald-500">✓</span>
                        {String(f)}
                      </li>
                    ))}
                  </ul>

                  {selected?.id === id && (
                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-semibold text-slate-500">البيانات الكاملة</p>
                      <pre className="overflow-x-auto text-xs text-slate-700 whitespace-pre-wrap">
                        {JSON.stringify(pkg, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}