import { Suspense } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "MAWA",
  description: "Broker-free real estate platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">

        {/* 🔥 حل المشكلة هنا */}
        <Suspense fallback={null}>
          <Header />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}