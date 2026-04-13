import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard",       route: "/dashboard" },
  { icon: "📄", label: "Resume / CV",     route: "/resume-builder" },
  { icon: "✉️",  label: "Business Letter", route: "/letter-builder" },
  { icon: "🧾", label: "Invoice",         route: "/invoice-builder" },
  { icon: "📋", label: "Contract",        route: "/contract-builder" },
  { icon: "📊", label: "Presentation",    route: "/presentation-builder" },
  { icon: "📑", label: "Report",          route: "/report-builder" },
  { icon: "💼", label: "Proposal",        route: "/proposal-builder" },
  { icon: "👤", label: "My Profile",      route: "/profile" },
];

function Sidebar({ userName = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const ti = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(ti);
  }, []);

  const hour = time.getHours();
  const greeting = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";

  const handleLogout = () => logout();

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      height: "100vh",
      background: "#fff",
      borderRight: "1px solid #f1f5f9",
      display: "flex",
      flexDirection: "column",
      padding: "20px 12px",
      boxShadow: "2px 0 16px rgba(99,102,241,0.06)",
      overflowY: "auto",
      flexShrink: 0,
      zIndex: 100,
    }}>

      {/* ── Logo ── */}
      <div
        onClick={() => navigate("/dashboard")}
        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, padding: "0 8px", cursor: "pointer" }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 11,
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 16, fontWeight: 800, flexShrink: 0,
        }}>D</div>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>DocStudio</span>
      </div>

      {/* ── Nav Label ── */}
      <div style={{ fontSize: 10, fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "0.09em", padding: "0 10px", marginBottom: 6 }}>
        Main Menu
      </div>

      {/* ── Nav Items ── */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map((n) => {
          const active = location.pathname === n.route || (location.pathname === "/" && n.route === "/dashboard");
          return (
            <div
              key={n.label}
              onClick={() => navigate(n.route)}
              title={n.label}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 10px", borderRadius: 10, cursor: "pointer",
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? "#4f46e5" : "#64748b",
                background: active ? "#eef2ff" : "transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f8fafc"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 15, flexShrink: 0 }}>{n.icon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.label}</span>
              {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />}
            </div>
          );
        })}
      </nav>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── Storage Bar ── */}
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: "12px", margin: "16px 0 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 7 }}>
          <span>Storage</span>
          <span style={{ color: "#94a3b8" }}>2.4 / 5 GB</span>
        </div>
        <div style={{ height: 5, borderRadius: 100, background: "#e2e8f0", overflow: "hidden" }}>
          <div style={{ width: "48%", height: "100%", borderRadius: 100, background: "linear-gradient(90deg, #6366f1, #a855f7)" }} />
        </div>
      </div>

      {/* ── Logout Button ── */}
      <button
        onClick={handleLogout}
        style={{
          width: "100%", padding: "9px", borderRadius: 10, border: "none",
          background: "#fef2f2", color: "#ef4444", fontWeight: 700, fontSize: 12,
          cursor: "pointer", marginBottom: 10, fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#fee2e2"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#fef2f2"}
      >
        Logout
      </button>

      {/* ── User Profile Card ── */}
      <div
        onClick={() => navigate("/profile")}
        style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 10px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#eef2ff"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#f8fafc"}
      >
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>
          {userName ? userName[0].toUpperCase() : "U"}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {userName || "User"}
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>Good {greeting} 👋</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
