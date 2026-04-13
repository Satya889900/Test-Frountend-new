// ResumePage.jsx
// Full 3-step resume builder:
//   Step 1 → Gallery     (browse & pick template)
//   Step 2 → Configure   (colour, photo, font, layout)
//   Step 3 → Builder     (fill form, live preview, export)
//
// Drop this file (plus resumeData.js and ResumePreview.jsx) into your project.
// Requires react-router-dom for useNavigate.

import { useState, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ResumePreview from "./Resumepreview";
import {
  TEMPLATES, CATEGORIES, FILTER_TYPES,
  COLORS, FONT_OPTIONS, DEFAULT_FORM,
} from "./Resumedata";

// ─── Tiny inline styles reused across steps ───────────────────────────────────
const S = {
  page:   { minHeight: "100vh", background: "#f0f4ff", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  nav:    { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo:   { fontSize: 15, fontWeight: 700, color: "#4f46e5" },
  hero:   { background: "linear-gradient(135deg,#312e81 0%,#4f46e5 55%,#7c3aed 100%)", padding: "36px 28px 28px", textAlign: "center", color: "#fff" },
  pill:   { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "5px 14px", fontSize: 11, fontWeight: 500 },
  toolbar:{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 28px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" },
  gallery:{ padding: "22px 28px" },
  catLabel:{ fontSize: 11, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 12px" },
  grid:   { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(175px,1fr))", gap: 14, marginBottom: 32 },
  card:   { background: "#fff", borderRadius: 12, border: "1.5px solid #e5e7eb", cursor: "pointer", overflow: "hidden", transition: "all 0.2s", position: "relative" },
};

// ─── Mini document preview (thumbnail in gallery) ─────────────────────────────
function DocMini({ accent, layout }) {
  const a = accent;
  const line = (w, op = 0.35) => (
    <div style={{ height: 2, background: `rgba(255,255,255,${op})`, borderRadius: 2, width: `${w}%`, marginBottom: 2 }} />
  );
  const grayLine = (w) => (
    <div style={{ height: 2, background: "#f3f4f6", borderRadius: 2, width: `${w}%`, marginBottom: 2 }} />
  );
  const sectionLabel = (text) => (
    <div style={{ fontSize: 6, color: a, fontWeight: 700, marginBottom: 2 }}>{text}</div>
  );

  if (layout === "sidebar") return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: "36%", background: a, padding: "7px 5px" }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.3)", margin: "0 auto 5px" }} />
        {line(80, 0.7)}{line(60, 0.4)}
        <div style={{ marginTop: 6 }} />
        {[70, 85, 55, 65].map((w, i) => line(w, 0.35 + i * 0.05))}
      </div>
      <div style={{ flex: 1, padding: "7px 5px" }}>
        <div style={{ height: 3, background: a, borderRadius: 2, width: "50%", marginBottom: 3 }} />
        {[90, 75, 65, 80, 55, 70].map((w, i) => grayLine(w))}
      </div>
    </div>
  );

  if (layout === "top") return (
    <div>
      <div style={{ background: a, padding: "8px 6px" }}>
        <div style={{ height: 5, background: "rgba(255,255,255,0.9)", borderRadius: 2, width: "50%", marginBottom: 3 }} />
        <div style={{ height: 3, background: "rgba(255,255,255,0.5)", borderRadius: 2, width: "35%" }} />
      </div>
      <div style={{ padding: "6px 6px" }}>
        {["Exp", "Edu", "Skills"].map((s) => (
          <div key={s}>
            {sectionLabel(s)}
            {[90, 70, 80].map((w, i) => grayLine(w))}
            <div style={{ marginBottom: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (layout === "corporate") return (
    <div>
      <div style={{ background: a, padding: "8px 6px", display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        <div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.9)", borderRadius: 2, width: 55, marginBottom: 2 }} />
          <div style={{ height: 2, background: "rgba(255,255,255,0.5)", borderRadius: 2, width: 35 }} />
        </div>
      </div>
      <div style={{ padding: "6px 6px" }}>
        {["Exp", "Edu", "Skills"].map((s) => (
          <div key={s}>
            <div style={{ fontSize: 6, color: a, fontWeight: 700, borderLeft: `2px solid ${a}`, paddingLeft: 3, marginBottom: 2 }}>{s}</div>
            {[88, 70, 80].map((w) => grayLine(w))}
            <div style={{ marginBottom: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );

  // minimal
  return (
    <div style={{ padding: "8px 7px" }}>
      <div style={{ height: 5, background: "#111", borderRadius: 2, width: "50%", marginBottom: 2 }} />
      <div style={{ height: 2, background: "#9ca3af", borderRadius: 2, width: "35%", marginBottom: 6 }} />
      <div style={{ height: 1, background: "#e5e7eb", marginBottom: 5 }} />
      {["Exp", "Edu", "Skills"].map((s) => (
        <div key={s}>
          <div style={{ fontSize: 6, color: a, fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{s}</div>
          {[90, 75, 65].map((w) => grayLine(w))}
          <div style={{ marginBottom: 4 }} />
        </div>
      ))}
    </div>
  );
}

// ─── Reusable Btn ─────────────────────────────────────────────────────────────
function Btn({ onClick, children, variant = "primary", style = {} }) {
  const base = { padding: "8px 18px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", transition: "background 0.15s" };
  const variants = {
    primary: { background: "#4f46e5", color: "#fff" },
    ghost:   { background: "#f3f4f6", color: "#1f2937" },
    white:   { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}

// ─── Form field helpers ───────────────────────────────────────────────────────
function FGroup({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <label style={{ fontSize: 10, fontWeight: 600, color: "#6b7280" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { padding: "7px 9px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 11, outline: "none", fontFamily: "inherit", color: "#111827", background: "#fff", width: "100%" };

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — GALLERY
// ─────────────────────────────────────────────────────────────────────────────
function GalleryStep({ onSelect }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchType = filter === "All" || t.type === filter;
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filter, search]);

  const isSearching = search || filter !== "All";

  return (
    <div style={S.page}>
      {/* Nav */}
      <div style={S.nav}>
        <div style={S.logo}>ResumeStudio</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Btn>
          <Btn variant="primary">My Resumes</Btn>
        </div>
      </div>

      {/* Hero */}
      <div style={S.hero}>
        <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Choose your resume template</h1>
        <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 18 }}>Pick a template, choose your colour, add your photo — build in minutes.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {["105+ Templates", "Custom Colours", "Photo Upload", "ATS Optimized", "PDF Export"].map((t) => (
            <div key={t} style={S.pill}>{t}</div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div style={S.toolbar}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.4 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            style={{ ...inputStyle, paddingLeft: 34, borderRadius: 10 }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTER_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: "6px 14px", borderRadius: 100, fontSize: 11, fontWeight: 600, cursor: "pointer",
                border: "1px solid",
                borderColor: filter === t ? "#4f46e5" : "#e5e7eb",
                background: filter === t ? "#4f46e5" : "#fff",
                color: filter === t ? "#fff" : "#4b5563",
                transition: "all 0.15s",
              }}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div style={S.gallery}>
        {isSearching ? (
          <>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 14 }}>{filtered.length} templates found</div>
            <div style={S.grid}>
              {filtered.map((t) => <TemplateCard key={t.id} template={t} onSelect={onSelect} />)}
            </div>
          </>
        ) : (
          Object.entries(CATEGORIES).map(([cat, ids]) => {
            const ts = ids.map((id) => TEMPLATES.find((t) => t.id === id)).filter(Boolean);
            return (
              <div key={cat}>
                <div style={S.catLabel}>{cat}</div>
                <div style={S.grid}>
                  {ts.map((t) => <TemplateCard key={t.id} template={t} onSelect={onSelect} />)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function TemplateCard({ template: t, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...S.card,
        borderColor: hovered ? "#4f46e5" : "#e5e7eb",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(79,70,229,0.13)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(t)}
    >
      {/* Badge */}
      {t.badge === "popular" && (
        <div style={{ position: "absolute", top: 6, right: 6, background: "#fef3c7", color: "#92400e", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 100 }}>Popular</div>
      )}
      {t.badge === "new" && (
        <div style={{ position: "absolute", top: 6, right: 6, background: "#d1fae5", color: "#065f46", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 100 }}>New</div>
      )}

      {/* Preview */}
      <div style={{ height: 200, overflow: "hidden", padding: 8, background: "#f9fafb" }}>
        <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: 5, border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <DocMini accent={t.accent} layout={t.layout} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "9px 10px 10px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", marginBottom: 1 }}>{t.name}</div>
        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 7 }}>{t.type}</div>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(t); }}
          style={{ width: "100%", padding: "6px", borderRadius: 7, background: "#4f46e5", color: "#fff", fontSize: 11, fontWeight: 600, border: "none", cursor: "pointer" }}
        >Customise &amp; Use</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — CONFIGURE
// ─────────────────────────────────────────────────────────────────────────────
function ConfigureStep({ template, config, setConfig, onBack, onNext }) {
  const photoInputRef = useRef(null);

  const update = useCallback((key, val) => setConfig((c) => ({ ...c, [key]: val })), [setConfig]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update("photo", ev.target.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => update("photo", null);

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#312e81,#4f46e5)", padding: "14px 28px", display: "flex", alignItems: "center", gap: 14 }}>
        <Btn variant="white" onClick={onBack}>← Templates</Btn>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{template.name}</div>
        <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, padding: "3px 12px", borderRadius: 100 }}>{template.type}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", flex: 1, minHeight: 600 }}>
        {/* Left — options */}
        <div style={{ background: "#e8ecf5", padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Colour */}
          <ConfigCard title="🎨 Choose accent colour">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {COLORS.map((c) => (
                <div
                  key={c}
                  onClick={() => update("accent", c)}
                  style={{
                    width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer",
                    border: `2.5px solid ${config.accent === c ? "#fff" : "transparent"}`,
                    boxShadow: config.accent === c ? `0 0 0 2.5px #4f46e5` : "none",
                    transition: "all 0.15s",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>Custom:</label>
              <input type="color" value={config.accent} onChange={(e) => update("accent", e.target.value)}
                style={{ width: 36, height: 28, border: "1px solid #e5e7eb", borderRadius: 6, cursor: "pointer", padding: 2 }} />
              <span style={{ fontSize: 11, color: "#6b7280" }}>{config.accent}</span>
            </div>
          </ConfigCard>

          {/* Photo */}
          <ConfigCard title="📷 Profile photo (optional)">
            <input type="file" accept="image/*" ref={photoInputRef} onChange={handlePhoto} style={{ display: "none" }} />
            {config.photo ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={config.photo} alt="profile"
                  style={{ width: 60, height: 60, borderRadius: config.circlePhoto ? "50%" : 8, objectFit: "cover", border: "2px solid #4f46e5" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Btn variant="ghost" style={{ fontSize: 11 }} onClick={() => photoInputRef.current.click()}>Change photo</Btn>
                  <Btn variant="ghost" style={{ fontSize: 11, color: "#dc2626" }} onClick={removePhoto}>Remove</Btn>
                </div>
              </div>
            ) : (
              <div
                onClick={() => photoInputRef.current.click()}
                style={{ border: "2px dashed #d1d5db", borderRadius: 10, padding: 16, textAlign: "center", cursor: "pointer" }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#4b5563" }}>Click to upload photo</div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>JPG, PNG — appears on your resume</div>
              </div>
            )}
            <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#4b5563", cursor: "pointer" }}>
                <input type="checkbox" checked={config.circlePhoto} onChange={(e) => update("circlePhoto", e.target.checked)} /> Circular crop
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#4b5563", cursor: "pointer" }}>
                <input type="checkbox" checked={config.showPhoto} onChange={(e) => update("showPhoto", e.target.checked)} /> Show on resume
              </label>
            </div>
          </ConfigCard>

          {/* Font */}
          <ConfigCard title="✏️ Font style">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {FONT_OPTIONS.map((fo) => (
                <button key={fo.value} onClick={() => update("font", fo.value)}
                  style={{
                    padding: "6px 12px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 11,
                    fontFamily: fo.value,
                    borderColor: config.font === fo.value ? "#4f46e5" : "#e5e7eb",
                    background: config.font === fo.value ? "#4f46e5" : "#fff",
                    color: config.font === fo.value ? "#fff" : "#374151",
                  }}>{fo.label}</button>
              ))}
            </div>
          </ConfigCard>

          {/* Layout */}
          <ConfigCard title="📐 Layout variant">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["sidebar", "top", "minimal", "corporate"].map((l) => (
                <button key={l} onClick={() => update("layout", l)}
                  style={{
                    padding: "6px 14px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 11, fontWeight: 500,
                    borderColor: config.layout === l ? "#4f46e5" : "#e5e7eb",
                    background: config.layout === l ? "#4f46e5" : "#fff",
                    color: config.layout === l ? "#fff" : "#374151",
                    textTransform: "capitalize",
                  }}>{l === "top" ? "Top header" : l.charAt(0).toUpperCase() + l.slice(1)}</button>
              ))}
            </div>
          </ConfigCard>

        </div>

        {/* Right — preview */}
        <div style={{ background: "#fff", borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, background: "#dde3f0", padding: 16, overflowY: "auto", display: "flex", justifyContent: "center" }}>
            <div style={{ background: "#fff", width: "100%", maxWidth: 400, minHeight: 560, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>
              <ResumePreview config={config} form={DEFAULT_FORM} />
            </div>
          </div>
          <div style={{ padding: "14px 16px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 8 }}>
            <Btn variant="ghost" onClick={onBack} style={{ flex: 1 }}>← Back</Btn>
            <Btn variant="primary" onClick={onNext} style={{ flex: 1 }}>Use this design →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigCard({ title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#1f2937", marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function BuilderStep({ template, config, onBack, onChangeTemplate }) {
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const Field = ({ label, field, placeholder, type = "text" }) => (
    <FGroup label={label}>
      <input
        type={type}
        value={form[field] || ""}
        placeholder={placeholder}
        onChange={(e) => update(field, e.target.value)}
        style={inputStyle}
      />
    </FGroup>
  );

  const TextArea = ({ label, field, placeholder }) => (
    <FGroup label={label}>
      <textarea
        value={form[field] || ""}
        placeholder={placeholder}
        onChange={(e) => update(field, e.target.value)}
        style={{ ...inputStyle, minHeight: 64, resize: "vertical" }}
      />
    </FGroup>
  );

  const Row2 = ({ children }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>{children}</div>
  );

  const SectionTitle = ({ icon, text }) => (
    <div style={{ fontSize: 11, fontWeight: 700, color: "#1f2937", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 20, height: 20, borderRadius: 5, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{icon}</div>
      {text}
    </div>
  );

  const AddMore = ({ label }) => (
    <button style={{ width: "100%", padding: "7px", borderRadius: 8, border: "1.5px dashed #e5e7eb", background: "#f9fafb", color: "#4f46e5", fontSize: 11, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>{label}</button>
  );

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#312e81,#4f46e5)", padding: "14px 28px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <Btn variant="white" onClick={onBack}>← Reconfigure</Btn>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{template.name}</div>
        <div style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, padding: "3px 12px", borderRadius: 100 }}>{template.type}</div>
        <Btn variant="white" style={{ marginLeft: "auto", fontSize: 11 }} onClick={onChangeTemplate}>Change template</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", flex: 1, minHeight: 600 }}>
        {/* Live preview */}
        <div style={{ background: "#dde3f0", padding: 20, overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 480, minHeight: 660, borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", overflow: "hidden" }}>
            <ResumePreview config={config} form={form} />
          </div>
        </div>

        {/* Form pane */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, background: "#fff", padding: 20, overflowY: "auto" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Fill your details</h2>
            <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 18 }}>Preview updates as you type</p>

            {/* Personal */}
            <div style={{ marginBottom: 20 }}>
              <SectionTitle icon="👤" text="Personal info" />
              <Row2>
                <Field label="First name"  field="fname"   placeholder="John" />
                <Field label="Last name"   field="lname"   placeholder="Doe" />
              </Row2>
              <div style={{ marginBottom: 8 }}>
                <Field label="Professional title" field="title" placeholder="e.g. Software Engineer" />
              </div>
              <Row2>
                <Field label="Email"  field="email" placeholder="you@email.com" type="email" />
                <Field label="Phone"  field="phone" placeholder="+1 234 567 890" />
              </Row2>
              <div style={{ marginBottom: 8 }}>
                <Field label="LinkedIn / Website" field="linkedin" placeholder="linkedin.com/in/yourname" />
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: 20 }}>
              <SectionTitle icon="📝" text="Professional summary" />
              <TextArea label="Summary" field="summary" placeholder="Write 2-3 sentences about yourself..." />
            </div>

            {/* Experience */}
            <div style={{ marginBottom: 20 }}>
              <SectionTitle icon="💼" text="Work experience" />
              <Row2>
                <Field label="Job title" field="jobtitle" placeholder="Senior Developer" />
                <Field label="Company"   field="company"  placeholder="Acme Corp" />
              </Row2>
              <Row2>
                <Field label="Start date" field="jobstart" placeholder="2021" />
                <Field label="End date"   field="jobend"   placeholder="Present" />
              </Row2>
              <div style={{ marginBottom: 4 }}>
                <TextArea label="Description" field="jobdesc" placeholder="Describe your responsibilities..." />
              </div>
              <AddMore label="+ Add another position" />
            </div>

            {/* Education */}
            <div style={{ marginBottom: 20 }}>
              <SectionTitle icon="🎓" text="Education" />
              <Row2>
                <Field label="Degree" field="degree" placeholder="B.S. Computer Science" />
                <Field label="School" field="school" placeholder="University name" />
              </Row2>
              <Row2>
                <Field label="Graduation year" field="gradyear" placeholder="2020" />
                <FGroup label="GPA (optional)"><input type="text" placeholder="3.8" style={inputStyle} /></FGroup>
              </Row2>
              <AddMore label="+ Add education" />
            </div>

            {/* Skills */}
            <div style={{ marginBottom: 20 }}>
              <SectionTitle icon="⚡" text="Skills" />
              <Field label="Skills (comma separated)" field="skills" placeholder="JavaScript, React, Python..." />
            </div>

            {/* Languages */}
            <div style={{ marginBottom: 20 }}>
              <SectionTitle icon="🌐" text="Languages" />
              <Row2>
                <Field label="Language" field="language" placeholder="English" />
                <FGroup label="Level">
                  <select value={form.langLevel || "Native"} onChange={(e) => update("langLevel", e.target.value)} style={inputStyle}>
                    {["Native", "Fluent", "Intermediate", "Basic"].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </FGroup>
              </Row2>
              <AddMore label="+ Add language" />
            </div>
          </div>

          {/* Export bar */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 8, background: "#fff" }}>
            <Btn variant="ghost" onClick={onBack} style={{ flex: 1 }}>Edit design</Btn>
            <Btn variant="primary" style={{ flex: 1 }} onClick={() => window.print()}>Download PDF ↗</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — ResumePage  (wires all 3 steps together)
// ─────────────────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const [step, setStep] = useState("gallery"); // "gallery" | "configure" | "builder"
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const user = { name: "Satya" };
  const [config, setConfig] = useState({
    accent: "#4f46e5",
    font: "'Segoe UI', sans-serif",
    layout: "sidebar",
    photo: null,
    circlePhoto: true,
    showPhoto: true,
  });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setConfig((c) => ({ ...c, accent: template.accent, layout: template.layout }));
    setStep("configure");
  };

  if (step === "gallery") {
    return <GalleryStep onSelect={handleSelectTemplate} />;
  }

  if (step === "configure") {
    return (
      <ConfigureStep
        template={selectedTemplate}
        config={config}
        setConfig={setConfig}
        onBack={() => setStep("gallery")}
        onNext={() => setStep("builder")}
      />
    );
  }

  return (
    <BuilderStep
      template={selectedTemplate}
      config={config}
      onBack={() => setStep("configure")}
      onChangeTemplate={() => setStep("gallery")}
    />
  );
}
