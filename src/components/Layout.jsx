import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Root Layout — renders once.
 * Sidebar is permanently fixed on the left.
 * All child pages render via <Outlet /> on the right.
 */
function Layout({ userName = "Satya", showSidebar = true, children }) {
  const content = children !== undefined ? children : <Outlet />;
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      background: "#f8fafc",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* ── Permanent Sidebar ── */}
      {showSidebar && <Sidebar userName={userName} />}

      {/* ── Page Content ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}>
        {/* Pages fill this scrollable area */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          position: "relative",
        }}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Layout;
