"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      localStorage.setItem("token", "fake-token");
      const agencyTemplate = searchParams.get("template");
      const isNewAgency = searchParams.get("newAgency") === "1";

      if (agencyTemplate) {
        localStorage.setItem("agency-template", agencyTemplate);
      }

      if (isNewAgency) {
        router.push(`/Dashboard/Agency?template=${agencyTemplate || "modern"}`);
        return;
      }

      router.push("/Dashboard");
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-right">
      <div className="surface-card p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6">تسجيل الدخول</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <button className="btn-primary w-full">
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>

        </form>

        <p className="mt-4 text-sm">
          ليس لديك حساب؟{" "}
          <a href="/Auth/register" className="text-indigo-600">
            إنشاء حساب
          </a>
        </p>

      </div>
    </div>
  );
}
