import Link from "next/link";

export default function Footer() {
  // footer been added.
  return (
    <footer className="border-t border-slate-200 bg-white text-right">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3 justify-start">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                🏠
              </div>
              <span className="text-lg font-bold text-slate-900">Darak</span>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              منصة عقارات بدون وسطاء، توفر إعلانات موثوقة، تواصل مباشر مع المالكين،
              واكتشاف ذكي باستخدام الذكاء الاصطناعي.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              المنتجات
            </h3>

            <div className="space-y-3 text-sm text-slate-600">
              <Link href="/Search?type=sale" className="block hover:text-slate-900">
                شراء
              </Link>
              <Link href="/Search?type=rent" className="block hover:text-slate-900">
                إيجار
              </Link>
              <Link href="/Add-property" className="block hover:text-slate-900">
                أضف عقارك
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              الشركة
            </h3>

            <div className="space-y-3 text-sm text-slate-600">
              <Link href="/About" className="block hover:text-slate-900">
                من نحن
              </Link>
              <Link href="/Agencies" className="block hover:text-slate-900">
                الوكالات
              </Link>
              <Link href="/Auth" className="block hover:text-slate-900">
                تسجيل الدخول
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              التحديثات
            </h3>

            <p className="mb-3 text-sm text-slate-600">
              احصل على أفضل العقارات وتحليلات السوق أسبوعيًا.
            </p>

            <form className="flex gap-2">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />

              <button className="btn-primary px-4 py-2 text-sm">
                اشتراك
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 text-center">
          © 2026 Darak. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}