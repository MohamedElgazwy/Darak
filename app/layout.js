import { Suspense } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// starting dev branch
export const metadata = {
  title: "MAWA",
  description: "Broker-free real estate platform",
};

export default function RootLayout({ children }) {
  const local = 'ar';
  return (
    <html lang={local} dir={local === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased flex min-h-screen flex-col">

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