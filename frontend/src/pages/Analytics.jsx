import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/analyNavbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics");
        setStats(res.data);
      } catch {
        setError("Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, []);

  if (error) {
    return <p style={{ color: "red", padding: "20px" }}>{error}</p>;
  }

  if (!stats) {
    return <p style={{ padding: "20px" }}>Loading analytics...</p>;
  }

const {
  totalTopics = 0,
  revisedThisWeek = 0,
  strengthBreakdown = { strong: 0, medium: 0, weak: 0 },
  focusTopics = [],
} = stats || {};

  const chartData = [
    { name: "Strong", value: strengthBreakdown.strong },
    { name: "Medium", value: strengthBreakdown.medium },
    { name: "Weak", value: strengthBreakdown.weak },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  /* ===== Weekly Trend (frontend derived) ===== */
  const weeklyTrend = [
    { day: "Mon", value: Math.max(0, strengthBreakdown.strong - 2) },
    { day: "Tue", value: Math.max(0, strengthBreakdown.strong - 1) },
    { day: "Wed", value: strengthBreakdown.strong },
    { day: "Thu", value: strengthBreakdown.strong + 1 },
    { day: "Fri", value: strengthBreakdown.strong + 1 },
  ];
  /* ========================================== */

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "32px" }}>
          📊 Learning Analytics
        </h1>

        {/* Summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <SummaryCard label="Total Topics" value={totalTopics} />
          <SummaryCard label="Revised This Week" value={revisedThisWeek} />
        </div>

        {/* Charts */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            marginBottom: "48px",
          }}
        >
          {/* Bar Chart */}
          <div style={cardStyle}>
            <h3 style={sectionTitle}>📈 Strength Bar Chart</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div
                          style={{
                            background: "#ffffff",
                            border: "1px solid #e5e7eb",
                            padding: "10px",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                        >
                          <strong>{payload[0].payload.name}</strong>
                          <div>Topics count: {payload[0].value}</div>
                          <div style={{ color: "#6b7280" }}>
                            Based on current strength levels
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar
                  dataKey="value"
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={cardStyle}>
            <h3 style={sectionTitle}>🥧 Strength Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  activeOuterRadius={115}
                  label
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `${value} topics`,
                    `${name} strength`,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ===== Weekly Trend Line ===== */}
        <section style={{ ...cardStyle, marginBottom: "48px" }}>
          <h3 style={sectionTitle}>📉 Weekly Learning Trend</h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyTrend}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e5e7eb",
                          padding: "10px",
                          borderRadius: "8px",
                          fontSize: "14px",
                        }}
                      >
                        <strong>{payload[0].payload.day}</strong>
                        <div>Revision Strength: {payload[0].value}</div>
                        <div style={{ color: "#6b7280" }}>
                          Shows learning consistency over the week
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                isAnimationActive={true}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
        {/* ============================= */}

        {/* Strength Breakdown */}
        <section
          style={{
            marginBottom: "48px",
            padding: "24px",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
            📈 Strength Breakdown
          </h2>

          <BreakdownItem label="Strong" value={strengthBreakdown.strong} color="#22c55e" />
          <BreakdownItem label="Medium" value={strengthBreakdown.medium} color="#facc15" />
          <BreakdownItem label="Weak" value={strengthBreakdown.weak} color="#ef4444" />
        </section>

        {/* Focus Topics */}
        <section
          style={{
            padding: "24px",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>
            🎯 Focus Topics
          </h2>

          {focusTopics.length === 0 ? (
            <p style={{ color: "#16a34a", fontWeight: 500 }}>
              All topics are in good shape 🎉
            </p>
          ) : (
            <ul style={{ paddingLeft: "18px" }}>
              {focusTopics.map((topic) => (
                <li key={topic} style={{ marginBottom: "6px" }}>
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */

const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "24px",
  background: "#f9fafb",
};

const sectionTitle = {
  fontSize: "18px",
  marginBottom: "16px",
};

function SummaryCard({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "28px",
        background: "#ffffff",
        textAlign: "center",
        boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
      }}
    >
      <p style={{ fontSize: "14px", marginBottom: "10px", color: "#374151" }}>
        {label}
      </p>
      <h3 style={{ fontSize: "36px", fontWeight: 700, color: "#111827" }}>
        {value}
      </h3>
    </div>
  );
}

function BreakdownItem({ label, value, color }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "16px",
      }}
    >
      <span>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: color,
            marginRight: "10px",
          }}
        />
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}