"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Seeker",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      router.push("/Auth/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-11 flex items-center justify-center bg-slate-50 text-right">
      <div className="surface-card p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6">إنشاء حساب</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="الاسم الاول"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <input
            name="name"
            placeholder="الاسم الثانى"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <input
            name="email"
            placeholder="البريد الإلكتروني"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <input
            name="phone"
            placeholder="رقم الهاتف"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="Seeker">مستخدم</option>
            <option value="Agency">شركة</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 text-right"
          />

          <button className="btn-primary w-full">
            {loading ? "جارٍ التسجيل..." : "تسجيل"}
          </button>

        </form>

        <p className="mt-4 text-sm">
          لديك حساب بالفعل؟{" "}
          <a href="/Auth/login" className="text-indigo-600">
            تسجيل الدخول
          </a>
        </p>

      </div>
    </div>
  );
}