import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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

  const documentTypes = [
    { name: "Resume/CV", icon: "📄", color: "#7c3aed", description: "Professional resume templates" },
    { name: "Business Letter", icon: "📧", color: "#db2777", description: "Formal business correspondence" },
    { name: "Invoice", icon: "💰", color: "#22c55e", description: "Professional invoice templates" },
    { name: "Contract", icon: "📋", color: "#eab308", description: "Legal contract templates" },
    { name: "Presentation", icon: "📊", color: "#3b82f6", description: "Slide presentation templates" },
    { name: "Report", icon: "📈", color: "#f59e0b", description: "Business report templates" },
    { name: "Newsletter", icon: "📰", color: "#ef4444", description: "Email newsletter templates" },
    { name: "Brochure", icon: "📑", color: "#8b5cf6", description: "Marketing brochure templates" },
    { name: "Certificate", icon: "🏆", color: "#06b6d4", description: "Award certificate templates" },
    { name: "Agenda", icon: "📅", color: "#84cc16", description: "Meeting agenda templates" },
    { name: "Memo", icon: "📝", color: "#f97316", description: "Internal memo templates" },
    { name: "Proposal", icon: "💼", color: "#6366f1", description: "Business proposal templates" },
    { name: "Flyer", icon: "🎯", color: "#ec4899", description: "Promotional flyer templates" },
    { name: "Card", icon: "💳", color: "#14b8a6", description: "Greeting/business card templates" },
    { name: "Form", icon: "📋", color: "#a855f7", description: "Custom form templates" },
    { name: "Calendar", icon: "📆", color: "#f59e0b", description: "Calendar templates" },
    { name: "Planner", icon: "📓", color: "#10b981", description: "Personal planner templates" },
    { name: "Budget", icon: "💵", color: "#059669", description: "Budget planning templates" },
    { name: "Schedule", icon: "⏰", color: "#dc2626", description: "Schedule templates" },
    { name: "Checklist", icon: "✅", color: "#7c2d12", description: "Task checklist templates" },
    { name: "Worksheet", icon: "📊", color: "#1e40af", description: "Educational worksheet templates" },
    { name: "Chart", icon: "📈", color: "#7c3aed", description: "Data visualization templates" },
  ];

  const handleDocumentSelect = (docType) => {
    // Navigate to the appropriate page based on document type
    const routeMap = {
      "Resume/CV": "/resume-builder",
      "Business Letter": "/letter-builder",
      "Invoice": "/invoice-builder",
      "Contract": "/contract-builder",
      "Presentation": "/presentation-builder",
      "Report": "/report-builder",
      "Newsletter": "/newsletter-builder",
      "Brochure": "/brochure-builder",
      "Certificate": "/certificate-builder",
      "Agenda": "/agenda-builder",
      "Memo": "/memo-builder",
      "Proposal": "/proposal-builder",
      "Flyer": "/flyer-builder",
      "Card": "/card-builder",
      "Form": "/form-builder",
      "Calendar": "/calendar-builder",
      "Planner": "/planner-builder",
      "Budget": "/budget-builder",
      "Schedule": "/schedule-builder",
      "Checklist": "/checklist-builder",
      "Worksheet": "/worksheet-builder",
      "Chart": "/chart-builder",
    };

    const route = routeMap[docType.name] || "/document-builder";
    navigate(route);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#faf9ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, border: "5px solid #e0d4ff", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <Layout userName={user.name} showLogout={true}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); } 50% { box-shadow: 0 0 40px rgba(139,92,246,0.6); } }

        .doc-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .doc-card:hover {
          transform: scale(1.05) translateY(-8px);
          box-shadow: 0 20px 40px rgba(139,92,246,0.2);
        }

        .glass {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.15);
        }
      `}</style>

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
            Welcome to Document Builder, {user.name}! ✨
          </h2>
          <p style={{ fontSize: "17px", opacity: 0.9, maxWidth: "600px" }}>
            Choose from our collection of professional templates to create stunning documents in minutes.
          </p>
        </div>
        <div style={{ position: "absolute", right: "30px", bottom: "-20px", fontSize: "120px", opacity: "0.15" }}>📄</div>
      </div>

      {/* Document Types Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        marginBottom: "40px",
      }}>
        {documentTypes.map((doc, i) => (
          <div
            key={i}
            className="doc-card glass"
            onClick={() => handleDocumentSelect(doc)}
            style={{
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 15px 35px rgba(139,92,246,0.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1a0f3c", margin: "0 0 8px 0" }}>
                  {doc.name}
                </h3>
                <p style={{ color: "#6b21a8", fontSize: "14px", margin: 0 }}>
                  {doc.description}
                </p>
              </div>
              <div style={{
                width: 60, height: 60,
                background: `linear-gradient(135deg, ${doc.color}20, ${doc.color}10)`,
                borderRadius: "16px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px"
              }}>
                {doc.icon}
              </div>
            </div>

            {/* Hover indicator */}
            <div style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              background: doc.color,
              color: "white",
              padding: "6px 12px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
              className="hover-indicator"
            >
              Create →
            </div>

            <style>{`
              .doc-card:hover .hover-indicator {
                opacity: 1;
              }
            `}</style>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}>
        {[
          { label: "Templates Created", value: "1,284", icon: "📄", color: "#7c3aed" },
          { label: "Documents Downloaded", value: "892", icon: "⬇️", color: "#22c55e" },
          { label: "Time Saved", value: "156h", icon: "⏰", color: "#eab308" },
          { label: "Happy Users", value: "2,450", icon: "😊", color: "#db2777" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(139,92,246,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{
              width: 50, height: 50,
              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "22px", color: "white"
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: "#6b21a8", fontSize: "12px", fontWeight: 600, margin: 0 }}>
                {stat.label}
              </p>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "#1a0f3c", margin: "4px 0 0 0" }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Dashboard;