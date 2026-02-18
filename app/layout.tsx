import "./globals.css";

export const metadata = {
  title: "Global Gold Price Tracker",
  description: "Luxury Gold Metal Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Golden Particle Background */}
        <div className="gold-particles"></div>

        {children}
      </body>
    </html>
  );
}
