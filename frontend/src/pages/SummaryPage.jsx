import { useLocation } from "react-router-dom";

export default function SummaryPage() {
  const { state } = useLocation();
  const { summary, subjectName, pdfName } = state;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
          {subjectName.toUpperCase()}
        </h1>

        <h3 style={{ color: "#666" }}>
          {pdfName}
        </h3>
      </div>

      <div
        style={{
          background: "#f8f8f8",
          padding: "30px",
          borderRadius: "12px",
          lineHeight: "1.8"
        }}
      >
        <div style={{ whiteSpace: "pre-wrap" }}>
          {summary}
        </div>
      </div>
    </div>
  );
}