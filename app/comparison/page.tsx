"use client";

import { useEffect, useState } from "react";

/* ===============================
   COUNTRY LIST (20 Major)
================================= */

const countries = [
  { name: "United States", code: "+1", currency: "USD", symbol: "$", rate: 1, tax: 0.07, flag: "🇺🇸" },
  { name: "India", code: "+91", currency: "INR", symbol: "₹", rate: 83, tax: 0.03, flag: "🇮🇳" },
  { name: "United Kingdom", code: "+44", currency: "GBP", symbol: "£", rate: 0.79, tax: 0.20, flag: "🇬🇧" },
  { name: "Canada", code: "+1", currency: "CAD", symbol: "C$", rate: 1.35, tax: 0.05, flag: "🇨🇦" },
  { name: "Australia", code: "+61", currency: "AUD", symbol: "A$", rate: 1.52, tax: 0.10, flag: "🇦🇺" },
  { name: "Germany", code: "+49", currency: "EUR", symbol: "€", rate: 0.92, tax: 0.19, flag: "🇩🇪" },
  { name: "France", code: "+33", currency: "EUR", symbol: "€", rate: 0.92, tax: 0.20, flag: "🇫🇷" },
  { name: "Italy", code: "+39", currency: "EUR", symbol: "€", rate: 0.92, tax: 0.22, flag: "🇮🇹" },
  { name: "UAE", code: "+971", currency: "AED", symbol: "د.إ", rate: 3.67, tax: 0.05, flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", currency: "SAR", symbol: "﷼", rate: 3.75, tax: 0.15, flag: "🇸🇦" },
  { name: "Singapore", code: "+65", currency: "SGD", symbol: "S$", rate: 1.34, tax: 0.07, flag: "🇸🇬" },
  { name: "Japan", code: "+81", currency: "JPY", symbol: "¥", rate: 150, tax: 0.10, flag: "🇯🇵" },
  { name: "China", code: "+86", currency: "CNY", symbol: "¥", rate: 7.2, tax: 0.13, flag: "🇨🇳" },
  { name: "South Korea", code: "+82", currency: "KRW", symbol: "₩", rate: 1350, tax: 0.10, flag: "🇰🇷" },
  { name: "Qatar", code: "+974", currency: "QAR", symbol: "﷼", rate: 3.64, tax: 0.05, flag: "🇶🇦" },
  { name: "Kuwait", code: "+965", currency: "KWD", symbol: "د.ك", rate: 0.31, tax: 0.05, flag: "🇰🇼" },
  { name: "Switzerland", code: "+41", currency: "CHF", symbol: "CHF", rate: 0.88, tax: 0.08, flag: "🇨🇭" },
  { name: "Malaysia", code: "+60", currency: "MYR", symbol: "RM", rate: 4.7, tax: 0.06, flag: "🇲🇾" },
  { name: "Thailand", code: "+66", currency: "THB", symbol: "฿", rate: 35, tax: 0.07, flag: "🇹🇭" },
  { name: "South Africa", code: "+27", currency: "ZAR", symbol: "R", rate: 18.5, tax: 0.15, flag: "🇿🇦" },
];

export default function ComparisonPage() {
  const [goldPerGramUSD, setGoldPerGramUSD] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchGoldPrice() {
      const res = await fetch("https://api.gold-api.com/price/XAU");
      const data = await res.json();
      const gram = data.price / 31.1035;
      setGoldPerGramUSD(gram);
    }
    fetchGoldPrice();
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  let priceLocal = 0;
  let priceWithTaxLocal = 0;
  let priceINR = 0;
  let priceWithTaxINR = 0;

  if (goldPerGramUSD && selectedCountry) {
    priceLocal = goldPerGramUSD * selectedCountry.rate;
    priceWithTaxLocal = priceLocal * (1 + selectedCountry.tax);
    priceINR = goldPerGramUSD * 83;
    priceWithTaxINR = priceINR * (1 + selectedCountry.tax);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1 className="gold-text" style={{ marginBottom: "30px" }}>
        🌍 Gold Comparison (1 Gram)
      </h1>

      {/* SEARCH */}
      <div style={{ position: "relative", marginBottom: "30px" }}>
        <div
          className="glass-card"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          🔍 {selectedCountry ? selectedCountry.name : "Search Country"}
        </div>

        {open && (
          <div className="glass-card" style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Type country name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                border: "none",
                color: "white",
                borderBottom: "1px solid rgba(255,215,0,0.3)",
              }}
            />

            {filteredCountries.map((c) => (
              <div
                key={c.name}
                onClick={() => {
                  setSelectedCountry(c);
                  setOpen(false);
                  setSearch("");
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                {c.flag} {c.name} ({c.code})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RESULT */}
      {selectedCountry && goldPerGramUSD && (
        <div className="glass-card">
          <h2 style={{ marginBottom: "20px" }}>
            {selectedCountry.flag} {selectedCountry.name}
          </h2>

          <p>
            💰 No Tax:{" "}
            <strong>
              {selectedCountry.symbol}
              {priceLocal.toFixed(2)} {selectedCountry.currency}
            </strong>
          </p>

          <p>
            🧾 With Tax:{" "}
            <strong>
              {selectedCountry.symbol}
              {priceWithTaxLocal.toFixed(2)} {selectedCountry.currency}
            </strong>
          </p>

          <hr style={{ margin: "20px 0", borderColor: "rgba(255,215,0,0.3)" }} />

          <p>
            🇮🇳 INR (No Tax):{" "}
            <strong>₹{priceINR.toFixed(2)}</strong>
          </p>

          <p>
            🇮🇳 Imported to India (With Tax):{" "}
            <strong>₹{priceWithTaxINR.toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
