"use client";

import { useState } from "react";

// Mock data
const userData = {
  name: "Ahmed Mohamed",
  email: "ahmed@example.com",
  phone: "+20 123 456 7890",
  joined: "January 2024",
  userType: "seller",
  verified: true,
};

const userProperties = [
  {
    id: 1,
    title: "Modern Apartment in New Cairo",
    type: "sale",
    price: 250000,
    status: "published",
    views: 1247,
    inquiries: 23,
    date: "2024-01-15",
    image: "/images/property1.jpg",
  },
  {
    id: 2,
    title: "Villa in Sheikh Zayed",
    type: "rent",
    price: 15000,
    status: "pending",
    views: 0,
    inquiries: 0,
    date: "2024-01-20",
    image: "/images/property2.jpg",
  },
  {
    id: 3,
    title: "Studio in Downtown",
    type: "sale",
    price: 120000,
    status: "draft",
    views: 0,
    inquiries: 0,
    date: "2024-01-18",
    image: "/images/property3.jpg",
  },
];

const statsData = {
  totalProperties: 3,
  published: 1,
  pending: 1,
  draft: 1,
  totalViews: 1247,
  totalInquiries: 23,
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Helper for Status Badges with Professional Colors
  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/20",
      pending: "bg-amber-100 text-amber-700 ring-1 ring-amber-600/20",
      draft: "bg-slate-100 text-slate-600 ring-1 ring-slate-500/20",
      rejected: "bg-red-100 text-red-700 ring-1 ring-red-600/20",
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
          styles[status] || styles.draft
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Manage your properties and view performance.
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/40 hover:bg-indigo-700 transition-all flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add New Property
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-28">
                {/* User Profile Card */}
                <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-slate-100">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
                    {userData.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {userData.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-2">
                    {userData.email}
                  </p>
                  {userData.verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Verified Seller
                    </span>
                  )}
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                  {[
                    { id: "overview", label: "Overview", icon: "📊" },
                    { id: "properties", label: "My Properties", icon: "🏠" },
                    { id: "inquiries", label: "Inquiries", icon: "💬" },
                    { id: "profile", label: "Settings", icon: "⚙️" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === item.id
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="ml-2 flex-1 text-sm text-left">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content area */}
            <section className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                {activeTab === "overview" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="card">
                        <div className="text-sm muted">Total Properties</div>
                        <div className="text-2xl font-bold">
                          {statsData.totalProperties}
                        </div>
                      </div>
                      <div className="card">
                        <div className="text-sm muted">Published</div>
                        <div className="text-2xl font-bold">
                          {statsData.published}
                        </div>
                      </div>
                      <div className="card">
                        <div className="text-sm muted">Total Views</div>
                        <div className="text-2xl font-bold">
                          {statsData.totalViews}
                        </div>
                      </div>
                      <div className="card">
                        <div className="text-sm muted">Inquiries</div>
                        <div className="text-2xl font-bold">
                          {statsData.totalInquiries}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "properties" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">My Properties</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProperties.map((prop) => (
                        <div
                          key={prop.id}
                          className="card flex gap-4 items-center"
                        >
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="w-28 h-20 object-cover rounded-md"
                          />
                          <div>
                            <div className="font-bold">{prop.title}</div>
                            <div className="text-sm muted">
                              {prop.type} • {prop.status} • {prop.views} views
                            </div>
                          </div>
                          <div className="ml-auto font-semibold">
                            {prop.type === "sale"
                              ? prop.price.toLocaleString() + " EGP"
                              : prop.price + " /mo"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "inquiries" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Inquiries</h2>
                    <p className="muted">No inquiries yet.</p>
                  </div>
                )}

                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                    <p className="muted">Profile settings will appear here.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
