import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BusinessLetterPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("selectType"); // "selectType" or "selectTemplate"
  const [selectedType, setSelectedType] = useState(null);

  const letterTemplates = [
    { name: "Professional", icon: "💼", color: "#7c3aed", description: "Clean and professional design", category: "All" },
    { name: "Formal", icon: "📋", color: "#db2777", description: "Traditional business format", category: "All" },
    { name: "Modern", icon: "✨", color: "#22c55e", description: "Contemporary and stylish", category: "All" },
    { name: "Minimal", icon: "⚪", color: "#eab308", description: "Simple and elegant", category: "All" },
    { name: "Corporate", icon: "🏢", color: "#3b82f6", description: "Corporate standard format", category: "All" },
    { name: "Word", icon: "📝", color: "#0ea5e9", description: "Download and edit in Word", category: "Download" },
    { name: "Google Docs", icon: "🟦", color: "#2563eb", description: "Open in Google Docs instantly", category: "Download" },
    { name: "Cover Letter", icon: "✉️", color: "#f97316", description: "Professional cover letter format", category: "Smart" },
    { name: "Complaint", icon: "📢", color: "#ef4444", description: "Formal complaint letter", category: "Smart" },
  ];

  const templateTypes = [
    {
      name: "Professional",
      icon: "💼",
      color: "#7c3aed",
      description: "Standard business letter formats",
      templates: ["Professional", "Formal", "Corporate"]
    },
    {
      name: "Download Ready",
      icon: "⬇️",
      color: "#22c55e",
      description: "Templates optimized for download and sharing",
      templates: ["Word", "Google Docs"]
    },
    {
      name: "Special Letters",
      icon: "📄",
      color: "#8b5cf6",
      description: "Cover letters and special correspondence",
      templates: ["Cover Letter", "Complaint"]
    },
    {
      name: "All Styles",
      icon: "🎨",
      color: "#db2777",
      description: "Browse all available letter styles",
      templates: letterTemplates.map(t => t.name)
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setTimeout(() => setLoading(false), 600);
  }, [navigate]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentStep("selectTemplate");
  };

  const handleBackToTypes = () => {
    setCurrentStep("selectType");
    setSelectedType(null);
  };

  const filteredTemplates = selectedType
    ? letterTemplates.filter(template => selectedType.templates.includes(template.name))
    : [];

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#faf9ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, border: "5px solid #e0d4ff", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes spin { to { transform: rotate(360deg); } }

        .template-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .template-card:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 35px rgba(139,92,246,0.15);
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #f8fafc 0%, #eef2ff 50%, #f8f4ff 100%)",
        borderRadius: "28px",
        padding: "32px 40px",
        marginBottom: "32px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(124,58,237,0.08)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "24px", alignItems: "flex-start" }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
              <span style={{ color: "#4f46e5", fontWeight: 700, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>Letter studio</span>
              <span style={{ color: "#6b7280", fontSize: "12px" }}>Create professional business letters with ease.</span>
            </div>
            <h1 style={{ fontSize: "42px", lineHeight: 1.05, color: "#111827", margin: 0 }}>
              Business letter templates made simple.
            </h1>
            <p style={{ fontSize: "18px", color: "#4b5563", marginTop: "20px", maxWidth: "560px" }}>
              Select a template style, preview it instantly, and start editing on the next page. Everything is designed for speed, clarity, and professional results.
            </p>
          </div>

          <div style={{ minWidth: "260px", background: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 20px 60px rgba(124,58,237,0.09)" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#7c3aed", marginBottom: "16px" }}>Letter Builder</div>
            <h3 style={{ fontSize: "22px", margin: 0, color: "#111827" }}>Start faster with modern templates</h3>
            <p style={{ color: "#6b7280", margin: "16px 0 24px" }}>All templates are optimized for print, web, and download. Generate in PDF or Word with a single click.</p>
            <div style={{ display: "grid", gap: "14px" }}>
              {[
                { title: "Professional Format", value: "Industry-standard layouts" },
                { title: "Download Options", value: "PDF, DOCX, Google Docs" },
                { title: "Quick Setup", value: "Fill in your details fast" },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7c3aed" }} />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{item.title}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "28px", marginBottom: "40px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "28px", margin: "0 0 8px 0", color: "#111827" }}>
                {currentStep === "selectType" ? "Choose letter type" : `Choose ${selectedType?.name.toLowerCase()} template`}
              </h2>
              <p style={{ color: "#6b7280", margin: 0 }}>
                {currentStep === "selectType"
                  ? "Select the type of letter you want to create"
                  : "Pick a template that matches your needs"
                }
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {currentStep === "selectTemplate" && (
                <button
                  onClick={handleBackToTypes}
                  style={{
                    background: "white",
                    color: "#6b21a8",
                    border: "1px solid rgba(124,58,237,0.15)",
                    borderRadius: "14px",
                    padding: "12px 22px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  ← Back to types
                </button>
              )}
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  background: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px 22px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Back to categories
              </button>
            </div>
          </div>

          {currentStep === "selectType" ? (
            // Template Type Selection
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}>
              {templateTypes.map((type, i) => (
                <div
                  key={i}
                  className="template-card"
                  onClick={() => handleTypeSelect(type)}
                  style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "28px",
                    boxShadow: "0 15px 35px rgba(139,92,246,0.12)",
                    border: "1px solid rgba(124,58,237,0.08)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 8px 0" }}>
                        {type.name}
                      </h3>
                      <p style={{ color: "#4b5563", fontSize: "14px", margin: 0 }}>{type.description}</p>
                      <p style={{ color: "#7c3aed", fontSize: "12px", fontWeight: 600, margin: "8px 0 0 0" }}>
                        {type.templates.length} templates available
                      </p>
                    </div>
                    <div style={{
                      width: 60,
                      height: 60,
                      background: `linear-gradient(135deg, ${type.color}, ${type.color}80)`,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      color: "white",
                    }}>
                      {type.icon}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                    <span style={{ color: type.color, fontWeight: 700 }}>Browse templates</span>
                    <span style={{ fontSize: "20px" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Template Selection
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}>
              {filteredTemplates.map((template, i) => (
                <div
                  key={i}
                  className="template-card"
                  onClick={() => navigate(`/editor/letter/${template.name.toLowerCase()}`)}
                  style={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "28px",
                    boxShadow: "0 15px 35px rgba(139,92,246,0.12)",
                    border: "1px solid rgba(124,58,237,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                    <div>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 8px 0" }}>
                        {template.name}
                      </h3>
                      <p style={{ color: "#4b5563", fontSize: "14px", margin: 0 }}>{template.description}</p>
                    </div>
                    <div style={{
                      width: 60,
                      height: 60,
                      background: `linear-gradient(135deg, ${template.color}, ${template.color}80)`,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      color: "white",
                    }}>
                      {template.icon}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                    <span style={{ color: template.color, fontWeight: 700 }}>Select template</span>
                    <span style={{ fontSize: "20px" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ background: "white", borderRadius: "28px", padding: "28px", boxShadow: "0 20px 60px rgba(124,58,237,0.08)" }}>
            <h4 style={{ fontSize: "20px", margin: 0, color: "#111827" }}>Letter Builder essentials</h4>
            <p style={{ color: "#6b7280", marginTop: "12px" }}>Everything you need to create professional business letters.</p>
            <ul style={{ marginTop: "24px", paddingLeft: "18px", color: "#4b5563", lineHeight: 1.8 }}>
              <li>Professional letter formats</li>
              <li>Instant download options</li>
              <li>Proper business etiquette</li>
              <li>Customizable content</li>
              <li>Print-ready layouts</li>
            </ul>
          </div>

          <div style={{ background: "linear-gradient(135deg, #eef2ff, #f5f3ff)", borderRadius: "28px", padding: "28px", boxShadow: "0 20px 60px rgba(124,58,237,0.08)" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "18px" }}>
              <div style={{ width: 48, height: 48, borderRadius: "16px", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px" }}>📧</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>Need help with content?</p>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Use our AI assistant to craft professional letters.</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/editor/letter/ai-helper")}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "16px",
                padding: "14px 0",
                background: "#7c3aed",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Open AI assistant
            </button>
          </div>

          <div style={{ background: "white", borderRadius: "28px", padding: "28px", boxShadow: "0 20px 60px rgba(124,58,237,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />
              <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>How it works</p>
            </div>
            <ol style={{ paddingLeft: "18px", color: "#4b5563", lineHeight: 1.9 }}>
              <li>Select a letter type</li>
              <li>Choose your template</li>
              <li>Fill in your details</li>
              <li>Download or print</li>
            </ol>
          </div>
        </aside>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
        {[
          { title: "Professional format", description: "Industry-standard business letter layouts." },
          { title: "Quick setup", description: "Fill in your information and generate instantly." },
          { title: "Multiple formats", description: "Export as PDF, DOCX, or Google Docs." },
          { title: "Business etiquette", description: "Built-in professional formatting standards." },
        ].map((feature, i) => (
          <div key={i} style={{ background: "white", borderRadius: "24px", padding: "28px", boxShadow: "0 15px 35px rgba(139,92,246,0.08)" }}>
            <h4 style={{ margin: 0, fontSize: "18px", color: "#111827" }}>{feature.title}</h4>
            <p style={{ marginTop: "12px", color: "#4b5563", lineHeight: 1.8 }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessLetterPage;