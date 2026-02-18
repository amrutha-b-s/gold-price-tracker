function calculatePercent(current: number, old: number) {
  return ((current - old) / old) * 100;
}

function calculateAmount(current: number, old: number) {
  return current - old;
}

async function fetchHistorical(symbol: string) {
  const now = Math.floor(Date.now() / 1000);
  const oneYearAgo = now - 365 * 24 * 60 * 60;

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${oneYearAgo}&period2=${now}&interval=1d`;

  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const data = await response.json();

  const closes =
    data.chart.result[0].indicators.quote[0].close;

  return closes.filter((v: number | null) => v !== null);
}

export async function GET() {
  try {
    const metals = {
      gold: "GC=F",
      silver: "SI=F",
      platinum: "PL=F",
    };

    const result: any = {};

    for (const [name, symbol] of Object.entries(metals)) {
      const closes = await fetchHistorical(symbol);

      const latest = closes[closes.length - 1];
      const weekAgo = closes[closes.length - 7];
      const monthAgo = closes[closes.length - 30];
      const yearAgo = closes[0];

      result[name] = {
        current: latest,

        weeklyAmount: calculateAmount(latest, weekAgo),
        weeklyPercent: calculatePercent(latest, weekAgo),

        monthlyAmount: calculateAmount(latest, monthAgo),
        monthlyPercent: calculatePercent(latest, monthAgo),

        yearlyAmount: calculateAmount(latest, yearAgo),
        yearlyPercent: calculatePercent(latest, yearAgo),
      };
    }

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch data" });
  }
}
