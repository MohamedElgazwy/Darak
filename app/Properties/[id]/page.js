"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { propertyApi } from "../../services/api";

const getImageUrl = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.url || value.imageUrl || value.path || "";
};

export default function PropertyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const p = await propertyApi.getById(id);
        const images = (p?.images || []).map(getImageUrl).filter(Boolean);
        const primaryImage = getImageUrl(p?.primaryImage || p?.primaryImageUrl || p?.imageUrl || p?.mainImageUrl);

        setPropertyData({
          id: p?.id || id,
          title: p?.title || p?.name || "بدون عنوان",
          description: p?.description || "",
          price: Number(p?.price || 0),
          type: String(p?.purpose || p?.type || p?.listingType || "Sale").toLowerCase(),
          propertyType: p?.propertyType || "",
          bedrooms: Number(p?.rooms || p?.bedrooms || p?.bedRooms || 0),
          bathrooms: Number(p?.bathrooms || p?.bathRooms || 0),
          floor: p?.floor,
          area: Number(p?.area || p?.size || 0),
          address: p?.address || p?.location || p?.city || "",
          owner: p?.owner || { name: "غير متاح", joined: "-" },
          images: images.length ? images : [primaryImage || "/images/placeholder.jpg"],
        });
      } catch (err) {
        setError("تعذر تحميل الإعلان.");
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("هل تريد حذف هذا الإعلان نهائياً؟")) return;

    setDeleting(true);
    try {
      await propertyApi.delete(id);
      router.push("/Search");
    } catch (err) {
      setError("تعذر حذف الإعلان.");
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-16 text-center">جارٍ التحميل...</div>;
  if (error) return <div className="p-16 text-center text-red-600">{error}</div>;
  if (!propertyData) return <div className="p-16 text-center">العقار غير متاح</div>;

  return (
    <div className="min-h-screen bg-white text-right">
      <div className="relative">
        <img src={propertyData.images[activeImage]} alt={propertyData.title} className="h-[420px] w-full object-cover" />
        <div className="absolute right-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-slate-800">
            {propertyData.type === "sale" ? "للبيع" : "للإيجار"}
          </span>
          {propertyData.propertyType && (
            <span className="rounded-full bg-slate-950/90 px-3 py-1 text-sm font-semibold text-white">
              {propertyData.propertyType}
            </span>
          )}
        </div>
      </div>

      <main className="container-shell py-8">
        {propertyData.images.length > 1 && (
          <div className="mb-6 grid grid-cols-4 gap-3 md:grid-cols-6">
            {propertyData.images.map((image, index) => (
              <button key={image} onClick={() => setActiveImage(index)} className={`overflow-hidden rounded-xl border ${activeImage === index ? "ring-2 ring-indigo-600" : ""}`}>
                <img src={image} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <section>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-950">{propertyData.title}</h1>
                <p className="mt-2 text-slate-500">{propertyData.address}</p>
              </div>
              <p className="text-3xl font-bold text-indigo-600">{propertyData.price.toLocaleString()} جنيه</p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Fact label="الغرف" value={propertyData.bedrooms} />
              <Fact label="الحمامات" value={propertyData.bathrooms} />
              <Fact label="المساحة" value={`${propertyData.area} م²`} />
              <Fact label="الدور" value={propertyData.floor ?? "-"} />
            </div>

            {propertyData.description && (
              <div className="surface-card p-6">
                <h2 className="mb-3 text-xl font-bold text-slate-950">الوصف</h2>
                <p className="leading-8 text-slate-700">{propertyData.description}</p>
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="surface-card p-6">
              <h3 className="mb-4 font-bold">المالك</h3>
              <p className="text-slate-700">{propertyData.owner.name}</p>
              <button onClick={() => setShowContactForm(true)} className="btn-primary mt-4 w-full">تواصل مع المالك</button>
            </div>

            <div className="surface-card p-6">
              <h3 className="mb-4 font-bold">إدارة الإعلان</h3>
              <div className="grid gap-2">
                <Link href={`/Properties/${id}/Edit`} className="btn-secondary">تعديل الإعلان</Link>
                <button onClick={handleDelete} disabled={deleting} className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50">
                  {deleting ? "جارٍ الحذف..." : "حذف الإعلان"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {showContactForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="mb-4 font-bold">إرسال رسالة</h3>
            <textarea placeholder="اكتب رسالتك..." className="mb-4 w-full rounded-xl border p-3 text-right" />
            <button onClick={() => setShowContactForm(false)} className="w-full rounded-xl border py-2">إغلاق</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-950">{value}</p>
    </div>
  );
}
