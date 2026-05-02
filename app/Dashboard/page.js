"use client";

import { useState } from "react";
import { useTheme } from "../components/ThemeProvider";

const userData = {
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "+20 123 456 7890",
  joined: "يناير 2024",
  userType: "seller",
  verified: true,
};

const userProperties = [
  {
    id: 1,
    title: "شقة حديثة في القاهرة الجديدة",
    type: "sale",
    price: 250000,
    status: "published",
    views: 1247,
    inquiries: 23,
    date: "2024-01-15",
    image: "/images/property1.jpg",
  },
];

const statsData = {
  totalProperties: 3,
  published: 1,
  totalViews: 1247,
  totalInquiries: 23,
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-right">

      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row-reverse md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">لوحة التحكم</h1>
              <p className="text-slate-500 mt-1">
                إدارة العقارات ومتابعة الأداء
              </p>
            </div>

            <button className="btn-primary flex items-center gap-2">
              ➕ إضافة عقار
            </button>
          </div>

          <div className="flex flex-col lg:flex-row-reverse gap-8">

            {/* Sidebar */}
            <aside className="lg:w-72">
              <div className="bg-white p-6 rounded-2xl border sticky top-28">

                {/* User */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    {userData.name[0]}
                  </div>
                  <h3 className="mt-3 font-bold">{userData.name}</h3>
                  <p className="text-sm text-gray-500">{userData.email}</p>

                  {userData.verified && (
                    <span className="text-xs text-green-600 mt-2 block">
                      ✔ حساب موثق
                    </span>
                  )}
                </div>

                {/* Nav */}
                <nav className="space-y-2">
                  {[
                    { id: "overview", label: "نظرة عامة" },
                    { id: "properties", label: "عقاراتي" },
                    { id: "inquiries", label: "الطلبات" },
                    { id: "profile", label: "الإعدادات" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-right px-4 py-2 rounded ${
                        activeTab === item.id
                          ? "bg-indigo-100 font-bold"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <section className="flex-1 bg-white p-6 rounded-2xl border">

              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">نظرة عامة</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="card">
                      إجمالي العقارات: {statsData.totalProperties}
                    </div>
                    <div className="card">
                      المنشورة: {statsData.published}
                    </div>
                    <div className="card">
                      المشاهدات: {statsData.totalViews}
                    </div>
                    <div className="card">
                      الطلبات: {statsData.totalInquiries}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "properties" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">عقاراتي</h2>

                  {userProperties.map((prop) => (
                    <div key={prop.id} className="border p-4 rounded mb-3 flex flex-row-reverse gap-4">
                      <img src={prop.image} className="w-24 h-16 object-cover rounded" />

                      <div>
                        <h3 className="font-bold">{prop.title}</h3>
                        <p className="text-sm text-gray-500">
                          {prop.views} مشاهدة
                        </p>
                      </div>

                      <div className="mr-auto font-bold">
                        {prop.price} جنيه
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "inquiries" && (
                <p>لا توجد طلبات حتى الآن</p>
              )}

              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">إعدادات الحساب</h2>
                  <p className="text-slate-500 mb-4">اختر التصميم الذي يناسبك وسيتم تطبيقه على كل الصفحات.</p>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { id: "standard", label: "قياسي" },
                      { id: "ocean", label: "أزرق" },
                      { id: "sunset", label: "دافئ" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        className={`border rounded-xl p-4 text-right transition ${
                          theme === option.id
                            ? "border-indigo-600 bg-indigo-50 font-bold"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}