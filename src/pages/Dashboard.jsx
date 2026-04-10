import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Simulate loading user data
    setTimeout(() => setLoading(false), 600);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#faf9ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, border: "5px solid #e0d4ff", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); } 50% { box-shadow: 0 0 40px rgba(139,92,246,0.6); } }

        .stat-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-card:hover {
          transform: scale(1.04) translateY(-10px);
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.15);
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f4ff 0%, #f0e6ff 50%, #faf9ff 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
      }}>
        {/* Animated Background Elements */}
        <div style={{ position: "absolute", top: "10%", left: "15%", width: "420px", height: "420px", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)", borderRadius: "50%", animation: "float 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "18%", width: "520px", height: "520px", background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)", borderRadius: "50%", animation: "float 22s ease-in-out infinite 4s" }} />

        {/* Navbar */}
        <nav style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          borderRadius: "22px",
          padding: "16px 28px",
          marginBottom: "32px",
          boxShadow: "0 8px 32px rgba(139,92,246,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: "16px",
          zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "16px",
              background: "linear-gradient(135deg, #6d28d9, #c026d3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "26px", fontWeight: 700,
              boxShadow: "0 0 25px rgba(192,38,211,0.4)",
              animation: "glow 3s ease-in-out infinite",
            }}>
              ✦
            </div>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1a0f3c", margin: 0 }}>
                Dashboard
              </h1>
              <p style={{ color: "#8b5cf6", fontSize: "14px", margin: 0 }}>Good evening, {user.name} 👋</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              padding: "8px 18px", background: "#f3e8ff", borderRadius: "9999px",
              fontSize: "14px", fontWeight: 600, color: "#6b21a8"
            }}>
              Pro Plan
            </div>
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
              }}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Welcome Banner */}
        <div style={{
          background: "linear-gradient(90deg, #6d28d9, #c026d3)",
          borderRadius: "28px",
          padding: "32px 40px",
          color: "white",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
              Welcome back, {user.name}! ✨
            </h2>
            <p style={{ fontSize: "17px", opacity: 0.9, maxWidth: "460px" }}>
              Everything is looking great today. Here's a quick overview of your workspace.
            </p>
          </div>
          <div style={{ position: "absolute", right: "30px", bottom: "-20px", fontSize: "120px", opacity: 0.15 }}>✦</div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}>
          {[
            { label: "Total Users", value: "1,284", icon: "👥", color: "#7c3aed", change: "+18%" },
            { label: "Active Projects", value: "63", icon: "🚀", color: "#db2777", change: "+7%" },
            { label: "Revenue", value: "$12,459", icon: "💎", color: "#22c55e", change: "+24%" },
            { label: "Tasks Done", value: "392", icon: "✅", color: "#eab308", change: "+11%" },
          ].map((item, i) => (
            <div
              key={i}
              className="stat-card glass"
              style={{
                borderRadius: "24px",
                padding: "28px 32px",
                boxShadow: "0 15px 35px rgba(139,92,246,0.12)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ color: "#6b21a8", fontSize: "13px", fontWeight: 600, letterSpacing: "1px" }}>{item.label}</p>
                  <p style={{ fontSize: "48px", fontWeight: 700, color: "#1a0f3c", margin: "12px 0 4px" }}>{item.value}</p>
                  <p style={{ color: "#22c55e", fontWeight: 600 }}>{item.change} this month</p>
                </div>
                <div style={{
                  width: 68, height: 68, background: `linear-gradient(135deg, ${item.color}15, transparent)`,
                  borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px"
                }}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}>
          {/* Left - Main Panel */}
          <div style={{
            background: "white",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(139,92,246,0.1)",
          }}>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#1a0f3c", marginBottom: "24px" }}>
              Recent Activity
            </h3>
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#9f8ac4" }}>
              <div style={{ fontSize: "70px", marginBottom: "16px" }}>🌟</div>
              <p style={{ fontSize: "18px", fontWeight: 600 }}>Your workspace is thriving</p>
              <p style={{ maxWidth: "340px", margin: "12px auto 0" }}>
                Beautiful analytics and activity will appear here once you start using the platform.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{
              background: "white",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 15px 40px rgba(139,92,246,0.08)",
              flex: 1,
            }}>
              <h4 style={{ fontWeight: 700, color: "#1a0f3c", marginBottom: "20px" }}>Quick Actions</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {["New Project", "Invite Team", "View Reports", "Upgrade Plan"].map((text, i) => (
                  <button
                    key={i}
                    style={{
                      padding: "16px 12px",
                      background: i === 0 ? "linear-gradient(90deg, #7c3aed, #c026d3)" : "#f8f4ff",
                      color: i === 0 ? "white" : "#6b21a8",
                      border: "none",
                      borderRadius: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: "white",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 15px 40px rgba(139,92,246,0.08)",
              flex: 1,
            }}>
              <h4 style={{ fontWeight: 700, color: "#1a0f3c", marginBottom: "16px" }}>Productivity Tip</h4>
              <p style={{ lineHeight: 1.6, color: "#6b21a8" }}>
                "Consistency beats intensity. Small daily improvements lead to massive results over time."
              </p>
              <div style={{ marginTop: "20px", fontSize: "13px", color: "#a78bfa" }}>— Your AI Assistant</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
    
export default Dashboard;