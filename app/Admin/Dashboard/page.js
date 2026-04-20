"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // بيانات وهمية للإحصائيات (View Statistics Sequence)
  const stats = [
    {
      title: "Total Users",
      value: "15,230",
      change: "+12%",
      icon: "👥",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Listings",
      value: "4,300",
      change: "+5%",
      icon: "🏠",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending Review",
      value: "45",
      change: "Urgent",
      icon: "⏳",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Total Revenue",
      value: "250k",
      change: "+18%",
      icon: "💰",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  // بيانات وهمية للإعلانات (Manage Announcements Sequence)
  const [listings, setListings] = useState([
    {
      id: 101,
      title: "Sunny Villa in Rehab City",
      owner: "Ahmed Mohsen",
      type: "Villa",
      price: "8,500,000",
      status: "Pending",
      date: "2024-02-10",
      image: "/images/property1.jpg",
    },
    {
      id: 102,
      title: "Office Space in New Capital",
      owner: "Capital Real Estate",
      type: "Commercial",
      price: "45,000 /mo",
      status: "Pending",
      date: "2024-02-09",
      image: "/images/property6.jpg",
    },
    {
      id: 103,
      title: "Duplex in Zamalek",
      owner: "Sara Nabil",
      type: "Apartment",
      price: "12,000,000",
      status: "Published",
      date: "2024-02-08",
      image: "/images/property4.jpg",
    },
  ]);

  // محاكاة عمليات الموافقة والرفض
  const handleAction = (id, action) => {
    // هنا يتم الاتصال بـ API: Admin Controller -> Announcement Service
    if (confirm(`Are you sure you want to ${action} this listing?`)) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: action === "approve" ? "Published" : "Rejected",
              }
            : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-6">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Admin Panel</h2>
              <p className="text-xs text-gray-500">Super Admin Access</p>
            </div>
            <nav className="p-4 space-y-1">
              {[
                { id: "overview", label: "Overview", icon: "📊" },
                { id: "listings", label: "Moderation", icon: "🛡️", badge: 45 },
                { id: "users", label: "User Management", icon: "👥" },
                { id: "verifications", label: "Verifications", icon: "✅" },
                { id: "reports", label: "Reports & Logs", icon: "⚠️" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                    activeTab === item.id
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}
                      >
                        {stat.icon}
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-lg ${
                          stat.change === "Urgent"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">
                      {stat.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Activity Mockup */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  System Health & Traffic
                </h3>
                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-400">
                  <span>[ Analytics Chart Component Placeholder ]</span>
                </div>
              </div>
            </div>
          )}

          {/* Moderation Tab (Manage Announcements) */}
          {activeTab === "listings" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fadeIn">
              <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Property Moderation
                  </h3>
                  <p className="text-sm text-gray-500">
                    Review and approve pending listings.
                  </p>
                </div>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>Published</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Property
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Owner
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {listings.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {/* Placeholder Image */}
                              <div className="w-full h-full bg-gray-300"></div>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.type} • {item.date}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-700 font-bold">
                              {item.owner[0]}
                            </div>
                            <span className="text-gray-700">{item.owner}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {item.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : item.status === "Published"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.status === "Pending" ? (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleAction(item.id, "approve")}
                                className="bg-green-600 text-white hover:bg-green-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(item.id, "reject")}
                                className="bg-red-600 text-white hover:bg-red-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <button className="text-gray-400 hover:text-gray-600 text-xs font-medium">
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-100 flex justify-center">
                <button className="text-sm text-gray-500 hover:text-primary-600 font-medium">
                  View All Listings →
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "overview" && activeTab !== "listings" && (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400 animate-fadeIn">
              <span className="text-4xl mb-4">🚧</span>
              <p>Module under development</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
