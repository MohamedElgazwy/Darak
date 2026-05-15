"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";
import { propertyApi } from "../services/api";

const normalizeProperty = (property) => ({
  id: property.id || property.propertyId,
  title: property.title || property.name || "بدون عنوان",
  price: Number(property.price || 0),
  type: property.type || property.listingType || "sale",
  bedrooms: Number(property.bedrooms || property.bedRooms || 0),
  bathrooms: Number(property.bathrooms || property.bathRooms || 0),
  area: Number(property.area || property.size || 0),
  location: property.location || property.city || property.address || "",
  verified: property.verified ?? true,
  image: property.image || property.imageUrl || property.mainImageUrl,
});

function SearchContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const activeType = typeParam || "sale";
  const [page, setPage] = useState(1);

  const loadProperties = async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const result = await propertyApi.list({
        type: activeType,
        page,
        ...filters,
      });
      setProperties((result || []).map(normalizeProperty).filter((p) => p.id));
    } catch (err) {
      setError("تعذر تحميل العقارات حالياً.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [activeType, page]);

  const handleFilterChange = (filters) => {
    setPage(1);
    loadProperties(filters);
  };

  return (<div className="flex min-h-screen flex-col bg-slate-50 text-right"><main className="grow pb-16 pt-28"><div className="container-shell">
  <div className="mb-8 rounded-2xl border bg-white p-6"><h1 className="text-3xl font-bold">{activeType === "sale" ? "عقارات للبيع" : "عقارات للإيجار"}</h1><p className="mt-2 text-gray-600">تصفح عقارات موثوقة بأسعار واضحة وتفاصيل دقيقة</p><div className="mt-5 flex flex-wrap items-center justify-between gap-3 flex-row-reverse"><span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{properties.length} نتيجة</span></div></div>
  <div className="grid gap-6 lg:grid-cols-4"><aside className="lg:col-span-1"><SearchFilters onFilterChange={handleFilterChange} /></aside><section className="lg:col-span-3">
  {loading ? <div className="py-16 text-center">جارٍ تحميل العقارات...</div> : error ? <div className="py-16 text-center text-red-600">{error}</div> : properties.length > 0 ? <div className="grid gap-6 md:grid-cols-2">{properties.map((property) => (<PropertyCard key={property.id} property={property} />))}</div> : <div className="text-center py-16"><h3 className="text-xl font-bold">لا توجد نتائج</h3></div>}
  <Pagination currentPage={page} totalPages={Math.max(1, page + (properties.length > 0 ? 1 : 0))} onPageChange={setPage} />
  </section></div></div></main></div>);
}

export default function SearchPage() {
  return <Suspense fallback={<div className="p-8 text-center">جارٍ التحميل...</div>}><SearchContent /></Suspense>;
}
