// ─────────────────────────────────────────────────────────────────────────────
// constants.js — Shared design tokens, helpers, and pure UI components
// Used by: CreateTemplate.jsx, ViewTemplate.jsx, AllTemplates.jsx
// ─────────────────────────────────────────────────────────────────────────────

// ── Accent colours ────────────────────────────────────────────────────────────
export const COLORS = {
  blue:   { hex: "#3b82f6", name: "Ocean Blue" },
  red:    { hex: "#ef4444", name: "Crimson Red" },
  yellow: { hex: "#eab308", name: "Golden Yellow" },
  green:  { hex: "#22c55e", name: "Emerald Green" },
  purple: { hex: "#8b5cf6", name: "Royal Purple" },
  teal:   { hex: "#14b8a6", name: "Teal Mint" },
  orange: { hex: "#f97316", name: "Burnt Orange" },
  pink:   { hex: "#ec4899", name: "Hot Pink" },
};

// ── Layout styles ─────────────────────────────────────────────────────────────
export const LAYOUTS = {
  classic:  { label: "Classic",  emoji: "📄", desc: "Traditional elegance" },
  modern:   { label: "Modern",   emoji: "✨", desc: "Clean contemporary" },
  creative: { label: "Creative", emoji: "🎨", desc: "Unique artistic" },
  minimal:  { label: "Minimal",  emoji: "◻️",  desc: "Ultra clean" },
};

// ── Document types ────────────────────────────────────────────────────────────
export const DOC_TYPES = {
  letter:  { label: "Business Letter", desc: "Professional correspondence", icon: "📝" },
  resume:  { label: "Resume / CV",      desc: "Modern CV design",            icon: "👤" },
  invoice: { label: "Invoice",          desc: "Clean billing document",      icon: "🧾" },
  report:  { label: "Report",           desc: "Structured analysis",         icon: "📊" },
  proposal:{ label: "Proposal",         desc: "Project or sales proposal",   icon: "💼" },
  memo:    { label: "Memo",             desc: "Internal communication",      icon: "📋" },
};

// ── Design customisation options ──────────────────────────────────────────────
export const BORDER_STYLES     = ["none", "solid", "dashed", "double", "dotted"];
export const BORDER_WEIGHTS    = ["1px", "2px", "3px", "4px"];
export const BORDER_PLACEMENTS = ["all", "top", "bottom", "left", "right", "top+bottom", "left+right"];

export const SHAPE_TYPES     = ["none", "circles", "squares", "dots", "triangles", "diamonds", "lines"];
export const SHAPE_OPACITIES = [0.12, 0.35, 0.7];
export const SHAPE_OPACITY_LABELS = ["Ghost", "Mid", "Full"];

export const HEADING_FONTS = [
  "'Syne', sans-serif",
  "'Playfair Display', serif",
  "'Space Grotesk', sans-serif",
  "'DM Serif Display', serif",
  "'Bebas Neue', cursive",
];
export const BODY_FONTS = [
  "'DM Sans', sans-serif",
  "Georgia, serif",
  "'IBM Plex Mono', monospace",
  "'Lato', sans-serif",
];
export const HEADING_FONT_NAMES = ["Syne", "Playfair", "Space Grotesk", "DM Serif", "Bebas Neue"];
export const BODY_FONT_NAMES    = ["DM Sans", "Georgia", "IBM Plex Mono", "Lato"];

// ── Google Fonts URL ─────────────────────────────────────────────────────────
export const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@700;800&family=Space+Grotesk:wght@600;700&family=DM+Serif+Display&family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&family=Lato:wght@400;700&display=swap";

// ── Default design state ──────────────────────────────────────────────────────
export const DEFAULT_DESIGN = {
  accentColor:      "blue",
  borderStyle:      "solid",
  borderWeight:     "3px",
  borderPlacement:  "left",
  borderColor:      "#6366f1",
  cornerRadius:     8,
  shapeType:        "none",
  shapeColor:       "#6366f1",
  shapeOpacity:     0.12,
  headerBg:         "#1e1b4b",
  headerText:       "#ffffff",
  bodyBg:           "#ffffff",
  footerBg:         "#f5f4f1",
  dividerColor:     "#e5e7eb",
  headingFont:      0,
  bodyFont:         0,
  headingSize:      22,
  textAlign:        "left",
  lineSpacing:      1.7,
};

// ── Default form state ────────────────────────────────────────────────────────
export const DEFAULT_FORM = {
  company:  "",
  date:     new Date().toISOString().split("T")[0],
  receiver: "",
  subject:  "",
  body:     "",
  summary:  "",
};

// ── Global CSS variables / palette ───────────────────────────────────────────
export const PALETTE = {
  ink:      "#0d0d0f",
  ink2:     "#3a3a45",
  ink3:     "#7a7a8a",
  surface:  "#ffffff",
  surface2: "#f5f4f1",
  surface3: "#eeede8",
  border:   "rgba(0,0,0,0.08)",
  border2:  "rgba(0,0,0,0.14)",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a design object's border settings into React inline style properties.
 */
export function getBorderCSS(d) {
  if (d.borderStyle === "none") return {};
  const val = `${d.borderWeight} ${d.borderStyle} ${d.borderColor}`;
  const map = {
    all:         { border: val },
    top:         { borderTop: val },
    bottom:      { borderBottom: val },
    left:        { borderLeft: val },
    right:       { borderRight: val },
    "top+bottom":{ borderTop: val, borderBottom: val },
    "left+right":{ borderLeft: val, borderRight: val },
  };
  return map[d.borderPlacement] || {};
}

/**
 * Validate a single form field. Returns error string or null.
 */
export function validateField(key, value) {
  const v = (value ?? "").toString();
  if (!v.trim()) return `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
  if ((key === "body" || key === "summary") && v.trim().length < 10)
    return "Must be at least 10 characters";
  return null;
}

export function requiredFormKeys(docType) {
  if (docType === "resume") return ["company", "date", "receiver", "subject", "summary"];
  return ["company", "date", "receiver", "subject", "body"];
}

/**
 * Returns true when all required form fields are valid.
 */
export function isFormComplete(form, docType) {
  const keys = requiredFormKeys(docType);
  return keys.every((k) => {
    const v = (form?.[k] ?? "").toString().trim();
    if (!v) return false;
    if ((k === "body" || k === "summary") && v.length < 10) return false;
    return true;
  });
}

/**
 * Returns 0-100 completion percentage for the form.
 */
export function formProgress(form, docType) {
  const keys = requiredFormKeys(docType);
  const filled = keys.filter((k) => form[k]?.trim()).length;
  return Math.round((filled / keys.length) * 100);
}

/**
 * Generate a unique ID for saved templates.
 */
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PURE COMPONENTS  (no useState, just rendering)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Decorative shape overlay rendered on top of the letter header.
 */
export function ShapeOverlay({ d }) {
  if (!d || d.shapeType === "none") return null;
  const c = d.shapeColor;
  const o = d.shapeOpacity;
  const wrap = {
    position: "absolute", top: 0, left: 0,
    width: "100%", height: "100%",
    pointerEvents: "none", overflow: "hidden",
  };

  if (d.shapeType === "circles")
    return (
      <div style={wrap}>
        {[[10,10,60],[80,5,40],[5,70,30],[75,65,50]].map(([x,y,r],i) => (
          <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:r,height:r,borderRadius:"50%",background:c,opacity:o,transform:"translate(-50%,-50%)"}}/>
        ))}
      </div>
    );

  if (d.shapeType === "squares")
    return (
      <div style={wrap}>
        {[[8,8,50,15],[82,6,36,25],[4,75,28,10],[78,70,44,5]].map(([x,y,r,rot],i) => (
          <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:r,height:r,background:"none",border:`2px solid ${c}`,opacity:o,transform:`translate(-50%,-50%) rotate(${rot}deg)`}}/>
        ))}
      </div>
    );

  if (d.shapeType === "dots")
    return (
      <div style={wrap}>
        {Array.from({length:30},(_,i) => (
          <div key={i} style={{position:"absolute",left:`${(i%6)*18+4}%`,top:`${Math.floor(i/6)*20+4}%`,width:4,height:4,borderRadius:"50%",background:c,opacity:o}}/>
        ))}
      </div>
    );

  if (d.shapeType === "triangles")
    return (
      <div style={wrap}>
        {[[10,10],[85,8],[5,78],[80,72]].map(([x,y],i) => (
          <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:0,height:0,borderLeft:"20px solid transparent",borderRight:"20px solid transparent",borderBottom:`35px solid ${c}`,opacity:o,transform:"translate(-50%,-50%)"}}/>
        ))}
      </div>
    );

  if (d.shapeType === "diamonds")
    return (
      <div style={wrap}>
        {[[10,10,40],[84,8,30],[6,76,36],[80,70,44]].map(([x,y,r],i) => (
          <div key={i} style={{position:"absolute",left:`${x}%`,top:`${y}%`,width:r,height:r,background:c,opacity:o,transform:`translate(-50%,-50%) rotate(45deg)`}}/>
        ))}
      </div>
    );

  if (d.shapeType === "lines")
    return (
      <div style={wrap}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{position:"absolute",left:`${i*30}%`,top:0,width:"2px",height:"100%",background:c,opacity:o*0.5}}/>
        ))}
      </div>
    );

  return null;
}

/**
 * Full letter/document preview — used in CreateTemplate (live), ViewTemplate, and AllTemplates (thumbnail).
 * Pass `compact` for smaller thumbnails.
 */
export function LetterPreview({ design: d, form: f, docType, compact = false }) {
  const accent = COLORS[d.accentColor]?.hex || "#3b82f6";
  const borderCSS = getBorderCSS(d);
  const scale = compact ? 0.38 : 1;

  const inner = (
    <div style={{
      background: d.bodyBg,
      borderRadius: d.cornerRadius,
      overflow: "hidden",
      position: "relative",
      ...borderCSS,
      fontFamily: BODY_FONTS[d.bodyFont],
      width: compact ? 420 : 794, // A4 @ 96dpi
      minHeight: compact ? undefined : 1123, // A4 @ 96dpi
      margin: compact ? undefined : "0 auto",
    }}>
      <ShapeOverlay d={d} />

      {/* Header band */}
      <div style={{background:d.headerBg, padding: compact ? "18px 24px" : "28px 36px", position:"relative"}}>
        <div style={{
          fontFamily: HEADING_FONTS[d.headingFont],
          fontSize: compact ? 18 : d.headingSize,
          fontWeight: 800,
          color: d.headerText,
          marginBottom: 2,
          textAlign: d.textAlign,
        }}>
          {f.company || "Your Company"}
        </div>
        <div style={{fontSize: compact ? 10 : 12, color:`${d.headerText}99`, textAlign:d.textAlign}}>
          {DOC_TYPES[docType]?.label || "Document"}
        </div>
        {/* accent underline */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:accent}}/>
      </div>

      {/* Body */}
      <div style={{padding: compact ? "16px 24px" : "28px 36px", background:d.bodyBg}}>
        <div style={{
          display:"flex", justifyContent:"space-between",
          fontSize: compact ? 10 : 12, color:"#666",
          marginBottom: compact ? 10 : 18,
          paddingBottom: compact ? 8 : 14,
          borderBottom:`1px solid ${d.dividerColor}`,
        }}>
          <span>Date: <b>{f.date || "—"}</b></span>
          <span>To: <b>{f.receiver || "—"}</b></span>
        </div>
        <div style={{
          fontFamily: HEADING_FONTS[d.headingFont],
          fontSize: compact ? 12 : 15,
          fontWeight: 700, color:"#111",
          marginBottom: compact ? 8 : 12,
          textAlign: d.textAlign,
        }}>
          {f.subject ? `Subject: ${f.subject}` : "Subject: —"}
        </div>
        <div style={{
          fontSize: compact ? 10 : 13,
          color: "#444",
          lineHeight: d.lineSpacing,
          textAlign: d.textAlign,
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          whiteSpace: "pre-wrap"
        }}>
          {f.body
            ? f.body.split("\n").map((p,i) => <p key={i} style={{marginBottom: compact ? 4 : 8}}>{p || "\u00a0"}</p>)
            : <p style={{color:"#ccc"}}>Your message will appear here…</p>
          }
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: d.footerBg,
        padding: compact ? "12px 24px" : "20px 36px",
        borderTop: `1px solid ${d.dividerColor}`,
      }}>
        <div style={{fontSize: compact ? 9 : 11, color:"#999", marginBottom:3}}>Sincerely,</div>
        <div style={{
          fontFamily: HEADING_FONTS[d.headingFont],
          fontSize: compact ? 11 : 14,
          fontWeight: 700, color:"#333",
        }}>
          {f.company || "Your Company"}
        </div>
      </div>
    </div>
  );

  if (!compact) return inner;

  // compact = scaled thumbnail wrapper
  return (
    <div style={{
      width: "100%",
      height: 220,
      overflow: "hidden",
      borderRadius: 8,
      position: "relative",
      background: "#f5f4f1",
    }}>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${100 / scale}%`,
        pointerEvents: "none",
      }}>
        {inner}
      </div>
    </div>
  );
}

/**
 * Small pill / chip toggle button used throughout the design panels.
 */
export function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
        cursor: "pointer", border: "1.5px solid",
        borderColor: active ? "#6366f1" : "rgba(0,0,0,.12)",
        background:   active ? "#eef2ff" : "white",
        color:        active ? "#4338ca" : "#3a3a45",
        transition: "all .15s",
      }}
    >
      {children}
    </button>
  );
}

/**
 * A label + children row for the design panel.
 */
export function Row({ label, children }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:12, flexWrap:"wrap", marginBottom:4}}>
      <div style={{fontSize:12,fontWeight:600,color:"#7a7a8a",width:94,flexShrink:0}}>{label}</div>
      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",flex:1}}>{children}</div>
    </div>
  );
}

/**
 * Section header used on the Choose Template page.
 */
export function SectionHead({ icon, bg, title }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
      <div style={{width:30,height:30,borderRadius:8,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{icon}</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:"#0d0d0f"}}>{title}</div>
    </div>
  );
}

/**
 * The top step rail shown in CreateTemplate.
 */
export function StepRail({ step }) {
  const steps = ["Choose Template", "Edit & Design", "Preview & Save"];
  return (
    <div style={{
      display:"flex", alignItems:"center", padding:"14px 32px",
      background:"white", borderBottom:"1px solid rgba(0,0,0,.08)",
      position:"sticky", top:0, zIndex:20,
    }}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#0d0d0f",marginRight:32,display:"flex",alignItems:"center",gap:8}}>
        <span>📝</span> DocStudio
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{display:"flex",alignItems:"center"}}>
          <div style={{
            display:"flex", alignItems:"center", gap:8, padding:"6px 14px", borderRadius:20,
            background: step === i+1 ? "#0d0d0f" : step > i+1 ? "#f0fdf4" : "transparent",
          }}>
            <div style={{
              width:22, height:22, borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontWeight:700,
              background: step === i+1 ? "white" : step > i+1 ? "#22c55e" : "rgba(0,0,0,.08)",
              color:      step === i+1 ? "#0d0d0f" : step > i+1 ? "white"  : "#7a7a8a",
            }}>
              {step > i+1 ? "✓" : i+1}
            </div>
            <span style={{
              fontSize:13, fontWeight:600,
              color: step===i+1 ? "white" : step>i+1 ? "#15803d" : "#7a7a8a",
            }}>{s}</span>
          </div>
          {i < 2 && <div style={{width:28,height:1,background:"rgba(0,0,0,.1)",margin:"0 2px"}}/>}
        </div>
      ))}
    </div>
  );
}

/**
 * Collapsible sidebar used on the AllTemplates dashboard.
 */
export function Sidebar({ collapsed, onToggle, activeView, onNav, docType }) {
  let FORM_FIELDS;

  // Choose fields based on document type
  if (docType === "resume") {
    FORM_FIELDS = [
      { key: "company", label: "Full Name", type: "text", ph: "e.g. John Doe" },
      { key: "date", label: "Date of Birth", type: "date", ph: "" },
      { key: "receiver", label: "Contact Email", type: "email", ph: "e.g. john@example.com" },
      { key: "subject", label: "Phone", type: "tel", ph: "e.g. +1 555 1234" },
      { key: "summary", label: "Professional Summary", type: "textarea", ph: "Brief overview..." },
    ];
  } else if (docType === "letter") {
    FORM_FIELDS = [
      { key: "company", label: "Company Name", type: "text", ph: "e.g. Acme Corp" },
      { key: "date", label: "Date", type: "date", ph: "" },
      { key: "receiver", label: "Receiver Name", type: "text", ph: "e.g. Mr. John Smith" },
      { key: "subject", label: "Subject", type: "text", ph: "e.g. Partnership Proposal" },
    ];
  } else {
    // Default fallback – same as letter
    FORM_FIELDS = [
      { key: "company", label: "Company Name", type: "text", ph: "e.g. Acme Corp" },
      { key: "date", label: "Date", type: "date", ph: "" },
      { key: "receiver", label: "Receiver Name", type: "text", ph: "e.g. Mr. John Smith" },
      { key: "subject", label: "Subject", type: "text", ph: "e.g. Partnership Proposal" },
    ];
  }

  const nav = [
    { icon: "⊞", label: "Dashboard", view: "all" },
    { icon: "📄", label: "My Templates", view: "all" },
    { icon: "✉️", label: "Business Letter", view: "create" },
    { icon: "👤", label: "Resume / CV", view: "create" },
    { icon: "🧾", label: "Invoice", view: "create" },
    { icon: "📊", label: "Report", view: "create" },
    { icon: "💼", label: "Proposal", view: "create" },
  ];

  return (
    <div
      style={{
        width: collapsed ? 60 : 220,
        minHeight: "100vh",
        background: "#0d0d0f",
        display: "flex",
        flexDirection: "column",
        transition: "width .3s ease",
        flexShrink: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "20px 16px 18px",
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "#1a1aff",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 16,
          }}
        >
          📝
        </div>
        {!collapsed && (
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            DocStudio
          </span>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          background: "rgba(255,255,255,.1)",
          border: "none",
          borderRadius: 6,
          width: 26,
          height: 26,
          cursor: "pointer",
          color: "white",
          fontSize: 14,
        }}
      >
        {collapsed ? "›" : "‹"}
      </button>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "14px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflow: "hidden",
        }}
      >
        {!collapsed && (
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,.3)",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              padding: "4px 8px 2px",
              marginBottom: 4,
            }}
          >
            Menu
          </div>
        )}

        {nav.map((n, i) => (
          <button
            key={i}
            onClick={() => onNav && onNav(n.view)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 8px",
              borderRadius: 8,
              cursor: "pointer",
              color:
                activeView === n.view
                  ? "white"
                  : "rgba(255,255,255,.45)",
              background:
                activeView === n.view
                  ? "rgba(99,102,241,.25)"
                  : "transparent",
              border: "none",
              width: "100%",
              textAlign: "left",
              fontSize: 13,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <span style={{ fontSize: 15, flexShrink: 0 }}>
              {n.icon}
            </span>
            {!collapsed && <span>{n.label}</span>}
          </button>
        ))}
      </nav>

      {/* User */}
      {!collapsed && (
        <div
          style={{
            padding: "12px 10px",
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#6366f1,#a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              S
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "white",
                }}
              >
                Satya
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,.35)",
                }}
              >
                Pro Plan
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
