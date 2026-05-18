"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { packageApi } from "../services/api";

export default function PackagesPage() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  // Auth guard
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");
      if (!token) {
        router.push("/Auth/login");
        return;
      }
    }
    const load = async () => {
      try {
        const data = await packageApi.list();
        setPackages(data.items || []);
        setError("");
      } catch (e) {
        setError(e?.response?.data?.message || "Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-600">Loading packages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Packages</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id || pkg.packageId} className="hover:bg-gray-50" onClick={() => setSelected(pkg)}>
              <td className="border p-2">{pkg.id || pkg.packageId}</td>
              <td className="border p-2">{JSON.stringify(pkg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
