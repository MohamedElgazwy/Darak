import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دارك - تسجيل الدخول",
  description: "منصة دارك العقارية - ابحث عن منزل أحلامك",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-cairo">
        {children}
      </body>
    </html>
  );
}
