const badgeByOwner = {
  owner: {
    listing: "Owner Listing",
    verification: "Private Owner",
    className: "bg-slate-100 text-slate-700",
  },
  agency: {
    listing: "Agency Listing",
    verification: "Verified Agency",
    className: "bg-indigo-100 text-indigo-700",
  },
};

export default function PropertyBadge({ ownerType = "owner", variant = "listing" }) {
  const badge = badgeByOwner[ownerType] || badgeByOwner.owner;

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
      {variant === "verification" ? badge.verification : badge.listing}
    </span>
  );
}
