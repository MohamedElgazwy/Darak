"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";

const mockProperties = [
  {
    id: 1,
    title: "Modern Apartment in New Cairo",
    price: 2500000,
    type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    location: "New Cairo",
    verified: true,
    ownerType: "agency",
    agencyName: "Nile Estates",
    image: "/images/property1.jpg",
  },
  {
    id: 2,
    title: "Luxury Villa in Sheikh Zayed",
    price: 15000000,
    type: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    location: "Sheikh Zayed",
    verified: true,
    ownerType: "agency",
    agencyName: "Capital Brokers",
    image: "/images/property4.jpg",
  },
  {
    id: 3,
    title: "Cozy Studio in Maadi",
    price: 12000,
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    location: "Maadi",
    verified: false,
    ownerType: "owner",
    image: "/images/property3.jpg",
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [properties, setProperties] = useState(mockProperties);
  const activeType = typeParam || "sale";
  const [page, setPage] = useState(1);

  const handleFilterChange = (filters) => {
    console.log("Filters applied:", filters);
    setProperties(mockProperties);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      <main className="grow pb-16 pt-28">
        <div className="container-shell">
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h1 className="text-3xl font-bold text-slate-900">
              {activeType === "sale" ? "Properties for Sale" : "Properties for Rent"}
            </h1>
            <p className="mt-2 text-slate-600">Browse verified listings with transparent pricing and details.</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {properties.length} results
              </span>
              <select className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <SearchFilters onFilterChange={handleFilterChange} />
            </aside>

            <section className="lg:col-span-3">
              {properties.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="surface-card py-16 text-center">
                  <h3 className="text-xl font-semibold text-slate-900">No properties found</h3>
                  <p className="mt-2 text-slate-600">Try adjusting filters and search criteria.</p>
                </div>
              )}

              <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
            </section>
          </div>
        </div>
      </main>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-600">Loading properties...</div>}>
      <SearchContent />
    </Suspense>
  );
}
