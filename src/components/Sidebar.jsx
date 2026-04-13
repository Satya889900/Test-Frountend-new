import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar({ onCollapseChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    const nextCollapsed = !collapsed;
    setCollapsed(nextCollapsed);
    if (onCollapseChange) {
      onCollapseChange(nextCollapsed);
    }
  };

  const primaryItems = [
    { icon: "🏠", label: "Dashboard", path: "/dashboard" },
    { icon: "📄", label: "Resume", path: "/resume-builder" },
    { icon: "✉️", label: "Business Letter", path: "/letter-builder" },
  ];

  const quickItems = [
    { icon: "📝", label: "Word", path: "/letter-builder" },
    { icon: "📬", label: "Letter", path: "/letter-builder" },
    { icon: "📧", label: "Mail", path: "/letter-builder" },
  ];

  const isActive = (path) => location.pathname === path;

  const renderItem = (item, active = false) => (
    <div
      key={item.label}
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={() => navigate(item.path)}
      style={{
        position: "relative",
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? "14px 14px" : "14px 18px",
      }}
      title={collapsed ? item.label : ""}
    >
      <span style={{ fontSize: "20px", minWidth: "20px" }}>{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </div>
  );

  return (
    <>
      <style>{`
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 14px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #6b21a8;
          font-weight: 600;
          white-space: nowrap;
        }

        .sidebar-item:hover {
          background: #f8f4ff;
          transform: translateX(4px);
        }

        .sidebar-item.active {
          background: linear-gradient(90deg, #7c3aed, #c026d3);
          color: white;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }

        .sidebar-item.active::after {
          content: '';
          position: absolute;
          right: -2px;
          height: 100%;
          width: 4px;
          background: white;
          border-radius: 4px;
        }

        .collapse-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f3e8ff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .collapse-btn:hover {
          background: #e9d5ff;
          transform: scale(1.05);
        }
      `}</style>

      <aside
        style={{
          width: collapsed ? "80px" : "260px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(124, 58, 237, 0.1)",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          overflowY: "auto",
          transition: "width 0.3s ease",
          zIndex: 50,
          padding: "24px 16px",
          boxShadow: "4px 0 20px rgba(124, 58, 237, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "24px",
          }}
        >
          <button
            className="collapse-btn"
            onClick={handleCollapse}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {!collapsed && (
          <div style={{ marginBottom: "18px", padding: "0 8px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>
              Main Menu
            </div>
          </div>
        )}

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {primaryItems.map((item) => renderItem(item, isActive(item.path)))}
        </nav>

        <hr
          style={{
            margin: "24px 0",
            border: "none",
            borderTop: "1px solid rgba(124, 58, 237, 0.1)",
          }}
        />

        <div style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 700, padding: "8px 8px", marginBottom: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
          {!collapsed && "Quick Create"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {quickItems.map((item) => renderItem(item, false))}
        </div>

        <hr
          style={{
            margin: "24px 0",
            border: "none",
            borderTop: "1px solid rgba(124, 58, 237, 0.1)",
          }}
        />

        <div
          className="sidebar-item"
          onClick={() => navigate("/dashboard")}
          style={{
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "14px 14px" : "14px 18px",
          }}
          title={collapsed ? "Back Home" : ""}
        >
          <span style={{ fontSize: "20px", minWidth: "20px" }}>❓</span>
          {!collapsed && <span>Help</span>}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
