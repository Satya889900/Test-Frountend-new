import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Layout({ children, showLogout = true, userName = "User", showSidebar = true }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {/* Sidebar */}
      {showSidebar && <Sidebar onCollapseChange={setSidebarCollapsed} />}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: showSidebar ? (sidebarCollapsed ? "80px" : "260px") : "0",
          background: "linear-gradient(135deg, #f8f4ff 0%, #f0e6ff 50%, #faf9ff 100%)",
          position: "relative",
          overflow: "auto",
          padding: "24px",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar - Fixed at top */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          marginBottom: "32px",
        }}>
          <Navbar showLogout={showLogout} userName={userName} />
        </div>

        {/* Page Content */}
        <div style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          overflow: "auto"
        }}>
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
          `}</style>

          {/* Animated Background Elements */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "15%",
              width: "420px",
              height: "420px",
              background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)",
              borderRadius: "50%",
              animation: "float 18s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "18%",
              width: "520px",
              height: "520px",
              background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 22s ease-in-out infinite 4s",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
