import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/dashNavbar";

export default function Dashboard() {
  const [learning, setLearning] = useState([]);
  const [topic, setTopic] = useState("");
  const [strength, setStrength] = useState(50);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLearning = async () => {
    try {
      const res = await api.get("/learning");
      setLearning(res.data);
    } catch {
      setError("Failed to load learning data");
    }
  };

  useEffect(() => {
    fetchLearning();
  }, []);

  const handleAddTopic = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");

    try {
      await api.post("/learning", {
        topic,
        strength,
        decayRate: 0.2,
      });

      setTopic("");
      setStrength(50);
      fetchLearning();
    } catch {
      setError("Failed to add topic");
    } finally {
      setLoading(false);
    }
  };

  const handleRevise = async (id) => {
    try {
      await api.post(`/revision/${id}`);
      fetchLearning();
    } catch {
      setError("Failed to revise topic");
    }
  };

  const getCardColor = (s) => {
    if (s >= 80) return "#dcfce7";
    if (s >= 50) return "#fef9c3";
    return "#fee2e2";
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          width: "225%",
          overflowX: "hidden",
          background: "#ffffff",
          padding: "32px",
          boxSizing: "border-box",
          color: "#111827",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          📚 Learning Dashboard
        </h1>

        <p
          style={{
            color: "#374151",
            fontSize: "15px",
            marginBottom: "32px",
          }}
        >
          Track your learning & fight knowledge decay
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Add Topic */}
        <section
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "24px",
            marginBottom: "40px",
            maxWidth: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            ➕ Add New Topic
          </h3>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic name (e.g. Binary Search)"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "14px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />

          <label style={{ fontSize: "14px" }}>
            Initial Strength: <strong>{strength}</strong>
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <button
            onClick={handleAddTopic}
            disabled={loading}
            style={{
              marginTop: "14px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              backgroundColor: "black",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {loading ? "Adding..." : "Add Topic"}
          </button>
        </section>

        {/* Topics Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {learning.map((item) => (
            <div
              key={item._id}
              style={{
                background: getCardColor(item.strength),
                padding: "18px",
                borderRadius: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginBottom: "6px", fontWeight: 600 }}>
                {item.topic}
              </h3>

              <div
                style={{
                  height: "8px",
                  background: "white",
                  borderRadius: "4px",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    width: `${item.strength}%`,
                    height: "100%",
                    background: "#2563eb",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <p>
                <strong>Strength:</strong> {item.strength}
              </p>
              <p>
                <strong>Decay Score:</strong> {item.decayScore}
              </p>

              <button
                onClick={() => handleRevise(item._id)}
                style={{
                  marginTop: "8px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "black",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Revise 🔁
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}