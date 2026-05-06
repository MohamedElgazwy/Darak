"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function AgencyDashboardContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("listings");
  const templateId = useMemo(() => {
    const fromUrl = searchParams.get("template");
    if (fromUrl) return fromUrl;
    if (typeof window !== "undefined") {
      return localStorage.getItem("agency-template") || "modern";
    }
    return "modern";
  }, [searchParams]);

  const templateMeta = useMemo(() => {
    const templateMap = {
      modern: { label: "تصميم عصري", className: "from-indigo-50 to-white border-indigo-200" },
      luxury: { label: "تصميم فاخر", className: "from-amber-50 to-white border-amber-200" },
      corporate: { label: "تصميم احترافي", className: "from-slate-100 to-white border-slate-300" },
    };
    return templateMap[templateId] || templateMap.modern;
  }, [templateId]);

  const stats = [
    { title: "إجمالي العقارات", value: "24", icon: "🏠", color: "bg-blue-100 text-blue-600" },
    { title: "عدد المشاهدات", value: "1.2k", icon: "👁️", color: "bg-purple-100 text-purple-600" },
    { title: "العملاء المحتملين", value: "85", icon: "👥", color: "bg-green-100 text-green-600" },
    { title: "التقييم", value: "4.8", icon: "⭐", color: "bg-yellow-100 text-yellow-600" },
  ];

  const teamMembers = [
    { id: 1, name: "سارة أحمد", role: "مسؤولة مبيعات", email: "sarah@agency.com", status: "نشط" },
    { id: 2, name: "محمد علي", role: "مدير", email: "mike@agency.com", status: "نشط" },
  ];

  return (
    <div className="min-h-screen mt-16 bg-gray-50 flex flex-col text-right">

      <div className="flex flex-grow max-w-7xl mx-auto w-full px-4 py-8 gap-8 flex-row-reverse">

        {/* Sidebar */}
        <aside className="w-64 bg-white rounded-2xl border p-6 sticky top-24 h-fit">

          <div className="flex items-center gap-4 mb-8 flex-row-reverse">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              AP
            </div>
            <div>
              <h2 className="font-bold">وكالة برو</h2>
              <p className="text-xs text-gray-500">الخطة المميزة</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "overview", label: "نظرة عامة" },
              { id: "listings", label: "العقارات" },
              { id: "team", label: "فريق العمل" },
              { id: "analytics", label: "التحليلات" },
              { id: "settings", label: "إعدادات الصفحة" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-4 py-3 rounded-lg text-right ${
                  activeTab === item.id
                    ? "bg-indigo-100 font-bold"
                    : "hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className={`mb-6 rounded-2xl border bg-gradient-to-r p-4 ${templateMeta.className}`}>
            <p className="text-sm text-gray-600">التصميم الحالي للوكالة</p>
            <p className="font-bold">{templateMeta.label}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border flex items-center gap-3 flex-row-reverse">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border p-6">

            {/* Listings */}
            {activeTab === "listings" && (
              <div>
                <div className="flex justify-between items-center mb-6 flex-row-reverse">
                  <h3 className="text-xl font-bold">العقارات</h3>
                  <button className="btn-primary">➕ إضافة عقار</button>
                </div>

                <div className="text-center py-12 bg-gray-50 rounded-xl border">
                  <p className="text-gray-500">
                    سيتم عرض العقارات هنا
                  </p>
                </div>
              </div>
            )}

            {/* Team */}
            {activeTab === "team" && (
              <div>
                <div className="flex justify-between items-center mb-6 flex-row-reverse">
                  <h3 className="text-xl font-bold">فريق العمل</h3>
                  <button className="border px-4 py-2 rounded-lg text-indigo-600">
                    إضافة عضو
                  </button>
                </div>

                <table className="w-full text-right">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الدور</th>
                      <th>الحالة</th>
                      <th>إجراء</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teamMembers.map((m) => (
                      <tr key={m.id}>
                        <td>{m.name}</td>
                        <td>{m.role}</td>
                        <td>{m.status}</td>
                        <td>
                          <button className="text-red-500">حذف</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="text-center">
                <p>يمكنك تعديل صفحة الوكالة من هنا</p>
                <button className="mt-4 text-indigo-600">
                  الذهاب لبناء الصفحة →
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}


export default function AgencyDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AgencyDashboardContent />
    </Suspense>
  );
}
