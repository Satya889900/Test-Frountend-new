import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar({ showLogout = true, userName = "User" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes glow { 
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); } 
          50% { box-shadow: 0 0 40px rgba(139,92,246,0.6); } 
        }
      `}</style>

      <nav
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          borderRadius: "22px",
          padding: "16px 28px",
          boxShadow: "0 8px 32px rgba(139,92,246,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Left Side - Logo & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6d28d9, #c026d3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "26px",
              fontWeight: 700,
              boxShadow: "0 0 25px rgba(192,38,211,0.4)",
              animation: "glow 3s ease-in-out infinite",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          >
            ✦
          </div>
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#1a0f3c",
                margin: 0,
                cursor: "pointer",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </h1>
            <p style={{ color: "#8b5cf6", fontSize: "14px", margin: 0 }}>
              Good evening, {userName} 👋
            </p>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "8px 18px",
              background: "#f3e8ff",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#6b21a8",
            }}
          >
            Pro Plan
          </div>

          {showLogout && (
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 26px",
                background: "linear-gradient(90deg, #ef4444, #f87171)",
                color: "white",
                border: "none",
                borderRadius: "14px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(239,68,68,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
