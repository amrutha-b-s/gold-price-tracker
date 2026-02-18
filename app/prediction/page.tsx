"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  day: string;
  price: number;
};

export default function PredictionPage() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    async function fetchGold() {
      const res = await fetch("/api/price");
      const result = await res.json();

      const ouncePrice = result.gold.current;
      const gramUSD = ouncePrice / 31.1035;
      const gramINR = gramUSD * 83;

      setCurrentPrice(gramINR);

      const forecastData: DataPoint[] = [];
      let price = gramINR;

      for (let i = 1; i <= 7; i++) {
        const randomChange = Math.random() * 2 - 1; // -1% to +1%
        price = price * (1 + randomChange / 100);

        forecastData.push({
          day: `Day ${i}`,
          price: Number(price.toFixed(2)),
        });
      }

      setData(forecastData);
    }

    fetchGold();
  }, []);

  if (!data.length)
    return <p style={{ padding: 40 }}>Loading chart...</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <h1
        className="gold-text"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        📊 7-Day Gold Price Forecast (INR)
      </h1>

      <div className="glass-card">
        <h3 style={{ marginBottom: "20px" }}>
          Current Price: ₹{currentPrice.toFixed(2)}
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            {/* WHITE GRID */}
            <CartesianGrid stroke="rgba(255,255,255,0.2)" />

            {/* WHITE AXIS */}
            <XAxis
              dataKey="day"
              stroke="#ffffff"
              tick={{ fill: "#ffffff" }}
            />
            <YAxis
              stroke="#ffffff"
              tick={{ fill: "#ffffff" }}
            />

            {/* WHITE TOOLTIP BORDER */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #ffffff",
                borderRadius: "10px",
                color: "white",
              }}
            />

            {/* WHITE LINE */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ fill: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
``
