import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Link from "next/link";

const featuredProperties = [
  {
    title: "Luxury Villa in New Cairo",
    price: "$350,000",
    details: "4 beds · 3 baths · 3000 sqft",
    description: "Modern layout, premium finishes, and immediate access to top schools.",
  },
  {
    title: "Spacious Apartment in Maadi",
    price: "$1,500/mo",
    details: "3 beds · 2 baths · 1800 sqft",
    description: "Family-ready apartment with natural light and great neighborhood access.",
  },
  {
    title: "Studio in Downtown",
    price: "$120,000",
    details: "1 bed · 1 bath · 600 sqft",
    description: "Compact home with modern interiors for young professionals.",
  },
];

const features = [
  {
    title: "Smart Search",
    description: "Use AI filters to surface homes that match your exact budget and preferences.",
  },
  {
    title: "Direct Contact",
    description: "Message verified owners and agencies directly with zero broker dependence.",
  },
  {
    title: "Secure Process",
    description: "Move with confidence using verified profiles and transparent listing data.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <section className="section-padding">
          <div className="container-shell">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">Featured Properties</h2>
              <p className="mt-2 text-slate-600">A curated collection of high-demand listings.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredProperties.map((item) => (
                <article key={item.title} className="surface-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 h-40 rounded-xl bg-slate-100" />
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-2xl font-bold text-indigo-600">{item.price}</p>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{item.details}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/Search" className="btn-secondary">
                Explore all properties
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-shell">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">How MAWA Works</h2>
              <p className="mt-2 text-slate-600">Three simple steps to discover your next home.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="surface-card p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-shell">
            <div className="rounded-3xl bg-indigo-600 px-6 py-12 text-center text-white sm:px-10">
              <h2 className="text-3xl font-bold">Ready to find your dream property?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-indigo-100">
                Join thousands of seekers and owners building direct, trusted property transactions.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/Search?type=sale" className="btn-secondary border-white/50 bg-white text-indigo-700 hover:bg-indigo-50">
                  Browse Properties
                </Link>
                <Link href="/Add-property" className="rounded-xl border border-white/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
