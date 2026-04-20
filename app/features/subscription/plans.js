export const SUBSCRIPTION_PLANS = {
  BASIC: {
    id: "basic",
    name: "Basic",
    price: 500,
    currency: "EGP",
    listingLimit: 5,
    features: ["Basic profile", "Contact page"],
    accent: "emerald",
  },
  PRO: {
    id: "pro",
    name: "Pro",
    price: 750,
    currency: "EGP",
    listingLimit: 10,
    features: ["About page", "Projects section", "Priority listing"],
    accent: "indigo",
    mostPopular: true,
  },
  UNLIMITED: {
    id: "unlimited",
    name: "Unlimited",
    price: 1500,
    currency: "EGP",
    listingLimit: Number.POSITIVE_INFINITY,
    features: ["Reviews", "FAQs", "Featured placement", "Advanced analytics"],
    accent: "purple",
  },
};

export const PLAN_LIST = Object.values(SUBSCRIPTION_PLANS);

export function getPlanById(planId = "basic") {
  return PLAN_LIST.find((plan) => plan.id === String(planId).toLowerCase()) || SUBSCRIPTION_PLANS.BASIC;
}
