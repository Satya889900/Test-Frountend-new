import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar({ onCollapseChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    if (onCollapseChange) {
      onCollapseChange(!collapsed);
    }
  };

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/dashboard" },
    { icon: "📁", label: "Projects", path: "/projects" },
    { icon: "📈", label: "Reports", path: "/reports" },
    { icon: "👥", label: "Users", path: "/users" },
    { icon: "⚙️", label: "Settings", path: "/settings" },
    { icon: "💬", label: "Messages", path: "/messages" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #6b21a8;
          font-weight: 500;
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
        {/* Collapse Button */}
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

        {/* Menu Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
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
          ))}
        </nav>

        {/* Divider */}
        <hr
          style={{
            margin: "24px 0",
            border: "none",
            borderTop: "1px solid rgba(124, 58, 237, 0.1)",
          }}
        />

        {/* Additional Section */}
        <div style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600, padding: "8px 8px", marginBottom: "16px" }}>
          {!collapsed && "SUPPORT"}
        </div>
        <div
          className="sidebar-item"
          onClick={() => navigate("/help")}
          style={{
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? "14px 14px" : "14px 18px",
          }}
          title={collapsed ? "Help" : ""}
        >
          <span style={{ fontSize: "20px", minWidth: "20px" }}>❓</span>
          {!collapsed && <span>Help</span>}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
