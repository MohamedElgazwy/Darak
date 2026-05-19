"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "../../services/api"; // ✅ fixed: was ../services/api

const roleColors = {
  Admin: "bg-red-100 text-red-700",
  User: "bg-slate-100 text-slate-700",
  Company: "bg-indigo-100 text-indigo-700",
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userApi.listUsers();
      setUsers(data.items || []);
    } catch (err) {
      setError(err?.response?.data?.message || "تعذّر تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("authToken") || localStorage.getItem("token")
      : null;
    if (!token) { router.push("/Auth/login"); return; }
    fetchUsers();
  }, [router, fetchUsers]);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.firstName || u.first_name || "").toLowerCase().includes(q) ||
      (u.lastName || u.last_name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-right">
      <main className="container-shell py-28">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">إدارة المستخدمين</h1>
            <p className="mt-1 text-slate-500">عرض وإدارة جميع حسابات المستخدمين</p>
          </div>
          <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm border">
            {users.length} مستخدم
          </span>
        </div>

        <div className="surface-card overflow-hidden">
          {/* Search Bar */}
          <div className="border-b bg-white p-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو البريد الإلكتروني..."
              className="w-full max-w-sm rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-right focus:border-indigo-400 focus:outline-none"
            />
          </div>

          {loading ? (
            <div className="p-16 text-center text-slate-500">جارٍ تحميل المستخدمين...</div>
          ) : error ? (
            <div className="p-16 text-center">
              <p className="text-red-600">{error}</p>
              <button onClick={fetchUsers} className="btn-primary mt-4">إعادة المحاولة</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-slate-500">لا توجد نتائج</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-4 text-right font-semibold">المستخدم</th>
                    <th className="px-5 py-4 text-right font-semibold">البريد الإلكتروني</th>
                    <th className="px-5 py-4 text-right font-semibold">الأدوار</th>
                    <th className="px-5 py-4 text-right font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => {
                    const id = u.id || u.userId;
                    const firstName = u.firstName || u.first_name || "";
                    const lastName = u.lastName || u.last_name || "";
                    const roles = Array.isArray(u.roles) ? u.roles : [];
                    return (
                      <tr key={id} className="border-t transition hover:bg-slate-50/60">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                              {firstName?.[0] || "؟"}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {firstName} {lastName}
                              </p>
                              <p className="text-xs text-slate-400">#{String(id).slice(0, 8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-600 dir-ltr text-left">{u.email}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1 justify-end">
                            {roles.length === 0 ? (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">—</span>
                            ) : (
                              roles.map((r) => (
                                <span
                                  key={r}
                                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleColors[r] || "bg-slate-100 text-slate-600"}`}
                                >
                                  {r}
                                </span>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => userApi.toggleUserStatus(id).then(fetchUsers)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                          >
                            تغيير الحالة
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}