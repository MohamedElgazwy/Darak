"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { accountApi } from "../services/api";

export default function UpdateInfoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCurrentInfo = async () => {
      try {
        const user = await accountApi.getMe();
        setFormData({
          firstName: user?.firstName || user?.FirstName || "",
          lastName: user?.lastName || user?.LastName || "",
        });
      } catch (err) {
        setError(err?.response?.data?.message || "تعذر تحميل بيانات الحساب");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchCurrentInfo();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await accountApi.updateInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setSuccess("تم تعديل البيانات بنجاح");
      setTimeout(() => {
        router.push("/UserProfile");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "حدث خطأ أثناء تعديل البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">تعديل البيانات</h1>

        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
        {success && <p className="text-green-500 mb-3 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">الاسم الأول</label>
            <input
              type="text"
              name="firstName"
              placeholder="أدخل الاسم الأول"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">اسم العائلة</label>
            <input
              type="text"
              name="lastName"
              placeholder="أدخل اسم العائلة"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading || loadingProfile}
            className={`w-full py-2 rounded-xl text-white transition ${
              loading || loadingProfile ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loadingProfile ? "جاري تحميل البيانات..." : loading ? "جاري الحفظ..." : "حفظ التعديلات"}
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
