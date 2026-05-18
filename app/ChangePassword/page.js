"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { accountApi } from "../services/api";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordsDoNotMatch =
    formData.confirmPassword.length > 0 && formData.newPassword !== formData.confirmPassword;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.currentPassword) {
      setError("يرجى إدخال كلمة المرور الحالية");
      setLoading(false);
      return;
    }

    if (!formData.newPassword) {
      setError("يرجى إدخال كلمة مرور جديدة");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("تأكيد كلمة المرور لا يتطابق مع كلمة المرور الجديدة");
      setLoading(false);
      return;
    }

    try {
      await accountApi.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setSuccess("تم تغيير كلمة المرور بنجاح");
      setTimeout(() => {
        router.push("/UserProfile");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">تغيير كلمة المرور</h1>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        {success && <p className="text-green-500 mb-3 text-sm">{success}</p>}
        {passwordsDoNotMatch && (
          <p className="text-red-500 mb-3 text-sm">تأكد من تأكيد كلمة المرور الجديدة</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">كلمة المرور الحالية</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="اكتب كلمة المرور الحالية"
              value={formData.currentPassword}
              onChange={handleChange("currentPassword")}
              className="w-full border rounded-xl px-3 py-2"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">كلمة المرور الجديدة</label>
            <input
              type="password"
              name="newPassword"
              placeholder="حدد كلمة مرور جديدة"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              className="w-full border rounded-xl px-3 py-2"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="أعد إدخال كلمة المرور الجديدة"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className="w-full border rounded-xl px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white transition ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "جار التحديث..." : "تحديث كلمة المرور"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/UserProfile")}
            className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
