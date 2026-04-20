"use client";

import { useMemo } from "react";
import { getPlanById } from "./plans";
import useAuth from "../auth/useAuth";

export default function useSubscription() {
  const { user, isAgency } = useAuth();

  const subscription = useMemo(() => {
    const rawPlan = user.subscriptionPlan || "basic";
    const plan = getPlanById(rawPlan);
    const activeListings = user.activeListings ?? 0;
    const remainingListings = Number.isFinite(plan.listingLimit)
      ? Math.max(plan.listingLimit - activeListings, 0)
      : "Unlimited";

    return {
      plan,
      activeListings,
      remainingListings,
      canCreateListing:
        !isAgency || !Number.isFinite(plan.listingLimit) || activeListings < plan.listingLimit,
      isAgency,
    };
  }, [isAgency, user.activeListings, user.subscriptionPlan]);

  return subscription;
}
