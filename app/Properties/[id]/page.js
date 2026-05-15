"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { propertyApi } from "../../services/api";

export default function PropertyDetail() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await propertyApi.getById(id);
        setPropertyData({
          title: p?.title || p?.name || "بدون عنوان",
          price: Number(p?.price || 0),
          type: p?.type || p?.listingType || "sale",
          bedrooms: Number(p?.bedrooms || p?.bedRooms || 0),
          bathrooms: Number(p?.bathrooms || p?.bathRooms || 0),
          area: Number(p?.area || p?.size || 0),
          address: p?.address || p?.location || p?.city || "",
          owner: p?.owner || { name: "غير متاح", joined: "-" },
          images: p?.images || [p?.imageUrl || p?.mainImageUrl || "/images/placeholder.jpg"],
          features: p?.features || [],
        });
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) return <div className="p-16 text-center">جارٍ التحميل...</div>;
  if (!propertyData) return <div className="p-16 text-center">العقار غير متاح</div>;

  return (<div className="min-h-screen text-right"><div className="relative"><img src={propertyData.images[activeImage]} className="w-full h-[400px] object-cover" /><div className="absolute top-4 right-4"><span className="bg-green-500 text-white px-3 py-1 rounded-full">{propertyData.type === "sale" ? "للبيع" : "للإيجار"}</span></div></div><div className="container-shell py-8"><div className="flex flex-col lg:flex-row-reverse gap-8"><div className="lg:w-2/3"><h1 className="text-3xl font-bold mb-2">{propertyData.title}</h1><p className="text-gray-500 mb-4">📍 {propertyData.address}</p><p className="text-2xl font-bold text-indigo-600 mb-6">{propertyData.price} جنيه</p><div className="grid grid-cols-3 gap-4 mb-6"><div>🛏 {propertyData.bedrooms} غرف</div><div>🛁 {propertyData.bathrooms} حمام</div><div>📏 {propertyData.area} م²</div></div></div><div className="lg:w-1/3"><div className="border p-6 rounded-xl"><h3 className="font-bold mb-4">المالك</h3><p>{propertyData.owner.name}</p><button onClick={() => setShowContactForm(true)} className="btn-primary w-full mt-4">تواصل مع المالك</button></div></div></div></div>{showContactForm && <div className="fixed inset-0 bg-black/50 flex items-center justify-center"><div className="bg-white p-6 rounded-xl w-full max-w-md"><h3 className="font-bold mb-4">إرسال رسالة</h3><textarea placeholder="اكتب رسالتك..." className="w-full border p-3 rounded mb-4 text-right" /><button onClick={() => setShowContactForm(false)} className="w-full border py-2 rounded">إغلاق</button></div></div>}</div>);
}
