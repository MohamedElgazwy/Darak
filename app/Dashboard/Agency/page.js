"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RoleGuard from "../../features/auth/RoleGuard";
import useSubscription from "../../features/subscription/useSubscription";
import UpgradeModal from "../../features/subscription/UpgradeModal";

const monthlyAnalytics = [
  { month: "Jan", views: 800, leads: 42 },
  { month: "Feb", views: 950, leads: 51 },
  { month: "Mar", views: 1200, leads: 63 },
  { month: "Apr", views: 1400, leads: 72 },
];

export default function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { plan, activeListings, remainingListings } = useSubscription();

  const chartMaxViews = useMemo(() => Math.max(...monthlyAnalytics.map((entry) => entry.views)), []);

  const onConfirmUpgrade = (planId) => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...currentUser, subscriptionPlan: planId }));
    setShowUpgradeModal(false);
    window.location.reload();
  };

  return (
    <RoleGuard allow={["Agency", "Admin"]} fallback={<div className="container-shell pt-28"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">Owners and seekers cannot access agency features.</div></div>}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8 pt-28">
          <aside className="w-72 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
            <div className="mb-6">
              <h2 className="font-bold text-gray-900 leading-tight text-lg">Agency Workspace</h2>
              <p className="text-xs text-gray-500">Subscription-driven SaaS dashboard</p>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-xs uppercase font-bold tracking-wide text-indigo-700">Current Plan</p>
              <p className="mt-1 text-xl font-bold capitalize text-slate-900">{plan.name}</p>
              <p className="mt-2 text-sm text-slate-600">Active listings: {activeListings}</p>
              <p className="text-sm text-slate-600">Remaining: {String(remainingListings)}</p>
              <button onClick={() => setShowUpgradeModal(true)} className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">Upgrade Plan</button>
            </div>

            <nav className="space-y-1 mt-6">
              {[{ id: "overview", label: "Overview" }, { id: "listings", label: "My Listings" }, { id: "analytics", label: "Analytics" }, { id: "settings", label: "Page Settings" }].map((item) => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${activeTab === item.id ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}>{item.label}</button>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[{ title: "Plan", value: plan.name }, { title: "Active Listings", value: String(activeListings) }, { title: "Remaining", value: String(remainingListings) }, { title: "Monthly Leads", value: "72" }].map((stat) => (
                <div key={stat.title} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"><p className="text-sm text-gray-500">{stat.title}</p><p className="text-2xl font-bold text-gray-900">{stat.value}</p></div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
              {activeTab === "overview" && <p className="text-slate-600">Track your plan usage, leads, and listing performance from one place.</p>}

              {activeTab === "listings" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Property Listings</h3>
                    <Link href="/Add-property" className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${String(remainingListings) === "0" ? "bg-gray-200 text-gray-500 pointer-events-none" : "bg-primary-600 text-white hover:bg-primary-700"}`}>+ Add New</Link>
                  </div>
                  {String(remainingListings) === "0" && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">You reached your listing limit. Upgrade plan to publish more listings.</div>}
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">Your published properties will appear here.</div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Views & Leads Analytics</h3>
                  <div className="space-y-4">
                    {monthlyAnalytics.map((entry) => (
                      <div key={entry.month}>
                        <div className="mb-1 flex justify-between text-xs text-slate-500"><span>{entry.month}</span><span>{entry.views} views · {entry.leads} leads</span></div>
                        <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-indigo-600" style={{ width: `${Math.round((entry.views / chartMaxViews) * 100)}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && <p className="text-slate-600">Customize agency page, branding, and sections.</p>}
            </div>
          </main>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} currentPlanId={plan.id} onConfirm={onConfirmUpgrade} />
    </RoleGuard>
  );
}
