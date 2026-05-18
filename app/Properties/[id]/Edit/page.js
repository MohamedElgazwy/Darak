"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { propertyApi } from "../../../services/api";

const propertyTypes = ["Apartment", "Villa", "Compound", "Chalet", "Office", "Shop"];
const purposes = ["Sale", "Rent"];
const cities = ["Cairo", "Alexandria", "Giza", "PortSaid", "Suez", "Dakahlia", "RedSea", "Beheira", "Fayoum", "Gharbia", "Ismailia", "Monufia", "Minya", "Qalyubia", "NewValley", "Sharqia", "SouthSinai", "KafrElSheikh", "Matrouh", "Luxor", "Qena", "NorthSinai", "Sohag", "Aswan", "Assiut", "BeniSuef", "Damietta"];

const getId = (item) => item?.id || item?.imageId;
const getUrl = (item) => {
  if (!item) return "";
  if (typeof item === "string") return item;
  return item.url || item.imageUrl || item.path || "";
};

const initialForm = {
  title: "",
  description: "",
  price: "",
  purpose: "Sale",
  area: "",
  bedrooms: "",
  bathrooms: "",
  floor: "",
  city: "Cairo",
  country: "Egypt",
  latitude: "",
  longitude: "",
  address: "",
  propertyType: "Apartment",
  keepImageIds: [],
  newImages: [],
  newPrimary: null,
};

export default function EditAnnouncementPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const newImagePreviews = useMemo(
    () => form.newImages.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    [form.newImages]
  );

  useEffect(() => {
    const loadAnnouncement = async () => {
      setLoading(true);
      setError("");
      try {
        const item = await propertyApi.getById(id);
        const images = (item?.images || [])
          .map((image, index) => ({
            id: getId(image) || index,
            url: getUrl(image),
          }))
          .filter((image) => image.url);

        setExistingImages(images);
        setForm({
          ...initialForm,
          id,
          title: item?.title || "",
          description: item?.description || "",
          price: item?.price || "",
          purpose: item?.purpose || "Sale",
          area: item?.area || "",
          bedrooms: item?.rooms || item?.bedrooms || "",
          bathrooms: item?.bathrooms || "",
          floor: item?.floor || "",
          city: item?.city || "Cairo",
          country: item?.country || "Egypt",
          latitude: item?.latitude || "",
          longitude: item?.longitude || "",
          address: item?.address || "",
          propertyType: item?.propertyType || "Apartment",
          keepImageIds: images.map((image) => image.id),
        });
      } catch (err) {
        setError("تعذر تحميل بيانات الإعلان.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadAnnouncement();
  }, [id]);

  useEffect(() => () => {
    newImagePreviews.forEach((image) => URL.revokeObjectURL(image.preview));
  }, [newImagePreviews]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleKeepImage = (imageId) => {
    setForm((prev) => ({
      ...prev,
      keepImageIds: prev.keepImageIds.includes(imageId)
        ? prev.keepImageIds.filter((id) => id !== imageId)
        : [...prev.keepImageIds, imageId],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await propertyApi.update(form);
      router.push(`/Properties/${id}`);
    } catch (err) {
      setError("تعذر حفظ التعديلات.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-16 text-center">جارٍ تحميل الإعلان...</div>;

  return (
    <main className="min-h-screen bg-slate-50 py-28 text-right">
      <form onSubmit={handleSubmit} className="container-shell max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">تعديل الإعلان</h1>
          <p className="mt-2 text-slate-600">حدّث بيانات الإعلان والصور ثم احفظ التغييرات.</p>
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        <section className="surface-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="العنوان" value={form.title} onChange={(value) => updateField("title", value)} className="md:col-span-2" />
            <Field label="السعر" type="number" value={form.price} onChange={(value) => updateField("price", value)} />
            <SelectField label="الغرض" value={form.purpose} options={purposes} onChange={(value) => updateField("purpose", value)} />
            <SelectField label="نوع العقار" value={form.propertyType} options={propertyTypes} onChange={(value) => updateField("propertyType", value)} />
            <Field label="المساحة" type="number" value={form.area} onChange={(value) => updateField("area", value)} />
            <Field label="الغرف" type="number" value={form.bedrooms} onChange={(value) => updateField("bedrooms", value)} />
            <Field label="الحمامات" type="number" value={form.bathrooms} onChange={(value) => updateField("bathrooms", value)} />
            <Field label="الدور" type="number" value={form.floor} onChange={(value) => updateField("floor", value)} />
            <SelectField label="المدينة" value={form.city} options={cities} onChange={(value) => updateField("city", value)} />
            <Field label="العنوان التفصيلي" value={form.address} onChange={(value) => updateField("address", value)} />
            <Field label="Latitude" type="number" value={form.latitude} onChange={(value) => updateField("latitude", value)} />
            <Field label="Longitude" type="number" value={form.longitude} onChange={(value) => updateField("longitude", value)} />
            <label className="md:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-700">الوصف</span>
              <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} rows="5" className="w-full rounded-xl border px-3 py-2.5 text-right" />
            </label>
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-950">الصور</h2>

          {existingImages.length > 0 && (
            <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {existingImages.map((image) => (
                <label key={image.id} className="relative overflow-hidden rounded-xl border bg-white">
                  <img src={image.url} alt="" className="aspect-square w-full object-cover" />
                  <span className="flex items-center gap-2 p-2 text-xs">
                    <input type="checkbox" checked={form.keepImageIds.includes(image.id)} onChange={() => toggleKeepImage(image.id)} />
                    الاحتفاظ بالصورة
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="rounded-xl border border-dashed bg-slate-50 p-5 text-center">
              <input type="file" multiple className="hidden" onChange={(event) => updateField("newImages", Array.from(event.target.files || []))} />
              <span className="font-semibold text-slate-700">رفع صور جديدة</span>
            </label>
            <label className="rounded-xl border border-dashed bg-slate-50 p-5 text-center">
              <input type="file" className="hidden" onChange={(event) => updateField("newPrimary", event.target.files?.[0] || null)} />
              <span className="font-semibold text-slate-700">صورة رئيسية جديدة</span>
            </label>
          </div>

          {newImagePreviews.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {newImagePreviews.map((image) => (
                <img key={image.preview} src={image.preview} alt="" className="aspect-square rounded-xl object-cover" />
              ))}
            </div>
          )}
        </section>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary">إلغاء</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", className = "" }) {
  return (
    <label className={className}>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <input type={type} step={type === "number" ? "any" : undefined} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-right" />
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label>
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border px-3 py-2.5">
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
