"use client";

import { useState } from "react";
import Link from "next/link";
import useAuth from "../features/auth/useAuth";
import PropertyBadge from "../features/property/PropertyBadge";

const userProperties = [
  { id: 1, title: "Modern Apartment in New Cairo", type: "sale", ownerType: "owner", price: 250000, status: "published", views: 1247, inquiries: 23, image: "/images/property1.jpg" },
  { id: 2, title: "Villa in Sheikh Zayed", type: "rent", ownerType: "agency", price: 15000, status: "pending", views: 411, inquiries: 8, image: "/images/property2.jpg" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, isOwner, isAgency } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
              <p className="text-slate-500 mt-1">Manage your properties and performance.</p>
            </div>
            <Link href="/Add-property" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/40 hover:bg-indigo-700 transition-all">Add New Property</Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit sticky top-28">
              <h3 className="font-bold text-slate-900 text-lg">{user.name}</h3>
              <p className="text-sm text-slate-500">{user.email}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-indigo-700">Current Role: {user.role}</p>

              <nav className="mt-6 space-y-1">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "properties", label: "My Properties" },
                  { id: "profile", label: "Settings" },
                ].map((item) => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full text-left rounded-lg px-3 py-2 ${activeTab === item.id ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-600"}`}>
                    {item.label}
                  </button>
                ))}
              </nav>

              {(isOwner || !isAgency) && (
                <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                  <p className="text-sm font-semibold text-indigo-900">Need agency tools?</p>
                  <p className="mt-1 text-xs text-indigo-700">Upgrade to Agency to unlock subscriptions, branding, analytics, and page builder.</p>
                  <Link href="/Auth" className="mt-3 inline-block rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">Upgrade to Agency</Link>
                </div>
              )}
            </aside>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-xl font-bold mb-5">Overview</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="card"><p className="text-sm text-slate-500">Listings</p><p className="text-2xl font-bold">{userProperties.length}</p></div>
                    <div className="card"><p className="text-sm text-slate-500">Listing Type</p><p className="text-2xl font-bold">{isAgency ? "Agency" : "Owner"}</p></div>
                    <div className="card"><p className="text-sm text-slate-500">Leads</p><p className="text-2xl font-bold">31</p></div>
                  </div>
                </div>
              )}

              {activeTab === "properties" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">My Properties</h2>
                  <div className="space-y-4">
                    {userProperties.map((prop) => (
                      <div key={prop.id} className="card flex flex-col md:flex-row gap-4 md:items-center">
                        <img src={prop.image} alt={prop.title} className="w-full md:w-28 h-20 object-cover rounded-md" />
                        <div>
                          <div className="font-bold text-slate-900">{prop.title}</div>
                          <div className="mt-1 flex items-center gap-2">
                            <PropertyBadge ownerType={prop.ownerType} />
                            <span className="text-xs text-slate-500">{prop.views} views · {prop.inquiries} leads</span>
                          </div>
                        </div>
                        <div className="md:ml-auto font-semibold text-slate-900">{prop.type === "sale" ? `${prop.price.toLocaleString()} EGP` : `${prop.price} EGP /mo`}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "profile" && <p className="text-slate-500">Profile settings will appear here.</p>}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
