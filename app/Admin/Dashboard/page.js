"use client";

import { useState } from "react";

const subscriptions = [
  { agency: "Nile Estates", plan: "Pro", amount: 750, status: "Active" },
  { agency: "Urban Gate", plan: "Basic", amount: 500, status: "Active" },
  { agency: "Prime Axis", plan: "Unlimited", amount: 1500, status: "Past due" },
];

const agencyApprovals = [
  { id: 1, name: "Capital Brokers", docs: "Trade License", status: "Pending" },
  { id: 2, name: "Blue Delta", docs: "Tax Card", status: "Pending" },
];

const fakeListings = [
  { id: 701, title: "Unreal Price Villa", reason: "Suspicious pricing", status: "Flagged" },
  { id: 702, title: "Duplicate apartment", reason: "Duplicate content", status: "Flagged" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-6 pt-28">
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-gray-100 bg-gray-50"><h2 className="font-bold text-gray-800 text-lg">Admin Panel</h2><p className="text-xs text-gray-500">Subscriptions & moderation</p></div>
            <nav className="p-4 space-y-1">
              {["overview", "subscriptions", "agencies", "listings", "revenue"].map((item) => (
                <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${activeTab === item ? "bg-slate-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}>{item[0].toUpperCase() + item.slice(1)}</button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0 space-y-6">
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-4 gap-4">
              {[{ label: "MRR", value: "241,000 EGP" }, { label: "Active Agencies", value: "178" }, { label: "Pending Approvals", value: "12" }, { label: "Flagged Listings", value: "26" }].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{item.label}</p><p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p></div>
              ))}
            </div>
          )}

          {activeTab === "subscriptions" && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Manage Subscriptions</h3>
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div key={sub.agency} className="rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                    <div><p className="font-semibold text-slate-900">{sub.agency}</p><p className="text-sm text-slate-500">{sub.plan} plan</p></div>
                    <div className="text-right"><p className="font-bold text-slate-900">{sub.amount} EGP/mo</p><p className="text-xs text-slate-500">{sub.status}</p></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "agencies" && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Approve / Reject Agencies</h3>
              <div className="space-y-3">
                {agencyApprovals.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                    <div><p className="font-semibold text-slate-900">{item.name}</p><p className="text-sm text-slate-500">{item.docs}</p></div>
                    <div className="flex gap-2"><button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">Approve</button><button className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">Reject</button></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "listings" && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Flag Fake Listings</h3>
              <div className="space-y-3">
                {fakeListings.map((item) => (
                  <div key={item.id} className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center justify-between">
                    <div><p className="font-semibold text-slate-900">{item.title}</p><p className="text-sm text-amber-800">{item.reason}</p></div>
                    <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold">Take Action</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "revenue" && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900">Revenue Analytics</h3>
              <p className="mt-2 text-sm text-slate-600">Subscription revenue from Basic, Pro, and Unlimited plans with churn and net growth tracking.</p>
              <div className="mt-4 h-52 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400">[ Revenue chart placeholder ]</div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
