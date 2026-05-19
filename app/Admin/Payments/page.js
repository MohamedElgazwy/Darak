"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { paymentApi } from "../../services/api"; // ✅ fixed: was ../services/api

export default function PaymentsPage() {
  const router = useRouter();
  const [subscriptionId, setSubscriptionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fixed: auth guard in useEffect (not component body) to avoid SSR crash
  useEffect(() => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    if (!token) router.push("/Auth/login");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subscriptionId.trim()) {
      setError("يرجى إدخال رقم الاشتراك");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await paymentApi.confirmCash({ subscriptionId: Number(subscriptionId) });
      setSuccess("تم تأكيد الدفع النقدي بنجاح ✓");
      setSubscriptionId("");
    } catch (err) {
      setError(err?.response?.data?.message || "تعذّر تأكيد الدفع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-right">
      <main className="container-shell py-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-950">تأكيد الدفع النقدي</h1>
          <p className="mt-1 text-slate-500">أدخل رقم الاشتراك لتأكيد الدفع يدوياً</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Instructions */}
          <div className="surface-card p-8">
            <h2 className="mb-4 text-xl font-bold text-slate-900">كيفية الاستخدام</h2>
            <ol className="space-y-3 text-slate-600" dir="rtl">
              {[
                "احصل على رقم الاشتراك من المستخدم أو من لوحة إدارة الاشتراكات.",
                "أدخل الرقم في الحقل المخصص على اليمين.",
                "اضغط على زر «تأكيد الدفع» لتفعيل الاشتراك.",
                "سيظهر رسالة نجاح عند الاكتمال.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 flex-row-reverse">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Form */}
          <div className="surface-card p-8">
            <h2 className="mb-6 text-xl font-bold text-slate-900">تأكيد الدفع</h2>

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  رقم الاشتراك
                </label>
                <input
                  type="number"
                  value={subscriptionId}
                  onChange={(e) => { setSubscriptionId(e.target.value); setError(""); setSuccess(""); }}
                  placeholder="أدخل رقم الاشتراك..."
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-right text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? "جارٍ التأكيد..." : "تأكيد الدفع النقدي"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}