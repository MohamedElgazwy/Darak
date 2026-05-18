"use client";

import { useEffect, useState } from "react";
import { propertyApi } from "../../services/api";
import LookupList from "../../components/LookupList";

export default function LookupPage() {
  const [lookups, setLookups] = useState({
    governorates: [],
    propertyTypes: [],
    purposes: [],
    statuses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [gov, types, purposes, statuses] = await Promise.all([
          propertyApi.getGovernorates(),
          propertyApi.getPropertyTypes(),
          propertyApi.getPurposes(),
          propertyApi.getStatuses(),
        ]);
        setLookups({
          governorates: gov || [],
          propertyTypes: types || [],
          purposes: purposes || [],
          statuses: statuses || [],
        });
      } catch (err) {
        setError("فشل تحميل القوائم المرجعية.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-16 text-center">جارٍ التحميل...</div>;
  if (error) return <div className="p-16 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-right py-8">
      <div className="container-shell max-w-5xl space-y-6">
        <h1 className="text-3xl font-bold text-slate-950">قوائم مرجعية للنظام</h1>
        <LookupList title="المحافظات" items={lookups.governorates} />
        <LookupList title="أنواع العقار" items={lookups.propertyTypes} />
        <LookupList title="الأغراض" items={lookups.purposes} />
        <LookupList title="الحالات" items={lookups.statuses} />
      </div>
    </div>
  );
}
