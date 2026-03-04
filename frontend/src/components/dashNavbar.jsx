import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCog, FaSignOutAlt } from "react-icons/fa";

export default function DashNavbar() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "#2563eb" : "#000";
const [profilePhoto, setProfilePhoto] = useState(null);

useEffect(() => {
  const saved = localStorage.getItem("profile");
  if (saved) {
    const parsed = JSON.parse(saved);
    setProfilePhoto(parsed.photo);
  }
}, []);

   return (
    <nav
      style={{
        width: "100%",
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

      {/* Right Profile */}
      <div style={{ position: "relative" }}>
       <img
  src={profilePhoto || "https://i.pravatar.cc/40"}
  alt="profile"
  style={{
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    cursor: "pointer",
    objectFit: "cover"
  }}
  onClick={() => setOpen(!open)}
/>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "55px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              width: "160px",
              overflow: "hidden",
            }}
          >
            <div
              onClick={() => navigate("/profile")}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaUserCog /> Profile
            </div>

            <div
              onClick={handleLogout}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderTop: "1px solid #eee",
              }}
            >
              <FaSignOutAlt /> Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}