"use client";

import Link from "next/link";
import PropertyBadge from "../features/property/PropertyBadge";

export default function PropertyCard({ property }) {
  const ownerType = property.ownerType || "owner";

  return (
    <Link
      href={`/Properties/${property.id}`}
      className="group surface-card block overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-56 bg-slate-100">
        <img
          src={property.image || "/images/placeholder.jpg"}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700">
            {property.type === "sale" ? "For Sale" : "For Rent"}
          </span>
          <PropertyBadge ownerType={ownerType} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
          {property.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{property.location}</p>

        {property.agencyName && ownerType === "agency" && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {property.agencyName}
          </p>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-xs font-medium text-slate-600">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} m²</span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <p className="text-2xl font-bold text-indigo-600">
            ${property.price.toLocaleString()}
            {property.type === "rent" && (
              <span className="ml-1 text-sm font-medium text-slate-500">/mo</span>
            )}
          </p>
          <PropertyBadge ownerType={ownerType} variant="verification" />
        </div>
      </div>
    </Link>
  );
}
