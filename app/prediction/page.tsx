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

  if (!data.length) return <p style={{ padding: 40 }}>Loading chart...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center" }}>
        📊 7-Day Gold Price Forecast (INR)
      </h1>

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          background: "white",
        }}
      >
        <h3>Current Price: ₹{currentPrice.toFixed(2)}</h3>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#d4af37"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
