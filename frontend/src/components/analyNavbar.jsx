import { useNavigate, useLocation } from "react-router-dom";

export default function AnalyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "#2563eb" : "#000";

  return (
    <nav
      style={{
        width: "98%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          fontWeight: 600,
        }}
      >
        <span
          style={{ cursor: "pointer", color: isActive("/") }}
          onClick={() => navigate("/")}
        >
          📚 Dashboard
        </span>

        <span
          style={{ cursor: "pointer", color: isActive("/analytics") }}
          onClick={() => navigate("/analytics")}
        >
          📊 Analytics
        </span>
      </div>

      {/* Right */}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}