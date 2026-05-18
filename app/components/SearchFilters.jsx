"use client";

import { useState } from "react";

const propertyTypes = ["", "Apartment", "Villa", "Compound", "Chalet", "Office", "Shop"];
const cities = ["", "Cairo", "Alexandria", "Giza", "PortSaid", "Suez", "Dakahlia", "RedSea", "Beheira", "Fayoum", "Gharbia", "Ismailia", "Monufia", "Minya", "Qalyubia", "NewValley", "Sharqia", "SouthSinai", "KafrElSheikh", "Matrouh", "Luxor", "Qena", "NorthSinai", "Sohag", "Aswan", "Assiut", "BeniSuef", "Damietta"];

const initialFilters = {
  searchTerm: "",
  propertyType: "",
  city: "",
  priceMin: "",
  priceMax: "",
  areaMin: "",
  areaMax: "",
  bedrooms: "",
  bathrooms: "",
  floor: "",
  sortBy: "",
  isDescending: true,
};

export default function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange(next);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className="surface-card sticky top-24 p-5 text-right">
      <div className="mb-5 flex items-center justify-between flex-row-reverse">
        <h3 className="text-lg font-semibold text-slate-900">الفلاتر</h3>
        <button onClick={resetFilters} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
          إعادة تعيين
        </button>
      </div>

      <div className="space-y-5">
        <input
          placeholder="ابحث بالعنوان أو العنوان التفصيلي"
          value={filters.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right"
        />

        <div className="grid grid-cols-2 gap-2">
          <select value={filters.propertyType} onChange={(e) => handleChange("propertyType", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
            {propertyTypes.map((type) => (
              <option key={type || "all"} value={type}>{type || "كل الأنواع"}</option>
            ))}
          </select>
          <select value={filters.city} onChange={(e) => handleChange("city", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
            {cities.map((city) => (
              <option key={city || "all"} value={city}>{city || "كل المدن"}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">نطاق السعر</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="أقل سعر" value={filters.priceMin} onChange={(e) => handleChange("priceMin", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
            <input type="number" placeholder="أعلى سعر" value={filters.priceMax} onChange={(e) => handleChange("priceMax", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">المساحة</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="أقل مساحة" value={filters.areaMin} onChange={(e) => handleChange("areaMin", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
            <input type="number" placeholder="أعلى مساحة" value={filters.areaMax} onChange={(e) => handleChange("areaMax", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <input type="number" placeholder="الغرف" value={filters.bedrooms} onChange={(e) => handleChange("bedrooms", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
          <input type="number" placeholder="الحمامات" value={filters.bathrooms} onChange={(e) => handleChange("bathrooms", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
          <input type="number" placeholder="الدور" value={filters.floor} onChange={(e) => handleChange("floor", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select value={filters.sortBy} onChange={(e) => handleChange("sortBy", e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
            <option value="">ترتيب افتراضي</option>
            <option value="Price">السعر</option>
            <option value="Area">المساحة</option>
            <option value="Rooms">الغرف</option>
          </select>
          <select value={String(filters.isDescending)} onChange={(e) => handleChange("isDescending", e.target.value === "true")} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
            <option value="true">تنازلي</option>
            <option value="false">تصاعدي</option>
          </select>
        </div>
      </div>
    </div>
  );
}
