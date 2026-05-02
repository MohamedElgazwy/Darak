import HeroSection from "./components/HeroSection";
import Link from "next/link";

const featuredProperties = [
  {
    title: "فيلا فاخرة في القاهرة الجديدة",
    price: "350,000$",
    details: "4 غرف · 3 حمامات · 3000 قدم²",
    description: "تصميم عصري وتشطيبات فاخرة وقريبة من أفضل المدارس.",
  },
  {
    title: "شقة واسعة في المعادي",
    price: "1500$/شهريًا",
    details: "3 غرف · 2 حمام · 1800 قدم²",
    description: "شقة مناسبة للعائلات بإضاءة طبيعية وموقع مميز.",
  },
  {
    title: "استوديو في وسط البلد",
    price: "120,000$",
    details: "غرفة · حمام · 600 قدم²",
    description: "وحدة حديثة مناسبة للشباب والمحترفين.",
  },
];

const features = [
  {
    title: "بحث ذكي",
    description: "استخدم فلاتر متقدمة للوصول للعقار المناسب حسب ميزانيتك واحتياجاتك.",
  },
  {
    title: "تواصل مباشر",
    description: "تواصل مباشرة مع المالكين بدون وسطاء.",
  },
  {
    title: "عملية آمنة",
    description: "تعامل بثقة من خلال بيانات موثقة وشفافة.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-right">
      <main className="flex-grow">
        <HeroSection />

        {/* عقارات مميزة */}
        <section className="section-padding">
          <div className="container-shell">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">عقارات مميزة</h2>
              <p className="mt-2 text-slate-600">مجموعة مختارة من أفضل العقارات المتاحة.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredProperties.map((item) => (
                <article
                  key={item.title}
                  className="surface-card p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 h-40 rounded-xl bg-slate-100" />

                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-2xl font-bold text-indigo-600">
                    {item.price}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    {item.description}
                  </p>

                  <p className="mt-4 text-xs font-medium tracking-wide text-slate-500">
                    {item.details}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/Search" className="btn-secondary">
                استعرض جميع العقارات
              </Link>
            </div>
          </div>
        </section>

        {/* كيف يعمل دارك */}
        <section className="section-padding bg-white">
          <div className="container-shell">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                كيف يعمل دارك
              </h2>
              <p className="mt-2 text-slate-600">
                3 خطوات بسيطة للعثور على منزلك المثالي.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="surface-card p-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-shell">
            <div className="rounded-3xl bg-indigo-600 px-6 py-12 text-center text-white sm:px-10">
              <h2 className="text-3xl font-bold">
                جاهز للعثور على عقارك المثالي؟
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-indigo-100">
                انضم لآلاف المستخدمين وابدأ رحلتك في شراء أو بيع العقارات بدون وسطاء.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/Search?type=sale"
                  className="btn-secondary border-white/50 bg-white text-indigo-700 hover:bg-indigo-50"
                >
                  تصفح العقارات
                </Link>

                <Link
                  href="/Add-property"
                  className="rounded-xl border border-white/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  أضف عقارك
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}