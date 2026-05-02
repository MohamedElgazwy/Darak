"use client";

import { useState } from "react";

export default function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="surface-card sticky top-24 p-5 text-right">
      
      {/* Header */}
      <div className="mb-5 flex items-center justify-between flex-row-reverse">
        <h3 className="text-lg font-semibold text-slate-900">الفلاتر</h3>
        <button
          onClick={() => {
            const reset = { priceMin: "", priceMax: "", bedrooms: "", bathrooms: "" };
            setFilters(reset);
            onFilterChange(reset);
          }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          إعادة تعيين
        </button>
      </div>

      <div className="space-y-6">

        {/* السعر */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            نطاق السعر (جنيه)
          </label>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="أقل سعر"
              value={filters.priceMin}
              onChange={(e) => handleChange("priceMin", e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right"
            />
            <input
              type="number"
              placeholder="أعلى سعر"
              value={filters.priceMax}
              onChange={(e) => handleChange("priceMax", e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 text-right"
            />
          </div>
        </div>

        {/* غرف النوم */}
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">
            عدد الغرف
          </p>

          <div className="grid grid-cols-5 gap-2">
            {["", "1", "2", "3", "4+"].map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleChange("bedrooms", opt)}
                className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${
                  filters.bedrooms === opt
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt || "الكل"}
              </button>
            ))}
          </div>
        </div>

        {/* الحمامات */}
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">
            عدد الحمامات
          </p>

          <div className="grid grid-cols-4 gap-2">
            {["", "1", "2", "3+"].map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleChange("bathrooms", opt)}
                className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${
                  filters.bathrooms === opt
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt || "الكل"}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}