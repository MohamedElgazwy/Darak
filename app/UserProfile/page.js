"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { accountApi } from "../services/api";

const getValue = (user, ...keys) => {
  const key = keys.find((item) => user?.[item] !== undefined && user?.[item] !== null);
  return key ? user[key] : "";
};

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const data = await accountApi.getMe();
      setUser(data);
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "فشل في تحميل بيانات المستخدم");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
          <p className="text-center">جاري تحميل بياناتك...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
          <p className="text-red-500 text-center">{error}</p>
          <button
            onClick={fetchUserInfo}
            className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 mt-4"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">الملف الشخصي</h1>

        {user ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">الاسم الأول</label>
              <input
                type="text"
                value={getValue(user, "firstName", "FirstName")}
                readOnly
                className="w-full border rounded-xl px-3 py-2 bg-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">اسم العائلة</label>
              <input
                type="text"
                value={getValue(user, "lastName", "LastName")}
                readOnly
                className="w-full border rounded-xl px-3 py-2 bg-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">البريد الإلكتروني</label>
              <input
                type="email"
                value={getValue(user, "email", "Email")}
                readOnly
                className="w-full border rounded-xl px-3 py-2 bg-slate-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">رقم الهاتف</label>
              <input
                type="tel"
                value={getValue(user, "phoneNumber", "PhoneNumber", "phone", "Phone")}
                readOnly
                className="w-full border rounded-xl px-3 py-2 bg-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/UpdateInfo")}
                className="py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                تعديل الاسم
              </button>
              <button
                onClick={() => router.push("/ChangePassword")}
                className="py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                تغيير كلمة المرور
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-slate-500">لا توجد بيانات للمستخدم</p>
        )}
      </div>
    </div>
  );
}
