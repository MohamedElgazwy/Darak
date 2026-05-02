"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    { id: 1, title: "معلومات أساسية" },
    { id: 2, title: "التفاصيل" },
    { id: 3, title: "الموقع" },
    { id: 4, title: "الصور" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-right">

      <main className="grow pb-14 pt-28">
        <div className="container-shell max-w-5xl">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              أضف عقارك
            </h1>
            <p className="mt-2 text-slate-600">
              أنشئ إعلانًا احترافيًا بعرض واضح وتفاصيل دقيقة.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="relative h-2 rounded-full bg-slate-200">
              <div
                className="absolute right-0 top-0 h-2 rounded-full bg-indigo-600 transition-all"
                style={{
                  width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-semibold text-slate-500">
              {steps.map((s) => (
                <span key={s.id} className={step >= s.id ? "text-indigo-700" : ""}>
                  {s.title}
                </span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="surface-card relative min-h-[460px] p-6 sm:p-8">

            {/* Loading */}
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">معلومات أساسية</h2>

                <div className="grid gap-4 md:grid-cols-2">

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm">عنوان العقار</label>
                    <input name="title" onChange={handleInputChange} className="w-full rounded-xl border px-3 py-2.5 text-right" />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm">السعر (جنيه)</label>
                    <input type="number" name="price" onChange={handleInputChange} className="w-full rounded-xl border px-3 py-2.5 text-right" />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm">نوع العقار</label>
                    <select name="propertyType" onChange={handleInputChange} className="w-full rounded-xl border px-3 py-2.5">
                      <option value="Apartment">شقة</option>
                      <option value="Villa">فيلا</option>
                      <option value="Office">مكتب</option>
                      <option value="Land">أرض</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm">الوصف</label>
                    <textarea name="description" rows="4" onChange={handleInputChange} className="w-full rounded-xl border px-3 py-2.5 text-right" />
                  </div>

                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">تفاصيل العقار</h2>

                <div className="grid gap-4 md:grid-cols-3">
                  <input placeholder="عدد الغرف" name="bedrooms" onChange={handleInputChange} className="rounded-xl border px-3 py-2.5 text-right" />
                  <input placeholder="عدد الحمامات" name="bathrooms" onChange={handleInputChange} className="rounded-xl border px-3 py-2.5 text-right" />
                  <input placeholder="المساحة (م²)" name="area" onChange={handleInputChange} className="rounded-xl border px-3 py-2.5 text-right" />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">الموقع</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="المدينة" className="rounded-xl border px-3 py-2.5 text-right" />
                  <input placeholder="العنوان" className="rounded-xl border px-3 py-2.5 text-right" />
                </div>

                <div className="flex h-52 items-center justify-center rounded-xl border border-dashed bg-slate-50">
                  خريطة الموقع
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">الصور</h2>

                <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-indigo-50">
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                  <span>اضغط لرفع الصور</span>
                  <span className="text-sm">حد أقصى 10 صور</span>
                </label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img.preview} className="aspect-square w-full object-cover rounded-xl" />
                      <button onClick={() => handleRemoveImage(idx)} className="absolute left-2 top-2 bg-black text-white text-xs px-2 py-1 rounded">
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between border-t pt-6 flex-row-reverse">
              <button onClick={() => setStep((p) => Math.max(p - 1, 1))} className="btn-secondary">
                السابق
              </button>

              {step === 4 ? (
                <div className="flex gap-2">
                  <button onClick={handleSubmit} className="btn-secondary">
                    حفظ كمسودة
                  </button>
                  <button onClick={handleSubmit} className="btn-primary">
                    إرسال للمراجعة
                  </button>
                </div>
              ) : (
                <button onClick={() => setStep((p) => p + 1)} className="btn-primary">
                  التالي
                </button>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Success */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold">تم الإرسال 🎉</h3>
            <p className="mt-2">تم إرسال إعلانك للمراجعة.</p>
            <button onClick={() => router.push("/dashboard")} className="btn-primary mt-4">
              الذهاب للوحة التحكم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}