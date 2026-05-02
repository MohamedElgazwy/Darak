"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";

const mockProperties = [
  {
    id: 1,
    title: "شقة حديثة في القاهرة الجديدة",
    price: 2500000,
    type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    location: "القاهرة الجديدة",
    verified: true,
    image: "/images/property1.jpg",
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [properties, setProperties] = useState(mockProperties);
  const activeType = typeParam || "sale";
  const [page, setPage] = useState(1);

  const handleFilterChange = (filters) => {
    setProperties(mockProperties);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-right">

      <main className="grow pb-16 pt-28">
        <div className="container-shell">

          {/* Header */}
          <div className="mb-8 rounded-2xl border bg-white p-6">

            <h1 className="text-3xl font-bold">
              {activeType === "sale" ? "عقارات للبيع" : "عقارات للإيجار"}
            </h1>

            <p className="mt-2 text-gray-600">
              تصفح عقارات موثوقة بأسعار واضحة وتفاصيل دقيقة
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 flex-row-reverse">

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {properties.length} نتيجة
              </span>

              <select className="border rounded-xl px-3 py-2 text-sm">
                <option>الأحدث</option>
                <option>السعر: من الأقل للأعلى</option>
                <option>السعر: من الأعلى للأقل</option>
              </select>

            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">

            {/* Filters */}
            <aside className="lg:col-span-1">
              <SearchFilters onFilterChange={handleFilterChange} />
            </aside>

            {/* Results */}
            <section className="lg:col-span-3">

              {properties.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-bold">لا توجد نتائج</h3>
                  <p className="text-gray-500 mt-2">
                    حاول تغيير الفلاتر أو البحث
                  </p>
                </div>
              )}

              <Pagination
                currentPage={page}
                totalPages={3}
                onPageChange={setPage}
              />

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">جارٍ التحميل...</div>}>
      <SearchContent />
    </Suspense>
  );
}