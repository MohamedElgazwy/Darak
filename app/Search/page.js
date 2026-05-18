"use client";

import { useState, Suspense, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";
import { propertyApi } from "../services/api";

const getImageUrl = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.url || value.imageUrl || value.path || "";
};

const normalizeProperty = (property) => ({
  id: property.id || property.propertyId,
  title: property.title || property.name || "بدون عنوان",
  price: Number(property.price || 0),
  type: String(property.purpose || property.type || property.listingType || "Sale").toLowerCase(),
  bedrooms: Number(property.rooms || property.bedrooms || property.bedRooms || 0),
  bathrooms: Number(property.bathrooms || property.bathRooms || 0),
  area: Number(property.area || property.size || 0),
  location: property.address || property.location || property.city || "",
  verified: property.verified ?? true,
  image: getImageUrl(property.primaryImage || property.primaryImageUrl || property.image || property.imageUrl || property.mainImageUrl || property.images?.[0]),
});

function SearchContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const activeType = typeParam || "sale";
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadProperties = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await propertyApi.listPage({
        purpose: activeType,
        page,
        ...activeFilters,
      });
      setProperties((result.items || []).map(normalizeProperty).filter((p) => p.id));
      setTotalPages(Math.max(1, result.totalPages || 1));
      setTotalCount(result.totalCount || result.items?.length || 0);
    } catch (err) {
      setError("تعذر تحميل العقارات حالياً.");
      setProperties([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [activeFilters, activeType, page]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setPage(1);
  };

  return (<div className="flex min-h-screen flex-col bg-slate-50 text-right"><main className="grow pb-16 pt-28"><div className="container-shell">
  <div className="mb-8 rounded-2xl border bg-white p-6"><h1 className="text-3xl font-bold">{activeType === "sale" ? "عقارات للبيع" : "عقارات للإيجار"}</h1><p className="mt-2 text-gray-600">تصفح عقارات موثوقة بأسعار واضحة وتفاصيل دقيقة</p><div className="mt-5 flex flex-wrap items-center justify-between gap-3 flex-row-reverse"><span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{totalCount} نتيجة</span></div></div>
  <div className="grid gap-6 lg:grid-cols-4"><aside className="lg:col-span-1"><SearchFilters onFilterChange={handleFilterChange} /></aside><section className="lg:col-span-3">
  {loading ? <div className="py-16 text-center">جارٍ تحميل العقارات...</div> : error ? <div className="py-16 text-center text-red-600">{error}</div> : properties.length > 0 ? <div className="grid gap-6 md:grid-cols-2">{properties.map((property) => (<PropertyCard key={property.id} property={property} />))}</div> : <div className="text-center py-16"><h3 className="text-xl font-bold">لا توجد نتائج</h3></div>}
  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
  </section></div></div></main></div>);
}

export default function SearchPage() {
  return <Suspense fallback={<div className="p-8 text-center">جارٍ التحميل...</div>}><SearchContent /></Suspense>;
}
