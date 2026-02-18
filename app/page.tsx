"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* =========================
     FETCH METAL DATA
  ========================== */
  useEffect(() => {
    fetch("/api/price")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  /* =========================
     PLAY BELL FUNCTION
  ========================== */
  const playBell = () => {
    if (isPlaying) return;

    if (!audioRef.current) {
      audioRef.current = new Audio("/temple-bell.mp3");
    }

    const audio = audioRef.current;
    audio.volume = volume;
    audio.currentTime = 0;

    setIsPlaying(true);
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }, 5000);
  };

  const USD_TO_INR = 83;
  const OUNCE_TO_GRAM = 31.1035;

  const convertToINRPerGram = (usdPerOunce: number) =>
    (usdPerOunce / OUNCE_TO_GRAM) * USD_TO_INR;

  const convertChangeToINR = (usdAmount: number) =>
    (usdAmount / OUNCE_TO_GRAM) * USD_TO_INR;

  const formatChange = (usdAmount: number, percent: number) => {
    const inrAmount = convertChangeToINR(usdAmount);
    const isPositive = percent >= 0;

    return (
      <p style={{ color: isPositive ? "#4CAF50" : "#ff4d4d" }}>
        {isPositive ? "+" : ""}
        ₹{inrAmount.toFixed(2)} ({isPositive ? "+" : ""}
        {percent.toFixed(2)}%)
      </p>
    );
  };

  if (!data) return <h2 style={{ padding: 40 }}>Loading...</h2>;

  return (
    <main style={{ padding: 60 }}>
      <h1 className="gold-text" style={{ marginBottom: 40 }}>
        🏵 Metal Price Dashboard (INR Focus)
      </h1>

      {/* 🔔 BELL SECTION */}
      <div style={{ marginBottom: 50, textAlign: "center" }}>
        <div className={`bell-wrapper ${isPlaying ? "active" : ""}`}>
          <button
            onClick={playBell}
            disabled={isPlaying}
            className={`bell-button ${isPlaying ? "ringing" : ""}`}
          >
            🔔
          </button>
          <span className="ripple"></span>
        </div>

        <div style={{ marginTop: 15 }}>
          <label style={{ marginRight: 10 }}>
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>

      {/* METAL CARDS */}
      {Object.entries(data).map(([metal, values]: any) => {
        const inrPerGram = convertToINRPerGram(values.current);

        return (
          <div key={metal} className="luxury-card">
            <h2 style={{ textTransform: "uppercase" }}>{metal}</h2>

            <p>
              <strong>USD:</strong> ${values.current.toFixed(2)} per ounce
            </p>

            <p>
              <strong>INR:</strong> ₹{inrPerGram.toFixed(2)} per gram
            </p>

            <hr style={{ margin: "15px 0" }} />

            <h4>Weekly Change</h4>
            {formatChange(values.weeklyAmount, values.weeklyPercent)}

            <h4>Monthly Change</h4>
            {formatChange(values.monthlyAmount, values.monthlyPercent)}

            <h4>Yearly Change</h4>
            {formatChange(values.yearlyAmount, values.yearlyPercent)}
          </div>
        );
      })}
    </main>
  );
}
