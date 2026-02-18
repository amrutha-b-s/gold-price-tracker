"use client";

import { useEffect, useState } from "react";

type Country = {
  name: string;
  currency: string;
  symbol: string;
  rateToUSD: number;
  taxPercent: number;
  flag: string;
};

const countries: Country[] = [
  { name: "Hong Kong", currency: "HKD", symbol: "HK$", rateToUSD: 7.8, taxPercent: 0, flag: "🇭🇰" },
  { name: "Singapore", currency: "SGD", symbol: "S$", rateToUSD: 1.35, taxPercent: 0, flag: "🇸🇬" },
  { name: "Switzerland", currency: "CHF", symbol: "CHF", rateToUSD: 0.9, taxPercent: 0, flag: "🇨🇭" },
  { name: "UAE", currency: "AED", symbol: "د.إ", rateToUSD: 3.67, taxPercent: 5, flag: "🇦🇪" },
  { name: "Saudi Arabia", currency: "SAR", symbol: "﷼", rateToUSD: 3.75, taxPercent: 5, flag: "🇸🇦" },
  { name: "USA", currency: "USD", symbol: "$", rateToUSD: 1, taxPercent: 5, flag: "🇺🇸" },
  { name: "Canada", currency: "CAD", symbol: "C$", rateToUSD: 1.35, taxPercent: 0, flag: "🇨🇦" },
  { name: "Australia", currency: "AUD", symbol: "A$", rateToUSD: 1.52, taxPercent: 0, flag: "🇦🇺" },
  { name: "Japan", currency: "JPY", symbol: "¥", rateToUSD: 150, taxPercent: 10, flag: "🇯🇵" },
  { name: "Malaysia", currency: "MYR", symbol: "RM", rateToUSD: 4.7, taxPercent: 6, flag: "🇲🇾" },
  { name: "South Korea", currency: "KRW", symbol: "₩", rateToUSD: 1300, taxPercent: 10, flag: "🇰🇷" },
  { name: "Thailand", currency: "THB", symbol: "฿", rateToUSD: 35, taxPercent: 7, flag: "🇹🇭" },
  { name: "South Africa", currency: "ZAR", symbol: "R", rateToUSD: 18, taxPercent: 15, flag: "🇿🇦" },
  { name: "United Kingdom", currency: "GBP", symbol: "£", rateToUSD: 0.79, taxPercent: 20, flag: "🇬🇧" },
  { name: "Germany", currency: "EUR", symbol: "€", rateToUSD: 0.92, taxPercent: 19, flag: "🇩🇪" },
  { name: "France", currency: "EUR", symbol: "€", rateToUSD: 0.92, taxPercent: 20, flag: "🇫🇷" },
  { name: "Italy", currency: "EUR", symbol: "€", rateToUSD: 0.92, taxPercent: 22, flag: "🇮🇹" },
  { name: "Brazil", currency: "BRL", symbol: "R$", rateToUSD: 5, taxPercent: 18, flag: "🇧🇷" },
  { name: "China", currency: "CNY", symbol: "¥", rateToUSD: 7.2, taxPercent: 13, flag: "🇨🇳" },
  { name: "India", currency: "INR", symbol: "₹", rateToUSD: 83, taxPercent: 18, flag: "🇮🇳" },
];

export default function RankingPage() {
  const [goldPerGramUSD, setGoldPerGramUSD] = useState<number>(0);

  useEffect(() => {
    async function fetchGold() {
      const res = await fetch("/api/price");
      const data = await res.json();
      const gramPrice = data.gold.current / 31.1035;
      setGoldPerGramUSD(gramPrice);
    }
    fetchGold();
  }, []);

  if (!goldPerGramUSD) return <p style={{ padding: 40 }}>Loading...</p>;

  const INR_RATE = 83;

  const calculated = countries.map((c) => {
    const localPrice = goldPerGramUSD * c.rateToUSD;
    const localWithTax = localPrice + (localPrice * c.taxPercent) / 100;
    const inrWithTax = (goldPerGramUSD * INR_RATE) * (1 + c.taxPercent / 100);

    return {
      ...c,
      finalLocal: localWithTax,
      finalINR: inrWithTax,
    };
  });

  const sorted = [...calculated].sort((a, b) => a.finalINR - b.finalINR);

  const cheapest = sorted[0];
  const highest = sorted[sorted.length - 1];

  return (
    <div style={{ padding: "80px", textAlign: "center", color: "white" }}>
      <h1 className="gold-text" style={{ marginBottom: "60px" }}>
        🏆 Gold Price Ranking (1 Gram)
      </h1>

      {/* CHEAPEST */}
      <div className="luxury-card">
        <h2 style={{ color: "#4CAF50" }}>Cheapest Country</h2>

        <div className="flag-wrapper">
          <span className="big-flag">{cheapest.flag}</span>
          <span className="corner-crown">👑</span>
        </div>

        <h3 style={{ marginTop: "20px" }}>
          ₹{cheapest.finalINR.toFixed(2)}
        </h3>

        <p>
          {cheapest.symbol}
          {cheapest.finalLocal.toFixed(2)} {cheapest.currency}
        </p>

        <h3 style={{ marginTop: "15px" }}>{cheapest.name}</h3>
      </div>

      <div style={{ height: "60px" }} />

      {/* EXPENSIVE */}
      <div className="luxury-card">
        <h2 style={{ color: "#ff4d4d" }}>Most Expensive Country</h2>

        <div className="flag-wrapper">
          <span className="big-flag">{highest.flag}</span>
        </div>

        <h3 style={{ marginTop: "20px" }}>
          ₹{highest.finalINR.toFixed(2)}
        </h3>

        <p>
          {highest.symbol}
          {highest.finalLocal.toFixed(2)} {highest.currency}
        </p>

        <h3 style={{ marginTop: "15px" }}>{highest.name}</h3>
      </div>
    </div>
  );
}
