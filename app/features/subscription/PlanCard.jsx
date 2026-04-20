export default function PlanCard({
  plan,
  selected,
  onSelect,
  currentPlanId,
}) {
  const accents = {
    emerald: "border-emerald-200 bg-emerald-50/60",
    indigo: "border-indigo-300 bg-indigo-50",
    purple: "border-purple-200 bg-purple-50/70",
  };

  const isCurrentPlan = currentPlanId === plan.id;

  return (
    <article
      className={`relative rounded-2xl border p-6 shadow-sm transition ${
        selected ? "ring-2 ring-indigo-500" : ""
      } ${accents[plan.accent]}`}
    >
      {plan.mostPopular && (
        <span className="absolute -top-3 right-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
      <p className="mt-2 text-3xl font-extrabold text-slate-900">
        {plan.price} <span className="text-base font-medium text-slate-500">{plan.currency}/month</span>
      </p>
      <p className="mt-2 text-sm text-slate-600">
        {Number.isFinite(plan.listingLimit)
          ? `${plan.listingLimit} active listings`
          : "Unlimited active listings"}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="text-emerald-600">✓</span> {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.id)}
        disabled={isCurrentPlan}
        className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isCurrentPlan ? "Current Plan" : "Choose Plan"}
      </button>
    </article>
  );
}
