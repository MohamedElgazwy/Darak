import "./globals.css";

export const metadata = {
  title: "MAWA",
  description: "Broker-free real estate platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
