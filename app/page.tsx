"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/price")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const USD_TO_INR = 83;
  const OUNCE_TO_GRAM = 31.1035;

  const convertToINRPerGram = (usdPerOunce: number) => {
    const usdPerGram = usdPerOunce / OUNCE_TO_GRAM;
    return usdPerGram * USD_TO_INR;
  };

  const convertChangeToINR = (usdAmount: number) => {
    const inrPerGram = (usdAmount / OUNCE_TO_GRAM) * USD_TO_INR;
    return inrPerGram;
  };

  const formatChange = (usdAmount: number, percent: number) => {
    const inrAmount = convertChangeToINR(usdAmount);
    const isPositive = percent >= 0;

    return (
      <p style={{ color: isPositive ? "green" : "red" }}>
        {isPositive ? "+" : ""}
        ₹{inrAmount.toFixed(2)} ({isPositive ? "+" : ""}
        {percent.toFixed(2)}%)
      </p>
    );
  };

  if (!data) return <h2 style={{ padding: 40 }}>Loading...</h2>;

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>💰 Metal Price Dashboard (INR Focus)</h1>

      {Object.entries(data).map(([metal, values]: any) => {
        const inrPerGram = convertToINRPerGram(values.current);

        return (
          <div
            key={metal}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              margin: 20,
              borderRadius: 12,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ textTransform: "uppercase" }}>{metal}</h2>

            {/* Price Display */}
            <p>
              <strong>USD:</strong> ${values.current.toFixed(2)} per ounce
            </p>

            <p>
              <strong>INR:</strong> ₹{inrPerGram.toFixed(2)} per gram
            </p>

            {/* Weekly */}
            <h4>Weekly Change</h4>
            {formatChange(values.weeklyAmount, values.weeklyPercent)}

            {/* Monthly */}
            <h4>Monthly Change</h4>
            {formatChange(values.monthlyAmount, values.monthlyPercent)}

            {/* Yearly */}
            <h4>Yearly Change</h4>
            {formatChange(values.yearlyAmount, values.yearlyPercent)}
          </div>
        );
      })}
    </main>
  );
}
