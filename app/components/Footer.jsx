import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                M
              </div>
              <span className="text-lg font-bold text-slate-900">MAWA</span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Broker-free real estate with verified listings, owner-direct communication, and AI-powered discovery.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">Product</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <Link href="/Search?type=sale" className="block hover:text-slate-900">Buy</Link>
              <Link href="/Search?type=rent" className="block hover:text-slate-900">Rent</Link>
              <Link href="/Add-property" className="block hover:text-slate-900">List Property</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">Company</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <Link href="/About" className="block hover:text-slate-900">About</Link>
              <Link href="/Agencies" className="block hover:text-slate-900">Agencies</Link>
              <Link href="/Auth" className="block hover:text-slate-900">Sign in</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">Updates</h3>
            <p className="mb-3 text-sm text-slate-600">Get top properties and market insights weekly.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <button className="btn-primary px-4 py-2 text-sm">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2026 MAWA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
