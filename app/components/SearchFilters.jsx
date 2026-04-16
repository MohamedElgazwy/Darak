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
    <div className="surface-card sticky top-24 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <button
          onClick={() => {
            const reset = { priceMin: "", priceMax: "", bedrooms: "", bathrooms: "" };
            setFilters(reset);
            onFilterChange(reset);
          }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Price Range (EGP)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleChange("priceMin", e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleChange("priceMax", e.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Bedrooms</p>
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
                {opt || "Any"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Bathrooms</p>
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
                {opt || "Any"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
