import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
// import { MagnifyingGlassIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function ResumePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("selectType"); // "selectType" or "selectTemplate"
  const [selectedType, setSelectedType] = useState(null);

  const resumeTemplates = [
    { name: "Professional", icon: "💼", color: "#7c3aed", description: "Clean and professional design", category: "All" },
    { name: "Modern", icon: "✨", color: "#db2777", description: "Contemporary and stylish", category: "All" },
    { name: "Creative", icon: "🎨", color: "#22c55e", description: "Unique and eye-catching", category: "All" },
    { name: "Minimal", icon: "⚪", color: "#eab308", description: "Simple and elegant", category: "All" },
    { name: "Classic", icon: "📜", color: "#3b82f6", description: "Traditional and timeless", category: "All" },
    { name: "Bold", icon: "🔥", color: "#ef4444", description: "Strong and impactful", category: "All" },
    { name: "Word", icon: "📝", color: "#0ea5e9", description: "Download and edit in Word", category: "Download" },
    { name: "Google Docs", icon: "🟦", color: "#2563eb", description: "Open in Google Docs instantly", category: "Download" },
    { name: "ATS Friendly", icon: "⚙️", color: "#8b5cf6", description: "Optimized for recruiters and ATS", category: "Smart" },
    { name: "Cover Letter", icon: "✉️", color: "#f97316", description: "Perfect companion for your resume", category: "Smart" },
  ];

  const templateTypes = [
    {
      name: "Popular",
      icon: "⭐",
      color: "#7c3aed",
      description: "Most used templates by professionals",
      templates: ["Professional", "Modern", "Minimal", "Bold"]
    },
    {
      name: "Download Ready",
      icon: "⬇️",
      color: "#22c55e",
      description: "Templates optimized for download and sharing",
      templates: ["Word", "Google Docs"]
    },
    {
      name: "Smart Templates",
      icon: "🤖",
      color: "#8b5cf6",
      description: "AI-optimized and ATS-friendly designs",
      templates: ["ATS Friendly", "Cover Letter"]
    },
    {
      name: "All Styles",
      icon: "🎨",
      color: "#db2777",
      description: "Browse all available template styles",
      templates: resumeTemplates.map(t => t.name)
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
    ? resumeTemplates.filter(template => selectedType.templates.includes(template.name))
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-primary-50/50 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Layout userName={user.name} showLogout={true} showSidebar={false}>



      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 via-primary-50 to-emerald-50/30 rounded-3xl p-8 lg:p-10 mb-8 shadow-2xl ring-1 ring-primary/10/50 backdrop-blur-sm animate-pulse-slow">
        <div className="flex flex-col lg:flex-row lg:gap-6 items-start justify-between">
          <div className="max-w-2xl lg:max-w-4xl flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-primary-600 font-bold uppercase tracking-widest text-xs">Resume Studio</span>
              <span className="text-slate-500 text-xs bg-slate-100/50 px-3 py-1 rounded-full ring-1 ring-slate-200/50">Get noticed by recruiters</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 leading-tight mb-6 animate-float">
              Modern Resume Templates
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
              Choose from stunning templates, preview instantly, and customize with AI assistance. Export to PDF, Word, or Google Docs.
            </p>
          </div>

          <div className="min-w-[280px] mt-8 lg:mt-0 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl ring-1 ring-primary/10">
            <div className="text-primary-600 text-sm font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow" /> Resume Builder
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready in minutes</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">Professional templates optimized for ATS systems and recruiters.</p>
            <div className="space-y-3">
              {[
                { title: "AI Content", value: "Smart suggestions" },
                { title: "Multi Format", value: "PDF • Word • Docs" },
                { title: "ATS Ready", value: "100% compatible" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary-50/50 transition-all duration-200 group">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-sm flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 text-sm group-hover:text-primary-700">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.value}</div>
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
                {currentStep === "selectType" ? "Choose template type" : `Choose ${selectedType?.name.toLowerCase()} template`}
              </h2>
              <p style={{ color: "#6b7280", margin: 0 }}>
                {currentStep === "selectType"
                  ? "Select the type of templates you want to browse"
                  : "Pick a template that matches your style and needs"
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
                  onClick={() => navigate(`/editor/resume/${template.name.toLowerCase()}`)}
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
            <h4 style={{ fontSize: "20px", margin: 0, color: "#111827" }}>Resume Builder essentials</h4>
            <p style={{ color: "#6b7280", marginTop: "12px" }}>Everything you need to build a polished resume quickly.</p>
            <ul style={{ marginTop: "24px", paddingLeft: "18px", color: "#4b5563", lineHeight: 1.8 }}>
              <li>Template preview before you start</li>
              <li>Instant download options</li>
              <li>AI content suggestions</li>
              <li>Smart spacing and formatting</li>
              <li>Professional export controls</li>
            </ul>
          </div>

          <div style={{ background: "linear-gradient(135deg, #eef2ff, #f5f3ff)", borderRadius: "28px", padding: "28px", boxShadow: "0 20px 60px rgba(124,58,237,0.08)" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "18px" }}>
              <div style={{ width: 48, height: 48, borderRadius: "16px", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px" }}>🤖</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>Need help with content?</p>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Use our AI assistant to polish wording fast.</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/editor/resume/ai-helper")}
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
              <li>Select a template style</li>
              <li>Edit text and layout</li>
              <li>Preview instantly</li>
              <li>Download or share</li>
            </ol>
          </div>
        </aside>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
        {[
          { title: "Download formats", description: "Export as PDF, DOCX, or Google Docs." },
          { title: "Ready for recruiters", description: "Built-in ATS-friendly structure." },
          { title: "Mobile editing", description: "Use your browser from any device." },
          { title: "Template preview", description: "See the layout before you start." },
        ].map((feature, i) => (
          <div key={i} style={{ background: "white", borderRadius: "24px", padding: "28px", boxShadow: "0 15px 35px rgba(139,92,246,0.08)" }}>
            <h4 style={{ margin: 0, fontSize: "18px", color: "#111827" }}>{feature.title}</h4>
            <p style={{ marginTop: "12px", color: "#4b5563", lineHeight: 1.8 }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ResumePage;