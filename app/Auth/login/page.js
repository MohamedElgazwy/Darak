"use client";

import { Suspense, useState } from "react";
import { authApi } from "../../services/api";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authApi.login(formData);

      const token = result?.token || result?.accessToken || result?.jwtToken;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("authToken", token);
      }

      if (result?.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      const template = searchParams.get("template");
      const isNewAgency = searchParams.get("newAgency") === "1";

      if (template) {
        localStorage.setItem("agency-template", template);
      }

      if (isNewAgency) {
        router.push(
          `/Dashboard/Agency?template=${template || "modern"}`
        );
        return;
      }

      router.push("/Dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-slate-50"
    >
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-6 text-center">
          تسجيل الدخول
        </h1>

        {error && (
          <p className="text-red-500 mb-3 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white transition ${
              loading
                ? "bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>

        </form>

        <p className="mt-4 text-sm text-center">
          ليس لديك حساب؟{" "}
          <a
            href="/Auth/register"
            className="text-indigo-600"
          >
            إنشاء حساب
          </a>
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}