"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { companyAboutApi } from "../../services/api"; // ✅ fixed: was ../services/api

export default function CompanyAboutsPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    if (!token) { router.push("/Auth/login"); return; }

    companyAboutApi.list()
      .then((data) => setItems(data.items || []))
      .catch((e) => setError(e?.response?.data?.message || "تعذّر تحميل البيانات"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await companyAboutApi.create(form);
      setShowForm(false);
      setForm({ title: "", content: "" });
      const data = await companyAboutApi.list();
      setItems(data.items || []);
    } catch (e) {
      setError(e?.response?.data?.message || "تعذّر الإضافة");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right">
      <main className="container-shell py-28">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">نبذة عن الشركة</h1>
            <p className="mt-1 text-slate-500">إدارة محتوى صفحة «من نحن»</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary w-fit">
            {showForm ? "إلغاء" : "➕ إضافة نص"}
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {/* Add Form */}
        {showForm && (
          <form onSubmit={handleCreate} className="surface-card mb-6 space-y-4 p-6">
            <h2 className="text-lg font-bold text-slate-900">إضافة نص جديد</h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">العنوان</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border px-3 py-2.5 text-right focus:border-indigo-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">المحتوى</label>
              <textarea
                rows={4}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full rounded-xl border px-3 py-2.5 text-right focus:border-indigo-400 focus:outline-none"
                required
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="surface-card p-16 text-center text-slate-500">جارٍ التحميل...</div>
        ) : items.length === 0 ? (
          <div className="surface-card p-16 text-center text-slate-500">لا توجد محتويات بعد</div>
        ) : (
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={item.id || i} className="surface-card p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="leading-7 text-slate-600">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}