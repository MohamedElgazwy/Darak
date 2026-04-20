"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleGuard from "../../features/auth/RoleGuard";
import { AGENCY_TEMPLATES } from "../../features/agency/templateCatalog";

export default function AgencyPageBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreatePage = async () => {
    if (!selectedTemplate) return;
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const agencySlug = (currentUser.name || "agency").toLowerCase().replace(/\s+/g, "-");
    const nextUser = {
      ...currentUser,
      template: selectedTemplate.id,
      agencySlug,
      templatePurchased: true,
    };

    localStorage.setItem("user", JSON.stringify(nextUser));
    localStorage.setItem(
      "agencyProfile",
      JSON.stringify({
        id: currentUser.agencyProfileId || "agp_demo_01",
        userId: currentUser.id,
        plan: currentUser.subscriptionPlan || "basic",
        template: selectedTemplate.id,
        listingsCount: currentUser.activeListings || 0,
        verified: true,
      })
    );

    setLoading(false);
    router.push(`/agency/${agencySlug}`);
  };

  return (
    <RoleGuard allow={["Agency", "Admin"]} fallback={<div className="container-shell pt-28"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">Only agencies can build public agency pages.</div></div>}>
      <div className="min-h-screen bg-gray-50 py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Agency Page Builder</h1>
            <p className="mt-2 text-slate-600">Choose one template and pay once. Template pricing is separate from subscription plans.</p>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGENCY_TEMPLATES.map((template) => (
                <div key={template.id} onClick={() => setSelectedTemplate(template)} className={`rounded-2xl border-2 bg-white p-6 cursor-pointer transition ${selectedTemplate?.id === template.id ? "border-primary-600 ring-2 ring-primary-100" : "border-slate-200 hover:border-slate-300"}`}>
                  <div className="h-36 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm">Template Preview</div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{template.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{template.headline}</p>
                  <p className="mt-3 text-indigo-700 font-bold">{template.price} EGP <span className="font-normal text-slate-500 text-sm">one-time</span></p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">{template.features.map((feat) => <li key={feat}>• {feat}</li>)}</ul>
                </div>
              ))}
            </div>
          )}

          {step === 2 && selectedTemplate && (
            <div className="max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-slate-900">Confirm template purchase</h2>
              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">{selectedTemplate.name}</p>
                <p className="text-slate-600 text-sm mt-1">Template payment is independent from monthly subscription billing.</p>
                <p className="mt-2 text-lg font-bold text-indigo-700">{selectedTemplate.price} EGP</p>
              </div>

              <button onClick={handleCreatePage} disabled={loading} className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
                {loading ? "Processing payment..." : "Pay & launch agency page"}
              </button>
              <button onClick={() => setStep(1)} className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700">Choose another template</button>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 text-right">
              <button onClick={() => selectedTemplate && setStep(2)} disabled={!selectedTemplate} className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Continue</button>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
