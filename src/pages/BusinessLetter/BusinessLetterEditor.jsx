// BusinessLetterEditor.jsx — Upgraded Letter Editor with live preview
// Route: /editor/letter/:templateName
// Requires react-router-dom + Layout component

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

// ─── Template config ──────────────────────────────────────────────────────────
const TEMPLATES = {
  professional: { name: "Professional", color: "#7c3aed", layout: "sidebar" },
  formal: { name: "Formal", color: "#db2777", layout: "traditional" },
  modern: { name: "Modern", color: "#22c55e", layout: "top-band" },
  minimal: { name: "Minimal", color: "#eab308", layout: "minimal" },
  corporate: { name: "Corporate", color: "#3b82f6", layout: "corporate" },
  word: { name: "Word", color: "#0ea5e9", layout: "minimal" },
  "google-docs": { name: "Google Docs", color: "#2563eb", layout: "minimal" },
  "cover-letter": { name: "Cover Letter", color: "#f97316", layout: "top-band" },
  complaint: { name: "Complaint", color: "#ef4444", layout: "traditional" },
};

const EMPTY = {
  senderName: "", senderEmail: "", senderPhone: "",
  senderAddress: "", senderCity: "", senderState: "", senderZip: "",
  recipientName: "", recipientTitle: "", recipientCompany: "",
  recipientAddress: "", recipientCity: "", recipientState: "", recipientZip: "",
  date: "", subject: "", salutation: "Dear", salutationName: "",
  body: "", closing: "Sincerely", signature: "",
};

// ─── Live preview renderer ────────────────────────────────────────────────────
function LetterPreview({ data, layout, color }) {
  const d = data;
  const a = color;

  const senderBlock = (
    <div style={{ fontSize: 11, lineHeight: 1.7, color: "#374151" }}>
      {d.senderName && <div style={{ fontWeight: 700 }}>{d.senderName}</div>}
      {d.senderAddress && <div>{d.senderAddress}</div>}
      {(d.senderCity || d.senderState || d.senderZip) && (
        <div>{[d.senderCity, d.senderState, d.senderZip].filter(Boolean).join(", ")}</div>
      )}
      {d.senderEmail && <div>{d.senderEmail}</div>}
      {d.senderPhone && <div>{d.senderPhone}</div>}
    </div>
  );

  const recipientBlock = (
    <div style={{ fontSize: 11, lineHeight: 1.7, color: "#374151", marginBottom: 14 }}>
      {d.recipientName && <div style={{ fontWeight: 700 }}>{d.recipientName}</div>}
      {d.recipientTitle && <div>{d.recipientTitle}</div>}
      {d.recipientCompany && <div>{d.recipientCompany}</div>}
      {d.recipientAddress && <div>{d.recipientAddress}</div>}
      {(d.recipientCity || d.recipientState || d.recipientZip) && (
        <div>{[d.recipientCity, d.recipientState, d.recipientZip].filter(Boolean).join(", ")}</div>
      )}
    </div>
  );

  const dateSubject = (
    <>
      {d.date && <div style={{ fontSize: 11, color: "#374151", marginBottom: 10 }}>{d.date}</div>}
      {d.subject && <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Re: {d.subject}</div>}
    </>
  );

  const salLine = d.salutation === "To Whom It May Concern"
    ? "To Whom It May Concern,"
    : `${d.salutation}${d.salutationName ? " " + d.salutationName : ""},`;

  const bodyBlock = (
    <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.75, marginBottom: 18, whiteSpace: "pre-wrap" }}>
      {d.body || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Your letter body will appear here…</span>}
    </div>
  );

  const closingBlock = (
    <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.8 }}>
      <div>{d.closing || "Sincerely"},</div>
      <div style={{ marginTop: 28, borderTop: `1.5px solid ${a}`, paddingTop: 6, display: "inline-block", minWidth: 120, fontWeight: 700 }}>{d.signature || d.senderName || ""}</div>
    </div>
  );

  // ── SIDEBAR layout ──────────────────────────────────────────────────────────
  if (layout === "sidebar") return (
    <div style={{ display: "flex", minHeight: 680, fontFamily: "Georgia, serif" }}>
      <div style={{ width: "32%", background: a, padding: "28px 16px", color: "#fff" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{d.senderName || "Your Name"}</div>
        <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 20 }}>{d.senderEmail}</div>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", opacity: 0.6, marginBottom: 6 }}>Contact</div>
        {d.senderPhone && <div style={{ fontSize: 10, opacity: 0.85, marginBottom: 3 }}>{d.senderPhone}</div>}
        {d.senderAddress && <div style={{ fontSize: 10, opacity: 0.85, marginBottom: 3 }}>{d.senderAddress}</div>}
        {d.senderCity && <div style={{ fontSize: 10, opacity: 0.85 }}>{[d.senderCity, d.senderState, d.senderZip].filter(Boolean).join(", ")}</div>}
      </div>
      <div style={{ flex: 1, padding: "28px 24px" }}>
        {dateSubject}
        {recipientBlock}
        <div style={{ fontSize: 11, color: "#374151", marginBottom: 10 }}>{salLine}</div>
        {bodyBlock}
        {closingBlock}
      </div>
    </div>
  );

  // ── TOP-BAND layout ─────────────────────────────────────────────────────────
  if (layout === "top-band") return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <div style={{ background: a, padding: "20px 28px", marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{d.senderName || "Your Name"}</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 6 }}>
          {[d.senderEmail, d.senderPhone, [d.senderCity, d.senderState].filter(Boolean).join(", ")].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.8)" }}>{v}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 28px 28px" }}>
        {dateSubject}
        {recipientBlock}
        <div style={{ fontSize: 11, color: "#374151", marginBottom: 10 }}>{salLine}</div>
        {bodyBlock}
        {closingBlock}
      </div>
    </div>
  );

  // ── CORPORATE layout ────────────────────────────────────────────────────────
  if (layout === "corporate") return (
    <div style={{ fontFamily: "'Arial', sans-serif" }}>
      <div style={{ borderLeft: `4px solid ${a}`, paddingLeft: 16, marginBottom: 20, paddingTop: 4, paddingBottom: 4 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{d.senderName || "Your Name"}</div>
        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{[d.senderEmail, d.senderPhone].filter(Boolean).join(" · ")}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ fontSize: 10, color: "#94a3b8" }}>{d.date}</div>
      </div>
      {recipientBlock}
      {d.subject && (
        <div style={{ background: a + "12", border: `1px solid ${a}22`, borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, color: a, marginBottom: 14 }}>
          Subject: {d.subject}
        </div>
      )}
      <div style={{ fontSize: 11, color: "#374151", marginBottom: 10 }}>{salLine}</div>
      {bodyBlock}
      {closingBlock}
    </div>
  );

  // ── TRADITIONAL layout ──────────────────────────────────────────────────────
  if (layout === "traditional") return (
    <div style={{ fontFamily: "Georgia, serif", padding: "0 4px" }}>
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        {senderBlock}
        {d.date && <div style={{ fontSize: 11, color: "#374151", marginTop: 10 }}>{d.date}</div>}
      </div>
      {recipientBlock}
      {d.subject && <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", marginBottom: 14, textDecoration: "underline" }}>Re: {d.subject}</div>}
      <div style={{ fontSize: 11, color: "#374151", marginBottom: 10 }}>{salLine}</div>
      {bodyBlock}
      {closingBlock}
    </div>
  );

  // ── MINIMAL (default) ───────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", padding: "0 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{d.senderName || "Your Name"}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{[d.senderEmail, d.senderPhone].filter(Boolean).join(" · ")}</div>
        </div>
        <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "right" }}>
          {d.date && <div>{d.date}</div>}
          {d.senderCity && <div>{[d.senderCity, d.senderState].filter(Boolean).join(", ")}</div>}
        </div>
      </div>
      <div style={{ height: 1, background: a, marginBottom: 18 }} />
      {d.subject && <div style={{ fontSize: 11, fontWeight: 700, color: a, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.07em" }}>{d.subject}</div>}
      {recipientBlock}
      <div style={{ fontSize: 11, color: "#374151", marginBottom: 10 }}>{salLine}</div>
      {bodyBlock}
      {closingBlock}
    </div>
  );
}

// ─── Form field helpers ───────────────────────────────────────────────────────
const iStyle = (color) => ({
  width: "100%", padding: "8px 11px", border: "1.5px solid #e2e8f0", borderRadius: 9,
  fontSize: 12, outline: "none", fontFamily: "inherit", color: "#0f172a", background: "#fff",
  transition: "border-color 0.15s",
});

function FG({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 10, fontWeight: 600, color: "#64748b" }}>{label}</label>
      {children}
    </div>
  );
}

function Row2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>{children}</div>;
}

function Row3({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10, marginBottom: 10 }}>{children}</div>;
}

function SectionCard({ icon, title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "18px 16px", border: "1.5px solid #f1f5f9", marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 14, display: "flex", alignItems: "center", gap: 7, paddingBottom: 9, borderBottom: "1px solid #f8fafc" }}>
        <span style={{ fontSize: 15 }}>{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

// ─── Main editor ──────────────────────────────────────────────────────────────
export default function BusinessLetterEditor() {
  const navigate = useNavigate();
  const { templateName } = useParams();
  const [user] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ ...EMPTY });
  const [tab, setTab] = useState("sender");   // sender | recipient | content

  const tmpl = TEMPLATES[templateName] || TEMPLATES.professional;
  const a = tmpl.color;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setData((d) => ({ ...d, date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }));
    setTimeout(() => setLoading(false), 500);
  }, [navigate]);

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 46, height: 46, border: `3px solid ${a}22`, borderTopColor: a, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const TABS = [
    { id: "sender", label: "Sender", icon: "👤" },
    { id: "recipient", label: "Recipient", icon: "🏢" },
    { id: "content", label: "Content", icon: "✍️" },
  ];

  return (
    <Layout userName={user.name} showLogout={true} showSidebar={false}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;font-family:'Inter',sans-serif}
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{border-color:${a}!important;box-shadow:0 0 0 3px ${a}18!important;outline:none}
      `}</style>

      <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

        {/* ── HEADER ────────────────────────────────────────────────── */}
        <div style={{ background: `linear-gradient(135deg,${a}ee,${a})`, padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => navigate("/letter-builder")}
              style={{ padding: "7px 16px", borderRadius: 9, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              ← Templates
            </button>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{tmpl.name} Letter</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Fill in your details — preview updates live</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            <button style={{ padding: "8px 18px", borderRadius: 9, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              Save draft
            </button>
            <button onClick={() => window.print()}
              style={{ padding: "8px 18px", borderRadius: 9, border: "none", background: "#fff", color: a, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              Download PDF ↗
            </button>
          </div>
        </div>

        {/* ── BODY ──────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", minHeight: "calc(100vh - 66px)" }}>

          {/* Form pane */}
          <div style={{ background: "#fff", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column", height: "calc(100vh - 66px)", overflow: "hidden" }}>

            {/* Tab bar */}
            <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9", padding: "0 16px" }}>
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ flex: 1, padding: "12px 6px", border: "none", borderBottom: `2.5px solid ${tab === t.id ? a : "transparent"}`, background: "none", color: tab === t.id ? a : "#94a3b8", fontWeight: tab === t.id ? 700 : 500, fontSize: 12, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all 0.15s" }}>
                  <span style={{ fontSize: 14 }}>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>

            {/* Form body */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>

              {/* SENDER TAB */}
              {tab === "sender" && (
                <>
                  <SectionCard icon="👤" title="Your information">
                    <Row2>
                      <FG label="Full name"><input value={data.senderName} onChange={set("senderName")} placeholder="John Doe" style={iStyle(a)} /></FG>
                      <FG label="Email">    <input value={data.senderEmail} onChange={set("senderEmail")} placeholder="john@example.com" style={iStyle(a)} type="email" /></FG>
                    </Row2>
                    <div style={{ marginBottom: 10 }}>
                      <FG label="Phone"><input value={data.senderPhone} onChange={set("senderPhone")} placeholder="+1 (555) 123-4567" style={iStyle(a)} /></FG>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                      <FG label="Street address"><input value={data.senderAddress} onChange={set("senderAddress")} placeholder="123 Main Street" style={iStyle(a)} /></FG>
                    </div>
                    <Row3>
                      <FG label="City">    <input value={data.senderCity} onChange={set("senderCity")} placeholder="New York" style={iStyle(a)} /></FG>
                      <FG label="State">   <input value={data.senderState} onChange={set("senderState")} placeholder="NY" style={iStyle(a)} /></FG>
                      <FG label="ZIP">     <input value={data.senderZip} onChange={set("senderZip")} placeholder="10001" style={iStyle(a)} /></FG>
                    </Row3>
                  </SectionCard>
                </>
              )}

              {/* RECIPIENT TAB */}
              {tab === "recipient" && (
                <SectionCard icon="🏢" title="Recipient information">
                  <Row2>
                    <FG label="Recipient name"><input value={data.recipientName} onChange={set("recipientName")} placeholder="Jane Smith" style={iStyle(a)} /></FG>
                    <FG label="Title">         <input value={data.recipientTitle} onChange={set("recipientTitle")} placeholder="HR Manager" style={iStyle(a)} /></FG>
                  </Row2>
                  <div style={{ marginBottom: 10 }}>
                    <FG label="Company"><input value={data.recipientCompany} onChange={set("recipientCompany")} placeholder="ABC Corporation" style={iStyle(a)} /></FG>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <FG label="Street address"><input value={data.recipientAddress} onChange={set("recipientAddress")} placeholder="456 Business Ave" style={iStyle(a)} /></FG>
                  </div>
                  <Row3>
                    <FG label="City">  <input value={data.recipientCity} onChange={set("recipientCity")} placeholder="Los Angeles" style={iStyle(a)} /></FG>
                    <FG label="State"> <input value={data.recipientState} onChange={set("recipientState")} placeholder="CA" style={iStyle(a)} /></FG>
                    <FG label="ZIP">   <input value={data.recipientZip} onChange={set("recipientZip")} placeholder="90210" style={iStyle(a)} /></FG>
                  </Row3>
                </SectionCard>
              )}

              {/* CONTENT TAB */}
              {tab === "content" && (
                <>
                  <SectionCard icon="📅" title="Date & subject">
                    <div style={{ marginBottom: 10 }}>
                      <FG label="Date"><input value={data.date} onChange={set("date")} placeholder="January 15, 2025" style={iStyle(a)} /></FG>
                    </div>
                    <FG label="Subject line"><input value={data.subject} onChange={set("subject")} placeholder="Subject of your letter" style={iStyle(a)} /></FG>
                  </SectionCard>

                  <SectionCard icon="✍️" title="Letter content">
                    <Row2>
                      <FG label="Salutation">
                        <select value={data.salutation} onChange={set("salutation")} style={{ ...iStyle(a), cursor: "pointer" }}>
                          {["Dear", "To Whom It May Concern", "Hello", "Dear Sir/Madam"].map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </FG>
                      <FG label="Recipient (for salutation)">
                        <input value={data.salutationName} onChange={set("salutationName")} placeholder="Jane Smith" style={iStyle(a)} />
                      </FG>
                    </Row2>
                    <div style={{ marginBottom: 10 }}>
                      <FG label="Letter body">
                        <textarea value={data.body} onChange={set("body")} placeholder="Write the main content of your letter here…"
                          style={{ ...iStyle(a), minHeight: 160, resize: "vertical", lineHeight: 1.6 }} />
                      </FG>
                    </div>
                    <Row2>
                      <FG label="Closing">
                        <select value={data.closing} onChange={set("closing")} style={{ ...iStyle(a), cursor: "pointer" }}>
                          {["Sincerely", "Best regards", "Regards", "Thank you", "Yours truly"].map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </FG>
                      <FG label="Your signature">
                        <input value={data.signature} onChange={set("signature")} placeholder="John Doe" style={iStyle(a)} />
                      </FG>
                    </Row2>
                  </SectionCard>
                </>
              )}
            </div>

            {/* Bottom action bar */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 9 }}>
              {tab !== "sender" && (
                <button onClick={() => setTab(tab === "content" ? "recipient" : "sender")}
                  style={{ flex: 1, padding: "9px", borderRadius: 9, border: "1.5px solid #e2e8f0", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  ← Previous
                </button>
              )}
              {tab !== "content" ? (
                <button onClick={() => setTab(tab === "sender" ? "recipient" : "content")}
                  style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", background: a, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  Next →
                </button>
              ) : (
                <button onClick={() => window.print()}
                  style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", background: a, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  Download PDF ↗
                </button>
              )}
            </div>
          </div>

          {/* Preview pane */}
          <div style={{ background: "#e8ecf5", padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Preview header */}
            <div style={{ width: "100%", maxWidth: 640, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>Live preview</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, background: a + "14", color: a, padding: "3px 10px", borderRadius: 100, fontWeight: 600 }}>{tmpl.name}</span>
                <span style={{ fontSize: 11, background: "#f1f5f9", color: "#64748b", padding: "3px 10px", borderRadius: 100 }}>A4</span>
              </div>
            </div>

            {/* Paper */}
            <div style={{ width: "100%", maxWidth: 640, background: "#fff", borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: 36, minHeight: 700 }}>
              <LetterPreview data={data} layout={tmpl.layout} color={tmpl.color} />
            </div>

            {/* Watermark note */}
            <div style={{ marginTop: 14, fontSize: 11, color: "#94a3b8", textAlign: "center" }}>Watermark will be removed in the downloaded version</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}