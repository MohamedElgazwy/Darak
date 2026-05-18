"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import { propertyApi } from "../../services/api";

const statusTabs = ["Pending", "Approved", "Rejected"];

const statusLabels = {
  Pending: "قيد المراجعة",
  Approved: "منشور",
  Rejected: "مرفوض",
};

const getAnnouncementId = (item) => item?.id || item?.announcementId || item?.propertyId;

const normalizeAnnouncement = (item) => ({
  id: getAnnouncementId(item),
  title: item?.title || item?.name || "بدون عنوان",
  owner: item?.owner?.name || item?.userName || item?.agencyName || "غير متاح",
  type: item?.propertyType || item?.type || "-",
  city: item?.city || "-",
  price: Number(item?.price || 0),
  status: item?.status || "Pending",
  date: item?.createdAt || item?.date || "",
});

export default function AdminDashboard() {
  const [status, setStatus] = useState("Pending");
  const [page, setPage] = useState(1);
  const [announcements, setAnnouncements] = useState([]);
  const [meta, setMeta] = useState({ totalPages: 1, totalCount: 0 });
  const [lookups, setLookups] = useState({ governorates: [], propertyTypes: [], purposes: [], statuses: [] });
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await propertyApi.listAdminPage({ status, page });
      setAnnouncements((result.items || []).map(normalizeAnnouncement).filter((item) => item.id));
      setMeta({
        totalPages: Math.max(1, result.totalPages || 1),
        totalCount: result.totalCount || result.items?.length || 0,
      });
    } catch (err) {
      setError("تعذر تحميل الإعلانات الإدارية.");
      setAnnouncements([]);
      setMeta({ totalPages: 1, totalCount: 0 });
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  useEffect(() => {
    const loadLookups = async () => {
      const [governorates, propertyTypes, purposes, statuses] = await Promise.allSettled([
        propertyApi.getGovernorates(),
        propertyApi.getPropertyTypes(),
        propertyApi.getPurposes(),
        propertyApi.getStatuses(),
      ]);

      setLookups({
        governorates: governorates.status === "fulfilled" ? governorates.value : [],
        propertyTypes: propertyTypes.status === "fulfilled" ? propertyTypes.value : [],
        purposes: purposes.status === "fulfilled" ? purposes.value : [],
        statuses: statuses.status === "fulfilled" ? statuses.value : [],
      });
    };

    loadLookups();
  }, []);

  const handleStatusChange = async (id, nextStatus) => {
    if (!confirm(`هل تريد تغيير حالة الإعلان إلى ${statusLabels[nextStatus] || nextStatus}؟`)) return;

    setActionId(id);
    try {
      await propertyApi.changeStatus(id, nextStatus);
      await loadAnnouncements();
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-right">
      <main className="container-shell py-28">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">لوحة مراجعة الإعلانات</h1>
            <p className="mt-2 text-slate-600">إدارة الإعلانات وتغيير حالتها من نفس واجهة المشرف.</p>
          </div>
          <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            {meta.totalCount} إعلان
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4">
            <div className="surface-card p-4">
              <h2 className="mb-3 font-semibold text-slate-900">الحالة</h2>
              <div className="space-y-2">
                {statusTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setStatus(tab);
                      setPage(1);
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-right text-sm font-semibold transition ${
                      status === tab ? "bg-slate-950 text-white" : "border bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {statusLabels[tab]}
                  </button>
                ))}
              </div>
            </div>

            <div className="surface-card p-4">
              <h2 className="mb-3 font-semibold text-slate-900">بيانات النظام</h2>
              <LookupLine label="المدن" value={lookups.governorates.length} />
              <LookupLine label="أنواع العقار" value={lookups.propertyTypes.length} />
              <LookupLine label="الأغراض" value={lookups.purposes.length} />
              <LookupLine label="الحالات" value={lookups.statuses.length} />
            </div>
          </aside>

          <section className="surface-card overflow-hidden">
            <div className="border-b bg-white p-5">
              <h2 className="text-xl font-bold text-slate-950">{statusLabels[status]}</h2>
            </div>

            {loading ? (
              <div className="p-10 text-center text-slate-500">جارٍ تحميل الإعلانات...</div>
            ) : error ? (
              <div className="p-10 text-center text-red-600">{error}</div>
            ) : announcements.length === 0 ? (
              <div className="p-10 text-center text-slate-500">لا توجد إعلانات في هذه الحالة.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-4">الإعلان</th>
                      <th className="px-5 py-4">المالك</th>
                      <th className="px-5 py-4">السعر</th>
                      <th className="px-5 py-4">الحالة</th>
                      <th className="px-5 py-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-950">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.type} · {item.city}</p>
                        </td>
                        <td className="px-5 py-4">{item.owner}</td>
                        <td className="px-5 py-4">{item.price.toLocaleString()} جنيه</td>
                        <td className="px-5 py-4">{statusLabels[item.status] || item.status}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            <Link href={`/Properties/${item.id}`} className="rounded-lg border px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                              عرض
                            </Link>
                            <button disabled={actionId === item.id} onClick={() => handleStatusChange(item.id, "Approved")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                              قبول
                            </button>
                            <button disabled={actionId === item.id} onClick={() => handleStatusChange(item.id, "Rejected")} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                              رفض
                            </button>
                            <button disabled={actionId === item.id} onClick={() => handleStatusChange(item.id, "Pending")} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
                              مراجعة
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="border-t p-4">
              <Pagination currentPage={page} totalPages={meta.totalPages} onPageChange={setPage} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function LookupLine({ label, value }) {
  return (
    <div className="flex items-center justify-between border-t py-2 text-sm first:border-t-0">
      <span className="text-slate-600">{label}</span>
      <span className="font-bold text-slate-950">{value}</span>
    </div>
  );
}
