"use client";

import { useState } from "react";
import { PLAN_LIST } from "./plans";
import PlanCard from "./PlanCard";

export default function UpgradeModal({ isOpen, onClose, currentPlanId = "basic", onConfirm }) {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Upgrade your agency plan</h3>
            <p className="mt-1 text-sm text-slate-600">
              You reached your active listing limit. Upgrade now to keep publishing properties.
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600">
            Close
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PLAN_LIST.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan === plan.id}
              onSelect={setSelectedPlan}
              currentPlanId={currentPlanId}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onConfirm(selectedPlan)}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Confirm Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
