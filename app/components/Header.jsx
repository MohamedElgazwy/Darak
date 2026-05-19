"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const publicNav = [
  { name: "شراء", path: "/Search", query: { type: "sale" } },
  { name: "إيجار", path: "/Search", query: { type: "rent" } },
  { name: "الوكالات", path: "/Agencies" },
  { name: "من نحن", path: "/About" },
];

const adminNav = [
  { name: "المستخدمون", path: "/Admin/Users" },
  { name: "الإعلانات", path: "/Admin/Dashboard" },
  { name: "الباقات", path: "/Admin/Packages" },
  { name: "المدفوعات", path: "/Admin/Payments" },
  { name: "نبذة الشركة", path: "/Admin/CompanyAbouts" },
];

function getUserRoles() {
  if (typeof window === "undefined") return [];
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return Array.isArray(user?.roles) ? user.roles : [];
  } catch {
    return [];
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const roles = getUserRoles();
    setIsAdmin(roles.includes("Admin") || roles.includes("SuperAdmin"));
  }, [pathname]);

  const isActive = (link) => {
    if (link.path !== pathname) return false;
    if (link.query) {
      return Object.entries(link.query).every(([k, v]) => searchParams.get(k) === v);
    }
    return true;
  };

  const buildHref = (link) => {
    if (!link.query) return link.path;
    return `${link.path}?${new URLSearchParams(link.query).toString()}`;
  };

  const handleLogout = () => {
    ["authToken", "token", "user"].forEach((k) => localStorage.removeItem(k));
    window.location.href = "/Auth/login";
  };

  return (
    <header
      dir="rtl"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "border-b border-slate-200 bg-[rgb(var(--card-bg))]/90 shadow-sm backdrop-blur-xl"
          : "bg-[rgb(var(--card-bg))]/70 backdrop-blur-md"
      }`}
    >
      <div className="container-shell">
        <div className="flex h-20 flex-row-reverse items-center justify-between">

          {/* Left side: Nav + Actions */}
          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-5">
              {publicNav.map((link) => (
                <Link
                  key={link.name}
                  href={buildHref(link)}
                  className={`relative text-sm font-medium transition ${
                    isActive(link) ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-indigo-600 transition-all duration-300 ${
                      isActive(link) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              ))}

              {/* Admin dropdown */}
              {isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setShowAdminMenu((p) => !p)}
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    <span>الإدارة</span>
                    <svg className={`h-4 w-4 transition-transform ${showAdminMenu ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showAdminMenu && (
                    <div className="absolute right-0 top-8 z-50 w-48 rounded-xl border border-slate-100 bg-white py-2 shadow-xl">
                      {adminNav.map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          onClick={() => setShowAdminMenu(false)}
                          className={`block px-4 py-2.5 text-sm transition ${
                            pathname === link.path
                              ? "bg-indigo-50 text-indigo-600 font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/Dashboard" className="rounded-full border border-slate-300 px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100">
                    لوحتي
                  </Link>
                  <button onClick={handleLogout} className="rounded-full border border-slate-300 px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100">
                    خروج
                  </button>
                </>
              ) : (
                <Link href="/Auth/login" className="rounded-full border border-slate-300 px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100">
                  تسجيل دخول
                </Link>
              )}
              <Link href="/Add-property" className="rounded-full bg-indigo-600 px-3 py-2 text-xs text-white shadow-sm transition hover:bg-indigo-700">
                أضف عقار
              </Link>
            </div>
          </div>

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/30 transition group-hover:scale-105">
              🏠
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Darak</span>
          </Link>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((p) => !p)}
            className="p-2 rounded-lg text-slate-700 md:hidden"
          >
            <div className="space-y-1">
              <span className={`block h-[2px] w-6 bg-black transition ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-6 bg-black transition ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-6 bg-black transition ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-[500px] border-t border-slate-200" : "max-h-0"
        }`}
      >
        <div className="space-y-1 bg-[rgb(var(--card-bg))] px-4 py-4 text-right container-shell">
          {publicNav.map((link) => (
            <Link
              key={link.name}
              href={buildHref(link)}
              onClick={() => setIsMenuOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm transition ${
                isActive(link) ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && adminNav.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 transition"
            >
              {link.name} (أدمن)
            </Link>
          ))}

          <div className="grid grid-cols-2 gap-2 pt-3">
            {isLoggedIn ? (
              <>
                <Link href="/Dashboard" className="rounded-full border border-slate-300 py-2 text-center text-sm" onClick={() => setIsMenuOpen(false)}>لوحتي</Link>
                <button onClick={handleLogout} className="rounded-full border border-slate-300 py-2 text-sm">خروج</button>
              </>
            ) : (
              <Link href="/Auth/login" className="rounded-full border border-slate-300 py-2 text-center text-sm" onClick={() => setIsMenuOpen(false)}>دخول</Link>
            )}
            <Link href="/Add-property" className="rounded-full bg-indigo-600 py-2 text-center text-sm text-white" onClick={() => setIsMenuOpen(false)}>أضف</Link>
          </div>
        </div>
      </div>
    </header>
  );
}