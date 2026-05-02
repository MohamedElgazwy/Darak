import Link from "next/link";

const agencies = [
  {
    name: "Capital Real Estate",
    description: "وكالة متخصصة في العقارات الفاخرة في القاهرة الجديدة والعاصمة الإدارية.",
  },
  {
    name: "Urban Homes",
    description: "خبرة في الشقق السكنية الحديثة والمشاريع المتكاملة.",
  },
  {
    name: "Elite Properties",
    description: "تقديم حلول عقارية مميزة للمستثمرين والعملاء.",
  },
];

export default function AgenciesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-right">
      <main className="grow pb-14 pt-28">
        <div className="container-shell max-w-6xl">

          {/* 🔷 Hero */}
          <div className="surface-card p-10 text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-900">
              الوكالات العقارية
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              اكتشف أفضل الوكالات العقارية الموثوقة، وتواصل مباشرة للحصول على أفضل الفرص العقارية.
            </p>

            <div className="mt-6 inline-block rounded-xl bg-indigo-50 px-5 py-3 text-sm font-medium text-indigo-700">
              جميع الوكالات موثقة لضمان تجربة آمنة وموثوقة
            </div>
          </div>

          {/* 🔷 Agencies List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {agencies.map((agency, index) => (
              <div
                key={index}
                className="surface-card p-6 hover:shadow-lg transition group"
              >
                {/* Avatar */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                      {agency.name[0]}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                      {agency.name}
                    </h3>
                  </div>

                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    موثقة
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-6">
                  {agency.description}
                </p>

                {/* Actions */}
                <div className="mt-5 flex justify-between items-center">
                  <Link
                    href="/Search"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    عرض العقارات
                  </Link>

                  <button className="text-xs text-slate-500 hover:text-slate-700">
                    تواصل
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* 🔷 CTA Section */}
          <div className="mt-12 rounded-3xl bg-indigo-600 p-10 text-center text-white">
            <h2 className="text-3xl font-bold">
              هل أنت وكالة عقارية؟
            </h2>

            <p className="mt-3 text-indigo-100">
              انضم إلى MAWA وابدأ في عرض عقاراتك والوصول إلى آلاف العملاء.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row-reverse justify-center gap-3">
              <Link
                href="/Add-property"
                className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
              >
                انضم الآن
              </Link>

              <Link
                href="/Contact"
                className="border border-white/60 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                تواصل معنا
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}