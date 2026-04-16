"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "Buy", path: "/Search?type=sale" },
  { name: "Rent", path: "/Search?type=rent" },
  { name: "Agencies", path: "/Agencies" },
  { name: "About", path: "/About" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "border-slate-200/80 bg-white/95 backdrop-blur"
          : "border-transparent bg-white/80"
      }`}
    >
      <div className="container-shell">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/30">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">MAWA</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/Auth" className="btn-secondary px-4 py-2.5 text-sm">
              Sign In
            </Link>
            <Link href="/Add-property" className="btn-primary px-4 py-2.5 text-sm">
              List Property
            </Link>
          </div>

          <button
            className="rounded-lg p-2 text-slate-700 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-shell space-y-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/Auth" className="btn-secondary px-3 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/Add-property" className="btn-primary px-3 py-2 text-sm" onClick={() => setIsMenuOpen(false)}>
                List
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
