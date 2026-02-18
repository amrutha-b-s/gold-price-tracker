import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>

        <nav className="navbar">
          <div className="gold-text">🪙 Gold Tracker</div>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/comparison">Comparison</Link>
            <Link href="/ranking">Ranking</Link>
            <Link href="/prediction">Prediction</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
