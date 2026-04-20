"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgencyPageBuilder() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Design, 2: Payment & Confirm
  const [loading, setLoading] = useState(false);

  // قوالب تصميم وهمية لصفحة الشركة
  const templates = [
    {
      id: "modern",
      name: "Modern Minimal",
      image: "/images/template1.jpg", // استبدل بمسار صورة حقيقي
      price: 1000,
      features: ["Clean Header", "Large Gallery", "Team Section"],
    },
    {
      id: "luxury",
      name: "Gold Luxury",
      image: "/images/template2.jpg",
      price: 2500,
      features: ["Gold Accents", "Video Intro", "Premium Badge"],
    },
    {
      id: "corporate",
      name: "Corporate Grid",
      image: "/images/template3.jpg",
      price: 1500,
      features: ["Data Focused", "Map Integration", "Agent List"],
    },
  ];

  const handleCreatePage = async () => {
    setLoading(true);
    // محاكاة الاتصال بالـ API (Create Page & Payment)
    try {
      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard/agency"); // توجيه للوحة التحكم بعد النجاح
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Agency Page
            </h1>
            <p className="mt-2 text-gray-600">
              Choose a professional design that represents your brand.
            </p>
          </div>

          {/* Step 1: اختيار التصميم */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`group relative bg-white rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 ${
                    selectedTemplate?.id === template.id
                      ? "border-primary-600 ring-4 ring-primary-50"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  {/* صورة القالب */}
                  <div className="h-56 bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                      {/* Placeholder Image */}
                      <span>[ Template Preview ]</span>
                    </div>

                    {/* علامة الاختيار */}
                    {selectedTemplate?.id === template.id && (
                      <div className="absolute inset-0 bg-primary-600/20 flex items-center justify-center animate-fadeIn">
                        <div className="bg-primary-600 text-white rounded-full p-3 shadow-lg">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {template.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                        {template.price} EGP
                      </span>
                    </div>
                    <ul className="text-sm text-gray-500 space-y-2">
                      {template.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-primary-600">✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: التأكيد والدفع */}
          {step === 2 && selectedTemplate && (
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Confirm & Pay
              </h2>

              {/* ملخص الطلب */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  Preview
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {selectedTemplate.name}
                  </h3>
                  <p className="text-primary-600 font-bold">
                    {selectedTemplate.price} EGP{" "}
                    <span className="text-gray-400 font-normal text-sm">
                      / One-time
                    </span>
                  </p>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="space-y-4">
                <button
                  onClick={handleCreatePage}
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all flex justify-center items-center gap-3 shadow-lg shadow-primary-600/20"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <span>💳</span> Pay & Launch Page
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="w-full py-3 text-gray-500 hover:text-gray-800 font-medium transition-colors"
                >
                  Choose Different Template
                </button>
              </div>
            </div>
          )}

          {/* زر المتابعة (يظهر فقط في الخطوة 1) */}
          {step === 1 && (
            <div className="mt-12 flex justify-end border-t border-gray-200 pt-8">
              <button
                onClick={() => selectedTemplate && setStep(2)}
                disabled={!selectedTemplate}
                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform ${
                  selectedTemplate
                    ? "bg-primary-600 text-white hover:bg-primary-700 shadow-xl hover:-translate-y-1"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
