"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { paymentApi } from "../services/api";

export default function PaymentsPage() {
  const router = useRouter();
  const [subscriptionId, setSubscriptionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auth guard
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    if (!token) {
      router.push("/Auth/login");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await paymentApi.confirmCash({ subscriptionId: Number(subscriptionId) });
      setSuccess("Cash payment confirmed successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to confirm payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Confirm Cash Payment</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subscription ID</label>
            <input
              type="number"
              value={subscriptionId}
              onChange={(e) => setSubscriptionId(e.target.value)}
              required
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl text-white transition ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Processing..." : "Confirm Cash"}
          </button>
        </form>
      </div>
    </div>
  );
}
