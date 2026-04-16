"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AddProperty() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "Apartment",
    status: "Draft",
    design: "standard",
    bedrooms: "",
    bathrooms: "",
    area: "",
    location: { city: "", street: "" },
    images: [],
    features: [],
  });

  const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Details" },
    { id: 3, title: "Location" },
    { id: 4, title: "Photos" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="grow pb-14 pt-28">
        <div className="container-shell max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">List Your Property</h1>
            <p className="mt-2 text-slate-600">Publish a high-quality listing with clear details and strong visuals.</p>
          </div>

          <div className="mb-8">
            <div className="relative h-2 rounded-full bg-slate-200">
              <div className="absolute left-0 top-0 h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              {steps.map((s) => (
                <span key={s.id} className={step >= s.id ? "text-indigo-700" : ""}>{s.title}</span>
              ))}
            </div>
          </div>

          <div className="surface-card relative min-h-[460px] p-6 sm:p-8">
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-slate-900">Basic Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Property Title</label>
                    <input name="title" value={formData.title} onChange={handleInputChange} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Price (EGP)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Property Type</label>
                    <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500">
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Office">Office</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                    <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-slate-900">Property Details</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ["Bedrooms", "bedrooms"],
                    ["Bathrooms", "bathrooms"],
                    ["Area (sqm)", "area"],
                  ].map(([label, name]) => (
                    <div key={name}>
                      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
                      <input type="number" name={name} value={formData[name]} onChange={handleInputChange} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
                  <p className="mb-3 text-sm font-semibold text-indigo-900">Listing style</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {["standard", "featured"].map((design) => (
                      <label key={design} className={`cursor-pointer rounded-xl border p-4 text-sm ${formData.design === design ? "border-indigo-500 bg-white" : "border-slate-300 bg-white/70"}`}>
                        <input type="radio" name="design" value={design} checked={formData.design === design} onChange={handleInputChange} className="mr-2" />
                        {design === "standard" ? "Standard Layout" : "Immersive Layout"}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-slate-900">Location</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="City" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                  <input placeholder="Street Address" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500" />
                </div>
                <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                  Map pin placeholder
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-slate-900">Photos</h2>
                <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-indigo-300 bg-indigo-50 text-indigo-700">
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                  <span className="font-semibold">Click to upload images</span>
                  <span className="text-sm">Maximum 10 images</span>
                </label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-xl border border-slate-200">
                      <img src={img.preview} alt="preview" className="aspect-square w-full object-cover" />
                      <button onClick={() => handleRemoveImage(idx)} className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
              <button onClick={() => setStep((prev) => Math.max(prev - 1, 1))} disabled={step === 1} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50">
                Back
              </button>
              {step === 4 ? (
                <div className="flex gap-2">
                  <button onClick={handleSubmit} className="btn-secondary">Save Draft</button>
                  <button onClick={handleSubmit} className="btn-primary">Submit Review</button>
                </div>
              ) : (
                <button onClick={() => setStep((prev) => Math.min(prev + 1, 4))} className="btn-primary">
                  Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900">Submitted!</h3>
            <p className="mt-2 text-slate-600">Your listing is now pending approval.</p>
            <button onClick={() => router.push("/dashboard")} className="btn-primary mt-6 w-full">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
