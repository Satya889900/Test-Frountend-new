// BusinessLetterPage.jsx — Upgraded Letter Template Gallery
// Step 1: Choose letter type  →  Step 2: Pick template  →  navigate to editor

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const LETTER_TEMPLATES = [
  { name: "Professional", icon: "💼", color: "#7c3aed", description: "Clean, polished layout for all industries", category: "Professional" },
  { name: "Formal", icon: "📋", color: "#db2777", description: "Traditional block-style business format", category: "Professional" },
  { name: "Modern", icon: "✨", color: "#22c55e", description: "Contemporary design with a stylish header", category: "Professional" },
  { name: "Minimal", icon: "⚪", color: "#eab308", description: "Simple, elegant, and distraction-free", category: "Professional" },
  { name: "Corporate", icon: "🏢", color: "#3b82f6", description: "Corporate-standard format for large orgs", category: "Professional" },
  { name: "Word", icon: "📝", color: "#0ea5e9", description: "Download and fully edit in Microsoft Word", category: "Download" },
  { name: "Google Docs", icon: "🟦", color: "#2563eb", description: "Open instantly in Google Docs", category: "Download" },
  { name: "Cover Letter", icon: "✉️", color: "#f97316", description: "Professional cover letter for job applications", category: "Special" },
  { name: "Complaint", icon: "📢", color: "#ef4444", description: "Firm and formal complaint letter", category: "Special" },
];

const TEMPLATE_TYPES = [
  {
    name: "Professional",
    icon: "💼",
    color: "#7c3aed",
    bg: "#f5f3ff",
    description: "Standard business letter formats used across all industries",
    templates: ["Professional", "Formal", "Corporate", "Modern", "Minimal"],
  },
  {
    name: "Download Ready",
    icon: "⬇️",
    color: "#22c55e",
    bg: "#f0fdf4",
    description: "Optimized for instant download — Word & Google Docs",
    templates: ["Word", "Google Docs"],
  },
  {
    name: "Special Letters",
    icon: "📄",
    color: "#f97316",
    bg: "#fff7ed",
    description: "Cover letters and formal complaint correspondence",
    templates: ["Cover Letter", "Complaint"],
  },
  {
    name: "All Styles",
    icon: "🎨",
    color: "#db2777",
    bg: "#fdf2f8",
    description: "Browse every available letter template in one place",
    templates: LETTER_TEMPLATES.map((t) => t.name),
  },
];

const STEPS = ["Choose type", "Pick template", "Fill details", "Export"];

// ─── Tiny doc preview thumbnail ───────────────────────────────────────────────
function LetterThumb({ color }) {
  const a = color;
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: 6, border: "1px solid #f1f5f9", padding: "8px 7px", display: "flex", flexDirection: "column", gap: 3, overflow: "hidden" }}>
      <div style={{ height: 5, borderRadius: 2, background: a, width: "55%", marginBottom: 3 }} />
      <div style={{ height: 3, borderRadius: 2, background: "#e2e8f0", width: "40%" }} />
      <div style={{ height: 1, background: "#f1f5f9", margin: "3px 0" }} />
      {[90, 75, 85, 60, 80, 70, 88].map((w, i) => (
        <div key={i} style={{ height: 3, borderRadius: 2, background: "#f1f5f9", width: `${w}%` }} />
      ))}
      <div style={{ height: 1, background: "#f1f5f9", margin: "3px 0" }} />
      <div style={{ height: 3, borderRadius: 2, background: a + "55", width: "30%" }} />
      <div style={{ height: 3, borderRadius: 2, background: "#f1f5f9", width: "50%", marginTop: 2 }} />
    </div>
  );
}

export default function BusinessLetterPage() {
  const navigate = useNavigate();
  const [user] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("selectType");
  const [selectedType, setSType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setTimeout(() => setLoading(false), 550);
  }, [navigate]);

  const handleTypeSelect = (type) => { setSType(type); setStep("selectTemplate"); };
  const handleBack = () => { setStep("selectType"); setSType(null); };

  const filtered = selectedType
    ? LETTER_TEMPLATES.filter((t) => selectedType.templates.includes(t.name))
    : [];

  const activeStepIdx = step === "selectType" ? 0 : 1;

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 48, height: 48, border: "3px solid #ede9fe", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 0.85s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <Layout userName={user.name} showLogout={true} showSidebar={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;font-family:'Inter',sans-serif}
        @keyframes spin{to{transform:rotate(360deg)}}
        .tc{transition:all 0.22s cubic-bezier(.4,0,.2,1)}
        .tc:hover{transform:translateY(-3px)}
      `}</style>

      <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "0 0 60px" }}>

        {/* ── HERO BAND ─────────────────────────────────────────────────── */}
        <div style={{ background: "linear-gradient(135deg,#4338ca 0%,#7c3aed 55%,#a855f7 100%)", padding: "36px 36px 32px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          {/* orbs */}
          {[{ w: 260, h: 260, t: -80, r: -60 }, { w: 140, h: 140, b: -40, r: 120 }, { w: 90, h: 90, t: 16, r: 280 }].map((o, i) => (
            <div key={i} style={{ position: "absolute", width: o.w, height: o.h, borderRadius: "50%", background: "rgba(255,255,255,0.07)", top: o.t, bottom: o.b, right: o.r, pointerEvents: "none" }} />
          ))}

          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                Letter Studio
              </div>
              <h1 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", lineHeight: 1.1, margin: "0 0 10px" }}>
                Business Letter Templates
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", margin: "0 0 22px", maxWidth: 420, lineHeight: 1.6 }}>
                Pick a template style, preview instantly, fill in your details and export to PDF, Word or Google Docs.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["9 Templates", "PDF & Word Export", "AI-Assisted", "Print Ready"].map((p) => (
                  <span key={p} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "4px 13px", fontSize: 11, fontWeight: 600, color: "#fff" }}>{p}</span>
                ))}
              </div>
            </div>

            {/* Mini letter stack */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
              {[
                { color: "#7c3aed", h: 120, rotate: -3 },
                { color: "#22c55e", h: 100, rotate: 1 },
                { color: "#f97316", h: 88, rotate: 4 },
              ].map((d, i) => (
                <div key={i} style={{ width: 64, height: d.h, background: "rgba(255,255,255,0.92)", borderRadius: 9, padding: "7px 6px", display: "flex", flexDirection: "column", gap: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", transform: `rotate(${d.rotate}deg)`, flexShrink: 0 }}>
                  <div style={{ height: 4, borderRadius: 2, background: d.color, width: "60%" }} />
                  <div style={{ height: 2, borderRadius: 2, background: "#e2e8f0", width: "40%" }} />
                  <div style={{ height: 1, background: "#f1f5f9", margin: "2px 0" }} />
                  {[85, 70, 80, 65, 75].map((w, j) => (
                    <div key={j} style={{ height: 2, borderRadius: 2, background: "#e2e8f0", width: `${w}%` }} />
                  ))}
                  <div style={{ height: 2, borderRadius: 2, background: d.color + "55", width: "35%", marginTop: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "0 28px" }}>

          {/* ── STEP PROGRESS ─────────────────────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 26, flexWrap: "wrap" }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, background: i === activeStepIdx ? "#7c3aed" : i < activeStepIdx ? "#f0fdf4" : "#fff", border: `1.5px solid ${i === activeStepIdx ? "#7c3aed" : i < activeStepIdx ? "#22c55e" : "#e2e8f0"}`, borderRadius: 100, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: i === activeStepIdx ? "#fff" : i < activeStepIdx ? "#15803d" : "#94a3b8" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: i === activeStepIdx ? "rgba(255,255,255,0.25)" : i < activeStepIdx ? "#22c55e" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: i < activeStepIdx ? "#fff" : "inherit" }}>
                    {i < activeStepIdx ? "✓" : i + 1}
                  </div>
                  {s}
                </div>
                {i < STEPS.length - 1 && <div style={{ width: 24, height: 1, background: "#e2e8f0" }} />}
              </div>
            ))}
          </div>

          {/* ── MAIN GRID ─────────────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 285px", gap: 22, alignItems: "start" }}>

            {/* LEFT */}
            <div>
              {/* Section header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.4px" }}>
                    {step === "selectType" ? "Choose letter type" : `${selectedType?.name} templates`}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>
                    {step === "selectType" ? "Select the category that fits your need" : "Click a template to start editing"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 9 }}>
                  {step === "selectTemplate" && (
                    <button onClick={handleBack} style={{ padding: "8px 18px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
                  )}
                  <button onClick={() => navigate("/dashboard")} style={{ padding: "8px 18px", borderRadius: 10, border: "none", background: "#7c3aed", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Dashboard</button>
                </div>
              </div>

              {/* TYPE CARDS */}
              {step === "selectType" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 14 }}>
                  {TEMPLATE_TYPES.map((type, i) => (
                    <TypeCard key={i} type={type} onClick={() => handleTypeSelect(type)} />
                  ))}
                </div>
              )}

              {/* TEMPLATE CARDS */}
              {step === "selectTemplate" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 14 }}>
                  {filtered.map((t, i) => (
                    <TemplateCard key={i} template={t} onClick={() => navigate(`/editor/letter/${t.name.toLowerCase().replace(" ", "-")}`)} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 16 }}>

              {/* Essentials */}
              <div style={{ background: "#fff", borderRadius: 18, padding: "18px 16px", border: "1.5px solid #f1f5f9" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>Letter builder essentials</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 14, lineHeight: 1.55 }}>Everything you need for professional business letters.</div>
                {["Professional layouts", "Instant download", "Proper business etiquette", "Customisable content", "Print-ready formats"].map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 0", borderBottom: "1px solid #f8fafc", fontSize: 12, color: "#374151" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>

              {/* AI promo */}
              <div style={{ background: "linear-gradient(135deg,#4338ca,#7c3aed)", borderRadius: 18, padding: "18px 16px", color: "#fff" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>🤖</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>AI Letter Assistant</div>
                <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.55, marginBottom: 14 }}>
                  Let AI draft, rewrite and polish your business letter in seconds.
                </div>
                <button onClick={() => navigate("/editor/letter/ai-helper")}
                  style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  Open AI assistant →
                </button>
              </div>

              {/* How it works */}
              <div style={{ background: "#fff", borderRadius: 18, padding: "16px", border: "1.5px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0ea5e9" }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>How it works</div>
                </div>
                {["Select a letter type", "Choose your template", "Fill in your details", "Download or print"].map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < 3 ? "1px solid #f8fafc" : "none", fontSize: 12, color: "#374151" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#7c3aed", flexShrink: 0 }}>{i + 1}</div>
                    {s}
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div style={{ background: "#fffbeb", borderRadius: 18, padding: "14px 16px", border: "1.5px solid #fef3c7" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 5 }}>💡 Pro tip</div>
                <div style={{ fontSize: 12, color: "#78350f", lineHeight: 1.55 }}>Use the Cover Letter template when applying for jobs — it follows the exact format recruiters expect.</div>
              </div>

            </aside>
          </div>

          {/* ── FEATURE STRIP ─────────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 28 }}>
            {[
              { icon: "📄", title: "Professional format", desc: "Industry-standard layouts." },
              { icon: "⚡", title: "Quick setup", desc: "Fill and generate in minutes." },
              { icon: "📥", title: "Multiple formats", desc: "PDF, DOCX or Google Docs." },
              { icon: "✅", title: "Business etiquette", desc: "Built-in formatting standards." },
            ].map((f) => (
              <div key={f.title} style={{ background: "#fff", borderRadius: 16, padding: "18px 16px", border: "1.5px solid #f1f5f9" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 5 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.55 }}>{f.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}

// ─── Type card ────────────────────────────────────────────────────────────────
function TypeCard({ type, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 18, padding: "22px 20px", border: `1.5px solid ${hov ? type.color + "44" : "#f1f5f9"}`, cursor: "pointer", transition: "all 0.2s", transform: hov ? "translateY(-3px)" : "none", boxShadow: hov ? `0 12px 32px ${type.color}18` : "0 2px 8px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden" }}>
      {/* accent corner */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 64, height: 64, borderRadius: "0 18px 0 64px", background: type.color + "0d" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: type.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{type.icon}</div>
        <span style={{ fontSize: 10, fontWeight: 700, color: type.color, background: type.bg, padding: "3px 10px", borderRadius: 100 }}>{type.templates.length} templates</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 5 }}>{type.name}</div>
      <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, marginBottom: 14 }}>{type.description}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: type.color, display: "flex", alignItems: "center", gap: 4, transform: hov ? "translateX(4px)" : "none", transition: "transform 0.18s" }}>
        Browse templates →
      </div>
    </div>
  );
}

// ─── Template card ────────────────────────────────────────────────────────────
function TemplateCard({ template: t, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: `1.5px solid ${hov ? t.color + "55" : "#f1f5f9"}`, cursor: "pointer", transition: "all 0.2s", transform: hov ? "translateY(-3px)" : "none", boxShadow: hov ? `0 12px 32px ${t.color}18` : "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Mini preview */}
      <div style={{ height: 160, padding: 10, background: "#f8fafc" }}>
        <LetterThumb color={t.color} />
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{t.name}</div>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, marginBottom: 10 }}>{t.description}</div>
        <button onClick={onClick}
          style={{ width: "100%", padding: "7px", borderRadius: 8, border: "none", background: t.color, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Use template
        </button>
      </div>
    </div>
  );
}