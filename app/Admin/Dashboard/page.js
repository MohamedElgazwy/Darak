"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "15,230",
      change: "+12%",
      icon: "👥",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "العقارات النشطة",
      value: "4,300",
      change: "+5%",
      icon: "🏠",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "قيد المراجعة",
      value: "45",
      change: "عاجل",
      icon: "⏳",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "إجمالي الأرباح",
      value: "250k",
      change: "+18%",
      icon: "💰",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const [listings, setListings] = useState([
    {
      id: 101,
      title: "فيلا مشمسة في الرحاب",
      owner: "أحمد محسن",
      type: "فيلا",
      price: "8,500,000",
      status: "قيد المراجعة",
      date: "2024-02-10",
    },
    {
      id: 102,
      title: "مكتب في العاصمة الجديدة",
      owner: "Capital Real Estate",
      type: "تجاري",
      price: "45,000 /شهريًا",
      status: "قيد المراجعة",
      date: "2024-02-09",
    },
    {
      id: 103,
      title: "دوبلكس في الزمالك",
      owner: "سارة نبيل",
      type: "شقة",
      price: "12,000,000",
      status: "منشور",
      date: "2024-02-08",
    },
  ]);

  const handleAction = (id, action) => {
    if (confirm(`هل أنت متأكد من ${action === "approve" ? "قبول" : "رفض"} هذا الإعلان؟`)) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: action === "approve" ? "منشور" : "مرفوض",
              }
            : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-right">

      <div className="flex flex-1 max-w-7xl mx-auto mt-15 w-full px-4 py-8 gap-6 flex-row-reverse">

        {/* Sidebar */}
        <aside className="w-64">
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden sticky top-24">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="font-bold text-lg">لوحة التحكم</h2>
              <p className="text-xs text-gray-500">صلاحيات المشرف</p>
            </div>

            <nav className="p-4 space-y-1">
              {[
                { id: "overview", label: "نظرة عامة", icon: "📊" },
                { id: "listings", label: "مراجعة العقارات", icon: "🛡️", badge: 45 },
                { id: "users", label: "إدارة المستخدمين", icon: "👥" },
                { id: "verifications", label: "التحقق", icon: "✅" },
                { id: "reports", label: "التقارير", icon: "⚠️" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm ${
                    activeTab === item.id
                      ? "bg-slate-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    {item.label}
                  </div>

                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border">
                    <div className="flex justify-between mb-4">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <span className="text-xs font-bold">
                        {stat.change}
                      </span>
                    </div>

                    <h3 className="text-sm text-gray-500">{stat.title}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border">
                <h3 className="font-bold mb-4">تحليلات النظام</h3>
                <div className="h-64 bg-gray-50 flex items-center justify-center">
                  [ مخطط البيانات ]
                </div>
              </div>

            </div>
          )}

          {/* Listings */}
          {activeTab === "listings" && (
            <div className="bg-white rounded-2xl border overflow-hidden">

              <div className="p-6 border-b flex justify-between flex-row-reverse">
                <div>
                  <h3 className="font-bold text-lg">مراجعة العقارات</h3>
                  <p className="text-sm text-gray-500">
                    مراجعة وقبول أو رفض الإعلانات
                  </p>
                </div>
              </div>

              <table className="w-full text-sm text-right">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">العقار</th>
                    <th className="px-6 py-4">المالك</th>
                    <th className="px-6 py-4">السعر</th>
                    <th className="px-6 py-4">الحالة</th>
                    <th className="px-6 py-4">الإجراءات</th>
                  </tr>
                </thead>

                <tbody>
                  {listings.map((item) => (
                    <tr key={item.id} className="border-t">

                      <td className="px-6 py-4">
                        <p className="font-bold">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.type} • {item.date}
                        </p>
                      </td>

                      <td className="px-6 py-4">{item.owner}</td>

                      <td className="px-6 py-4">
                        {item.price} جنيه
                      </td>

                      <td className="px-6 py-4">{item.status}</td>

                      <td className="px-6 py-4">
                        {item.status === "قيد المراجعة" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(item.id, "approve")}
                              className="bg-green-600 text-white px-3 py-1 rounded"
                            >
                              قبول
                            </button>

                            <button
                              onClick={() => handleAction(item.id, "reject")}
                              className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                              رفض
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            عرض التفاصيل
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}