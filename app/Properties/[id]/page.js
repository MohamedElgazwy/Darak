"use client";

import { useState } from "react";

export default function PropertyDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const propertyData = {
    title: "شقة حديثة في القاهرة الجديدة",
    price: 250000,
    type: "sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    address: "القاهرة الجديدة - التجمع الخامس",
    verified: true,
    owner: {
      name: "أحمد محمد",
      joined: "2023",
      properties: 5,
    },
    images: ["/images/property1.jpg"],
    features: ["مسبح", "جيم", "أمن 24/7"],
  };

  return (
    <div className="min-h-screen text-right">

      {/* Images */}
      <div className="relative">
        <img
          src={propertyData.images[activeImage]}
          className="w-full h-[400px] object-cover"
        />

        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full">
            للبيع
          </span>
        </div>
      </div>

      <div className="container-shell py-8">
        <div className="flex flex-col lg:flex-row-reverse gap-8">

          {/* Left */}
          <div className="lg:w-2/3">

            <h1 className="text-3xl font-bold mb-2">
              {propertyData.title}
            </h1>

            <p className="text-gray-500 mb-4">
              📍 {propertyData.address}
            </p>

            <p className="text-2xl font-bold text-indigo-600 mb-6">
              {propertyData.price} جنيه
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>🛏 {propertyData.bedrooms} غرف</div>
              <div>🛁 {propertyData.bathrooms} حمام</div>
              <div>📏 {propertyData.area} م²</div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="font-bold mb-2">المميزات</h2>
              <ul className="grid grid-cols-2 gap-2">
                {propertyData.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right */}
          <div className="lg:w-1/3">

            <div className="border p-6 rounded-xl">

              <h3 className="font-bold mb-4">المالك</h3>

              <p>{propertyData.owner.name}</p>

              <p className="text-sm text-gray-500">
                عضو منذ {propertyData.owner.joined}
              </p>

              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary w-full mt-4"
              >
                تواصل مع المالك
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h3 className="font-bold mb-4">إرسال رسالة</h3>

            <textarea
              placeholder="اكتب رسالتك..."
              className="w-full border p-3 rounded mb-4 text-right"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 border py-2 rounded"
              >
                إلغاء
              </button>

              <button className="flex-1 btn-primary">
                إرسال
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}