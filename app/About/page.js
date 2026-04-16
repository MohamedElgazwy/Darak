import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const benefits = [
  "Zero commission fees",
  "Direct communication with verified owners",
  "AI-powered property search",
  "Transparent and secure process",
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="grow pb-14 pt-28">
        <div className="container-shell max-w-4xl">
          <div className="surface-card p-8 sm:p-10">
            <h1 className="text-4xl font-bold text-slate-900">About MAWA</h1>
            <p className="mt-3 text-lg text-slate-600">
              MAWA is a broker-free real estate platform built to simplify buying and renting in Egypt.
            </p>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
              <p className="mt-3 leading-7 text-slate-600">
                We connect property seekers and owners directly to create a more transparent, efficient, and trustworthy experience.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-slate-900">Why choose MAWA</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {benefits.map((item) => (
                  <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn-secondary">Back to Home</Link>
              <Link href="/Search" className="btn-primary">Browse Properties</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
