import { useEffect, useState } from "react";
import { CpuChart } from "./components/CpuChart";
import { fetchCpuMetrics } from "./services/awsService";
import type { CpuData } from "./types/aws";

function App() {
  const [data, setData] = useState<CpuData[]>([]);
  const [range, setRange] = useState<number>(60);
  const instanceId = "i-04a68bbbcac63d5cb";

  const loadData = async (selectedRange: number) => {
    try {
      const metrics = await fetchCpuMetrics(instanceId, selectedRange);
      setData(metrics);
    } catch (error) {
      console.error("Failed to load metrics", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData(range);
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, [range]);

  const stats = {
    avg:
      data.length > 0
        ? (
            data.reduce((acc, curr) => acc + curr.average, 0) / data.length
          ).toFixed(2)
        : "0.00",
    max:
      data.length > 0
        ? Math.max(...data.map((d) => d.average)).toFixed(2)
        : "0.00",
    min:
      data.length > 0
        ? Math.min(...data.map((d) => d.average)).toFixed(2)
        : "0.00",
  };

  return (
    <div style={containerStyle}>
      <main style={mainStyle}>
        <header style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ margin: 0, color: "#111827" }}>
            Cloud Monitoring Dashboard
          </h1>
          <p style={{ color: "#6b7280" }}>
            Real-time CPU metrics for:{" "}
            <code
              style={{
                background: "#f3f4f6",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {instanceId}
            </code>
          </p>
        </header>

        {/* כפתורי טווח זמן */}
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setRange(60)}
            style={buttonStyle(range === 60)}
          >
            1 Hour
          </button>
          <button
            onClick={() => setRange(180)}
            style={buttonStyle(range === 180)}
          >
            3 Hours
          </button>
          <button
            onClick={() => setRange(1440)}
            style={buttonStyle(range === 1440)}
          >
            24 Hours
          </button>
        </div>

        {/* כרטיסי סטטיסטיקה */}
        <div style={gridStyle}>
          <div style={cardStyle}>
            <span style={labelStyle}>Average Usage</span>
            <div style={{ ...valueStyle, color: "#2563eb" }}>{stats.avg}%</div>
          </div>
          <div style={cardStyle}>
            <span style={labelStyle}>Max Usage</span>
            <div style={{ ...valueStyle, color: "#ef4444" }}>{stats.max}%</div>
          </div>
          <div style={cardStyle}>
            <span style={labelStyle}>Min Usage</span>
            <div style={{ ...valueStyle, color: "#10b981" }}>{stats.min}%</div>
          </div>
        </div>

        {/* אזור הגרף */}
        <section style={chartSectionStyle}>
          {data.length > 0 ? (
            <CpuChart data={data} />
          ) : (
            <div
              style={{
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Loading metrics...
            </div>
          )}
        </section>

        <footer style={{ marginTop: "30px", textAlign: "center" }}>
          <button onClick={() => loadData(range)} style={refreshButtonStyle}>
            🔄 Refresh Now
          </button>
        </footer>
      </main>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#1f2937",
  margin: 0,
  padding: "20px",
  boxSizing: "border-box",
};

const mainStyle = {
  width: "100%",
  maxWidth: "900px",
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "30px",
};

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #f3f4f6",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  textAlign: "center" as const,
};

const labelStyle = { fontSize: "0.85rem", color: "#6b7280", fontWeight: 500 };
const valueStyle = {
  fontSize: "1.75rem",
  fontWeight: "bold",
  marginTop: "5px",
};

const chartSectionStyle = {
  background: "#ffffff",
  padding: "10px",
  borderRadius: "12px",
  border: "1px solid #f3f4f6",
};

const refreshButtonStyle = {
  cursor: "pointer",
  padding: "10px 24px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  backgroundColor: "white",
  fontWeight: 500,
  fontSize: "0.9rem",
  transition: "all 0.2s",
};

const buttonStyle = (isActive: boolean) => ({
  padding: "10px 24px",
  cursor: "pointer",
  backgroundColor: isActive ? "#2563eb" : "#ffffff",
  color: isActive ? "white" : "#374151",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontWeight: 600,
  transition: "all 0.2s",
  boxShadow: isActive ? "0 4px 6px -1px rgba(37, 99, 235, 0.2)" : "none",
});

export default App;
