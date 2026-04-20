import Link from "next/link";

export default function AgenciesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="grow pb-14 pt-28">
        <div className="container-shell max-w-5xl">
          <div className="surface-card p-10 text-center">
            <h1 className="text-4xl font-bold text-slate-900">Real Estate Agencies</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We are onboarding verified agencies to provide trusted listings and a consistent search experience.
            </p>
            <p className="mt-6 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
              Agency directory is coming soon.
            </p>
            <Link href="/" className="btn-primary mt-8">Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
