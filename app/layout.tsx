import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gold Price Tracker | Live Gold Comparison & Ranking",
  description:
    "Track live gold prices per gram. Compare gold prices across countries, check cheapest country to buy gold, and view 7-day gold price prediction.",
  keywords: [
    "gold price",
    "gold price today",
    "gold comparison",
    "cheapest gold country",
    "gold ranking",
    "gold prediction",
    "gold price per gram",
    "gold price in INR"
  ],
  openGraph: {
    title: "Gold Price Tracker",
    description:
      "Live gold comparison, ranking and prediction dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* ================= NAVBAR ================= */}
        <nav className="navbar">
          <div className="gold-text">🪙 Gold Tracker</div>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/comparison">Comparison</Link>
            <Link href="/ranking">Ranking</Link>
            <Link href="/prediction">Prediction</Link>
          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        {children}

      </body>
    </html>
  );
}
