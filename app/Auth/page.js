"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";

const DEFAULT_PLAN_BY_ROLE = {
  Seeker: null,
  Owner: null,
  Agency: "basic",
  Admin: null,
};

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Seeker",
    otp: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const selectedRole = isLogin ? "Seeker" : formData.role;
      const fakeUser = {
        id: `usr_${Date.now()}`,
        name: formData.name || "Mohamed",
        email: formData.email,
        role: selectedRole,
        subscriptionPlan: DEFAULT_PLAN_BY_ROLE[selectedRole],
        agencyProfileId: selectedRole === "Agency" ? "agp_demo_01" : null,
        activeListings: selectedRole === "Agency" ? 3 : 0,
      };

      localStorage.setItem("authToken", "fake-token-123");
      localStorage.setItem("user", JSON.stringify(fakeUser));

      if (selectedRole === "Agency") {
        router.push("/Dashboard/Agency");
        return;
      }

      if (selectedRole === "Admin") {
        router.push("/Admin/Dashboard");
        return;
      }

      router.push("/Dashboard");
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/Dashboard");
    } catch {
      setError("Invalid OTP. Please check code and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="grow pb-14 pt-28">
        <div className="container-shell max-w-md">
          <div className="surface-card p-8">
            {step === 1 && (
              <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button onClick={() => { setIsLogin(true); setError(""); }} className={`rounded-lg py-2 text-sm font-semibold transition ${isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                  Sign In
                </button>
                <button onClick={() => { setIsLogin(false); setError(""); }} className={`rounded-lg py-2 text-sm font-semibold transition ${!isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                  Sign Up
                </button>
              </div>
            )}

            {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required={!isLogin} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Account Type</label>
                      <select name="role" value={formData.role} onChange={handleInputChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500">
                        <option value="Seeker">Seeker (Buyer/Tenant)</option>
                        <option value="Owner">Property Owner</option>
                        <option value="Agency">Real Estate Agency</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required={!isLogin} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" placeholder="+20 1xx xxx xxxx" />
                    </div>
                  </>
                )}

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                </div>

                <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {isLoading ? "Processing..." : isLogin ? "Sign In" : "Register & Continue"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-900">Verify Your Email</h3>
                  <p className="mt-1 text-sm text-slate-600">We sent a verification code to <strong>{formData.email}</strong>.</p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Verification Code</label>
                  <input type="text" name="otp" value={formData.otp} onChange={handleInputChange} required maxLength={6} className="w-full rounded-xl border border-slate-300 px-3 py-3 text-center text-2xl tracking-[0.3em] outline-none focus:border-indigo-500" placeholder="123456" />
                </div>

                <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {isLoading ? "Verifying..." : "Confirm & Login"}
                </button>

                <button type="button" onClick={() => setStep(1)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Back to Registration
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
