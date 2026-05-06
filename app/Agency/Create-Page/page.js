"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AgencyPageBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const isRegistrationFlow = searchParams.get("from") === "registration";

  const templates = [
    {
      id: "modern",
      name: "تصميم عصري",
      preview: "/images/classic-design.png",
      price: 1000,
      features: ["تصميم بسيط", "معرض صور كبير", "قسم الفريق"],
    },
    {
      id: "luxury",
      name: "تصميم فاخر",
      preview: "/images/bright-design.png",
      price: 2500,
      features: ["لمسات ذهبية", "فيديو افتتاحي", "شارة مميزة"],
    },
    {
      id: "corporate",
      name: "تصميم احترافي",
      preview: "/images/dark-design.png",
      price: 1500,
      features: ["عرض بيانات متقدم", "خريطة تفاعلية", "قائمة الوسطاء"],
    },
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCreatePage = async () => {
    if (!selectedTemplate) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (isRegistrationFlow) {
        router.push(`/Auth/login?newAgency=1&template=${selectedTemplate.id}`);
        return;
      }

      router.push(`/Dashboard/Agency?template=${selectedTemplate.id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen mt-1 flex flex-col bg-gray-50 text-right">
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center my-12">
            <h1 className="text-3xl font-bold">إنشاء صفحة وكالتك</h1>
            <p className="mt-2 text-gray-600">
              اختر التصميم المناسب الذي يعكس هوية شركتك
            </p>

            {isRegistrationFlow && (
              <p className="mt-4 inline-block bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm">
                خطوة أخيرة بعد التسجيل: اختر أحد 3 تصاميم لتفعيل صفحة الشركة.
              </p>
            )}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`bg-white rounded-2xl shadow-lg cursor-pointer transition hover:-translate-y-2 border-2 ${
                    selectedTemplate?.id === template.id
                      ? "border-indigo-600 ring-2 ring-indigo-100"
                      : "border-transparent"
                  }`}
                >
                  {/* ✅ FIXED IMAGE */}
                  <div className="relative w-full h-56">
                    <Image
                      src={template.preview}
                      alt={template.name}
                      fill
                      className="object-cover rounded-t-2xl"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-bold">
                        {template.name}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(template);
                        setStep(2);
                      }}
                      className="w-full mt-4 rounded-lg border border-indigo-600 text-indigo-600 py-2 font-semibold hover:bg-indigo-50"
                    >
                      اختيار هذا التصميم
                    </button>

                    <ul className="text-sm text-gray-500 space-y-2 mt-4">
                      {template.features.map((f, i) => (
                        <li key={i}>✔ {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && selectedTemplate && (
            <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">تأكيد الدفع</h2>

              <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <h3 className="font-bold">{selectedTemplate.name}</h3>
                <p className="text-indigo-600 font-bold">
                  {selectedTemplate.price} جنيه
                </p>
              </div>

              <button
                onClick={handleCreatePage}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold"
              >
                {loading ? "جارٍ الدفع..." : "💳 الدفع وإنشاء الصفحة"}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full mt-3 text-gray-500"
              >
                اختيار تصميم آخر
              </button>
            </div>
          )}

          {/* Continue Button */}
          {step === 1 && (
            <div className="mt-12 flex justify-start">
              <button
                onClick={() => selectedTemplate && setStep(2)}
                disabled={!selectedTemplate}
                className={`px-10 py-4 rounded-xl font-bold ${
                  selectedTemplate
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                التالي
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}