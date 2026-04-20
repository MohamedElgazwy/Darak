"use client";

import { useState } from "react";

export default function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState("listings");

  // Mock Data
  const stats = [
    {
      title: "Total Listings",
      value: "24",
      icon: "🏠",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Views",
      value: "1.2k",
      icon: "👁️",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Leads",
      value: "85",
      icon: "👥",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rating",
      value: "4.8",
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Smith",
      role: "Sales Agent",
      email: "sarah@agency.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "Manager",
      email: "mike@agency.com",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AP
            </div>
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">
                Agency Pro
              </h2>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "listings", label: "My Listings", icon: "🏢" },
              { id: "team", label: "Team Members", icon: "👥" },
              { id: "analytics", label: "Analytics", icon: "📈" },
              { id: "settings", label: "Page Settings", icon: "⚙️" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  activeTab === item.id
                    ? "bg-primary-50 text-primary-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Top Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
            {activeTab === "listings" && (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Property Listings
                  </h3>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-700 transition-colors">
                    + Add New
                  </button>
                </div>
                {/* Table Placeholder - Can use the Table component from Dashboard */}
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <span className="text-4xl block mb-2">🏢</span>
                  <p className="text-gray-500">
                    Your published properties will appear here.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Team Management
                  </h3>
                  <button className="border border-primary-600 text-primary-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-50 transition-colors">
                    Invite Member
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {teamMembers.map((member) => (
                        <tr
                          key={member.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {member.role}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="animate-fadeIn text-center py-10">
                <p className="text-gray-500">
                  Edit your Company Page design and details here.
                </p>
                <button className="mt-4 text-primary-600 font-semibold hover:underline">
                  Go to Page Builder →
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
