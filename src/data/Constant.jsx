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

export const SHAPE_TYPES     = ["none", "circles", "squares", "dots", "triangles", "diamonds", "lines", "curly"];
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
  pageBgImage:      "",
  pageBgImageOpacity: 0.16,
  headerBgImage:    "",
  headerBgImageOpacity: 0.22,
  bodyBgImage:      "",
  bodyBgImageOpacity: 0.14,
  footerBgImage:    "",
  footerBgImageOpacity: 0.18,
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
  profileImage: "",
  includeProfileImage: false,

  // Generic doc (report/proposal/memo/etc.)
  title:    "",
  subtitle: "",
  footerLine: "",

  // Invoice
  invoiceTagline: "",
  invoiceNo: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  billTo: "",
  billToAddress: "",
  items: "",
  total: "",
  paymentNote: "",
  notes: "",

  // Business Letter extras
  senderEmail: "",
  senderPhone: "",
  senderAddress: "",
  closing: "Sincerely",
  signatureName: "",

  // Resume
  fullName: "",
  roleTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  skills: "",
  experience: "",
  education: "",
  projects: "",

  // Invoice (extended)
  businessName: "",
  businessEmail: "",
  businessPhone: "",
  businessAddress: "",
  clientName: "",
  clientAddress: "",
  currency: "INR",
  taxRate: "",
  includeLogo: false,
  logoImage: "",
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
  const docType = arguments.length >= 3 ? arguments[2] : undefined;
  const v = (value ?? "").toString();

  const field =
    docType
      ? (formFieldsFor(docType).find((f) => f.key === key) || null)
      : null;

  if (field?.type === "toggle" || field?.type === "image") return null;

  const label = field?.label || (key.charAt(0).toUpperCase() + key.slice(1));

  if (field?.required && !v.trim()) return `${label} is required`;
  if (!field && !v.trim()) return `${label} is required`;

  const trimmed = v.trim();
  if ((field?.type === "email" || key === "email" || key === "receiverEmail") && trimmed) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email";
  }
  if ((field?.type === "number" || key === "taxRate") && trimmed) {
    const n = Number(trimmed);
    if (Number.isNaN(n)) return "Enter a valid number";
  }

  const minLen = field?.minLen ?? ((key === "body" || key === "summary") ? 10 : 0);
  if (minLen > 0 && trimmed.length < minLen) return `Must be at least ${minLen} characters`;

  return null;
}

export function requiredFormKeys(docType) {
  return formFieldsFor(docType).filter((f) => f.required).map((f) => f.key);
}

export function formFieldsFor(docType) {
  if (docType === "resume") {
    return [
      { key: "fullName", label: "Full Name", type: "text", ph: "e.g. John Doe", required: true },
      { key: "roleTitle", label: "Role / Title", type: "text", ph: "e.g. Frontend Developer", required: true },
      { key: "email", label: "Email", type: "email", ph: "e.g. john@example.com", required: true },
      { key: "phone", label: "Phone", type: "tel", ph: "e.g. +91 98765 43210", required: true },
      { key: "location", label: "Location", type: "text", ph: "e.g. Bengaluru, IN", required: false },
      { key: "website", label: "Website", type: "text", ph: "e.g. yourname.com", required: false },
      { key: "linkedin", label: "LinkedIn", type: "text", ph: "e.g. linkedin.com/in/you", required: false },
      { key: "includeProfileImage", label: "Show Profile Image", type: "toggle", ph: "", required: false },
      { key: "profileImage", label: "Profile Photo", type: "image", ph: "", required: false },
      { key: "summary", label: "Professional Summary", type: "textarea", ph: "2-3 lines about you...", hint: "min. 10 characters", required: true, minLen: 10 },
      { key: "skills", label: "Skills (comma separated)", type: "text", ph: "e.g. React, TypeScript, CSS", required: true },
      { key: "experience", label: "Experience", type: "textarea", ph: "Add experience (one per line)", required: false },
      { key: "education", label: "Education", type: "textarea", ph: "Add education (one per line)", required: false },
      { key: "projects", label: "Projects", type: "textarea", ph: "Add projects (one per line)", required: false },
    ];
  }

  if (docType === "invoice") {
    return [
      { key: "businessName", label: "Business Name", type: "text", ph: "e.g. Acme Studio", required: true },
      { key: "businessEmail", label: "Business Email", type: "email", ph: "e.g. billing@acme.com", required: false },
      { key: "businessPhone", label: "Business Phone", type: "tel", ph: "", required: false },
      { key: "businessAddress", label: "Business Address", type: "textarea", ph: "Your business address", required: false },
      { key: "clientName", label: "Client Name", type: "text", ph: "e.g. John Smith", required: true },
      { key: "clientAddress", label: "Client Address", type: "textarea", ph: "Client address / details", required: false },
      { key: "invoiceNo", label: "Invoice #", type: "text", ph: "e.g. INV-001", required: true },
      { key: "invoiceDate", label: "Issue Date", type: "date", ph: "", required: true },
      { key: "dueDate", label: "Due Date", type: "date", ph: "", required: false },
      { key: "currency", label: "Currency", type: "text", ph: "e.g. INR", required: false },
      { key: "taxRate", label: "Tax %", type: "number", ph: "e.g. 18", required: false },
      { key: "items", label: "Items (one per line: Item | Qty | Price | Amount)", type: "textarea", ph: "Website design | 1 | 25000 | 25000", hint: "one line per item", required: true },
      { key: "total", label: "Total (auto)", type: "text", ph: "", required: false, readOnly: true },
      { key: "notes", label: "Notes", type: "textarea", ph: "Any extra notesâ€¦", required: false },
      { key: "paymentNote", label: "Payment Note", type: "text", ph: "e.g. UPI / Bank transfer", required: false },
      { key: "includeLogo", label: "Show Logo", type: "toggle", ph: "", required: false },
      { key: "logoImage", label: "Logo Image", type: "image", ph: "", required: false },
      { key: "footerLine", label: "Footer Line", type: "text", ph: "Thank you for your business.", required: false },
    ];
  }

  if (docType === "__invoice_legacy") {
    return [
      { key: "company", label: "Business Name", type: "text", ph: "e.g. Acme Studio", required: true },
      { key: "invoiceNo", label: "Invoice Number", type: "text", ph: "e.g. INV-001", required: true },
      { key: "invoiceDate", label: "Invoice Date", type: "date", ph: "", required: true },
      { key: "dueDate", label: "Due Date", type: "date", ph: "", required: true },
      { key: "billTo", label: "Bill To (Client)", type: "text", ph: "e.g. John Smith", required: true },
      { key: "billToAddress", label: "Client Address", type: "textarea", ph: "Client address / details", required: false },
      { key: "items", label: "Items", type: "textarea", ph: "Item | Qty | Price | Amount", hint: "one line per item", required: true },
      { key: "total", label: "Total", type: "text", ph: "e.g. ₹12,500", required: true },
      { key: "paymentNote", label: "Payment Note", type: "text", ph: "e.g. UPI / Bank transfer", required: false },
      { key: "notes", label: "Notes", type: "textarea", ph: "Any extra notes…", required: false },
      { key: "footerLine", label: "Footer Line", type: "text", ph: "Thank you for your business.", required: false },
    ];
  }

  if (docType === "letter") {
    return [
      { key: "company", label: "Company / Sender Name", type: "text", ph: "e.g. Acme Corp", required: true },
      { key: "senderEmail", label: "Sender Email", type: "email", ph: "e.g. hello@acme.com", required: false },
      { key: "senderPhone", label: "Sender Phone", type: "tel", ph: "", required: false },
      { key: "senderAddress", label: "Sender Address", type: "text", ph: "", required: false },
      { key: "date", label: "Date", type: "date", ph: "", required: true },
      { key: "receiver", label: "Receiver Name", type: "text", ph: "e.g. Mr. John Smith", required: true },
      { key: "subject", label: "Subject", type: "text", ph: "e.g. Partnership Proposal", required: true },
      { key: "body", label: "Message Body", type: "textarea", ph: "Write your message hereâ€¦", hint: "min. 10 characters", required: true, minLen: 10 },
      { key: "closing", label: "Closing", type: "text", ph: "e.g. Sincerely", required: false },
      { key: "signatureName", label: "Signature Name", type: "text", ph: "e.g. Satya Kumar", required: false },
    ];
  }

  if (docType === "__letter_legacy") {
    return [
      { key: "company", label: "Company Name", type: "text", ph: "e.g. Acme Corp", required: true },
      { key: "date", label: "Date", type: "date", ph: "", required: true },
      { key: "receiver", label: "Receiver Name", type: "text", ph: "e.g. Mr. John Smith", required: true },
      { key: "subject", label: "Subject", type: "text", ph: "e.g. Partnership Proposal", required: true },
      { key: "body", label: "Message Body", type: "textarea", ph: "Write your message here…", hint: "min. 10 characters", required: true },
    ];
  }

  // report / proposal / memo / others
  return [
    { key: "title", label: "Title", type: "text", ph: "e.g. Project Report", required: true },
    { key: "subtitle", label: "Subtitle", type: "text", ph: "Optional subtitle", required: false },
    { key: "company", label: "Author / Brand", type: "text", ph: "e.g. Your Name", required: false },
    { key: "date", label: "Date", type: "date", ph: "", required: true },
    { key: "body", label: "Content", type: "textarea", ph: "Start writing…", hint: "min. 10 characters", required: true },
    { key: "footerLine", label: "Footer Line", type: "text", ph: "© Your Brand", required: false },
  ];
}

/**
 * Returns true when all required form fields are valid.
 */
export function isFormComplete(form, docType) {
  const keys = requiredFormKeys(docType);
  return keys.every((k) => validateField(k, form?.[k], docType) === null);
}

/**
 * Returns 0-100 completion percentage for the form.
 */
export function formProgress(form, docType) {
  const keys = requiredFormKeys(docType);
  const filled = keys.filter((k) => {
    const v = (form?.[k] ?? "").toString().trim();
    if (!v) return false;
    return validateField(k, v, docType) === null;
  }).length;
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

  if (d.shapeType === "curly")
    return (
      <div style={wrap}>
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: o }}>
          <path
            d="M0,120 C160,40 260,220 420,140 C580,60 680,240 840,160 C1000,80 1080,200 1200,130 L1200,300 L0,300 Z"
            fill={c}
            opacity={0.32}
          />
          <path
            d="M0,170 C150,90 260,240 410,170 C560,100 690,260 840,190 C990,120 1100,240 1200,170"
            fill="none"
            stroke={c}
            strokeWidth="10"
            strokeOpacity={0.55}
          />
        </svg>
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

  let inner = (
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
      {d.pageBgImage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${d.pageBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: d.pageBgImageOpacity ?? 0.16,
            pointerEvents: "none",
          }}
        />
      )}
      <ShapeOverlay d={d} />

      {/* Header band */}
      <div style={{background:d.headerBg, padding: compact ? "18px 24px" : "28px 36px", position:"relative", overflow:"hidden"}}>
        {d.headerBgImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${d.headerBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: d.headerBgImageOpacity ?? 0.22,
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{
          position: "relative",
          fontFamily: HEADING_FONTS[d.headingFont],
          fontSize: compact ? 18 : d.headingSize,
          fontWeight: 800,
          color: d.headerText,
          marginBottom: 2,
          textAlign: d.textAlign,
        }}>
          {f.company || "Your Company"}
        </div>
        <div style={{position:"relative", fontSize: compact ? 10 : 12, color:`${d.headerText}99`, textAlign:d.textAlign}}>
          {DOC_TYPES[docType]?.label || "Document"}
        </div>
        {/* accent underline */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:accent}}/>
      </div>

      {/* Body */}
      <div style={{padding: compact ? "16px 24px" : "28px 36px", background:d.bodyBg, position:"relative", overflow:"hidden"}}>
        {d.bodyBgImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${d.bodyBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: d.bodyBgImageOpacity ?? 0.14,
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{ position: "relative" }}>
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
      </div>

      {/* Footer */}
      <div style={{
        background: d.footerBg,
        padding: compact ? "12px 24px" : "20px 36px",
        borderTop: `1px solid ${d.dividerColor}`,
        position: "relative",
        overflow: "hidden",
      }}>
        {d.footerBgImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${d.footerBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: d.footerBgImageOpacity ?? 0.18,
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{ position: "relative" }}>
        <div style={{fontSize: compact ? 9 : 11, color:"#999", marginBottom:3}}>
          {(f.closing || "Sincerely") + ","}
        </div>
        <div style={{
          fontFamily: HEADING_FONTS[d.headingFont],
          fontSize: compact ? 11 : 14,
          fontWeight: 700, color:"#333",
        }}>
          {f.signatureName || f.company || "Your Company"}
        </div>
        </div>
      </div>
    </div>
  );

  if (docType === "resume") {
    inner = (
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
        {d.pageBgImage && (
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:`url(${d.pageBgImage})`,
            backgroundSize:"cover",backgroundPosition:"center",
            opacity:d.pageBgImageOpacity ?? 0.16,
            pointerEvents:"none",
          }}/>
        )}
        <ShapeOverlay d={d} />

        {/* Header */}
        <div style={{background:d.headerBg, padding: compact ? "18px 24px" : "30px 38px", position:"relative", overflow:"hidden"}}>
          {d.headerBgImage && (
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`url(${d.headerBgImage})`,
              backgroundSize:"cover",backgroundPosition:"center",
              opacity:d.headerBgImageOpacity ?? 0.22,
              pointerEvents:"none",
            }}/>
          )}
          <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",gap:18}}>
            <div style={{minWidth:0}}>
              <div style={{
                fontFamily: HEADING_FONTS[d.headingFont],
                fontSize: compact ? 18 : d.headingSize + 6,
                fontWeight: 900,
                color: d.headerText,
                lineHeight: 1.05,
                letterSpacing: -0.6,
                textAlign: d.textAlign,
              }}>
                {f.fullName || f.company || "Your Name"}
              </div>
              <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:8,fontSize: compact ? 9 : 12,color:`${d.headerText}cc`}}>
                <span>{f.receiver || "email@example.com"}</span>
                <span style={{opacity:0.6}}>•</span>
                <span>{f.subject || "+91 00000 00000"}</span>
                <span style={{opacity:0.6}}>•</span>
                <span>DOB: {f.date || "—"}</span>
              </div>
            </div>
            {(f.profileImage && (f.includeProfileImage ?? true)) && (
              <div style={{
                width: compact ? 46 : 86,
                height: compact ? 46 : 86,
                borderRadius:"50%",
                backgroundImage:`url(${f.profileImage})`,
                backgroundSize:"cover",backgroundPosition:"center",
                border:`3px solid ${accent}55`,
                boxShadow:"0 10px 30px rgba(0,0,0,.18)",
                flexShrink:0,
              }}/>
            )}
          </div>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:accent}}/>
        </div>

        {/* Body */}
        <div style={{padding: compact ? "16px 24px" : "30px 38px", background:d.bodyBg, position:"relative", overflow:"hidden"}}>
          {d.bodyBgImage && (
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`url(${d.bodyBgImage})`,
              backgroundSize:"cover",backgroundPosition:"center",
              opacity:d.bodyBgImageOpacity ?? 0.14,
              pointerEvents:"none",
            }}/>
          )}
          <div style={{position:"relative",display:"grid",gridTemplateColumns: compact ? "1fr" : "1.05fr 0.95fr",gap: compact ? 12 : 22}}>
            <div>
              <div style={{
                fontFamily: HEADING_FONTS[d.headingFont],
                fontSize: compact ? 11 : 13,
                fontWeight: 900,
                letterSpacing: 0.9,
                textTransform: "uppercase",
                color: "#111",
                marginBottom: 10,
              }}>Profile</div>
              <div style={{
                fontSize: compact ? 10 : 13,
                color: "#444",
                lineHeight: d.lineSpacing,
                textAlign: d.textAlign,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
                whiteSpace: "pre-wrap",
              }}>
                {f.summary
                  ? f.summary.split("\n").map((p,i)=>(
                      <p key={i} style={{marginBottom: compact ? 4 : 8}}>{p || "\u00a0"}</p>
                    ))
                  : <p style={{color:"#c6c6cf"}}>Write a short professional summary…</p>
                }
              </div>
            </div>
            <div style={{borderLeft: compact ? "none" : `1px solid ${d.dividerColor}`, paddingLeft: compact ? 0 : 18}}>
              <div style={{
                fontFamily: HEADING_FONTS[d.headingFont],
                fontSize: compact ? 11 : 13,
                fontWeight: 900,
                letterSpacing: 0.9,
                textTransform: "uppercase",
                color: "#111",
                marginBottom: 10,
              }}>Highlights</div>
              <div style={{display:"grid",gap:10}}>
                {[["Email",f.email || f.receiver],["Phone",f.phone || f.subject],["LinkedIn",f.linkedin],["Skills",f.skills]].map(([label,value])=>(
                  <div key={label} style={{display:"flex",justifyContent:"space-between",gap:10,fontSize: compact ? 10 : 12}}>
                    <span style={{color:"#6b7280",fontWeight:700}}>{label}</span>
                    <span style={{color:"#111",fontWeight:800,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis"}}>{value||"—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: d.footerBg,
          padding: compact ? "12px 24px" : "20px 38px",
          borderTop: `1px solid ${d.dividerColor}`,
          position: "relative",
          overflow: "hidden",
        }}>
          {d.footerBgImage && (
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`url(${d.footerBgImage})`,
              backgroundSize:"cover",backgroundPosition:"center",
              opacity:d.footerBgImageOpacity ?? 0.18,
              pointerEvents:"none",
            }}/>
          )}
          <div style={{position:"relative",fontSize: compact ? 9 : 11,color:"#9aa0aa"}}>
            Tip: You can add skills/experience fields next.
          </div>
        </div>
      </div>
    );
  }

  if (docType === "invoice") {
    const toNum = (x) => {
      const t = (x ?? "").toString().trim();
      if (!t) return 0;
      const n = Number(t.replace(/[^0-9.]/g, ""));
      return Number.isFinite(n) ? n : 0;
    };
    const currency = (f.currency ?? "").toString().trim();
    const fmt = (n) => (currency ? `${currency} ${n.toFixed(2)}` : n.toFixed(2));
    const taxRate = toNum(f.taxRate);
    const parsedLines = (f.items || "").split("\n").map((l) => l.trim()).filter(Boolean);
    const computedSubtotal = parsedLines.reduce((sum, line) => {
      const parts = line.split("|").map((s) => s.trim());
      const qty = toNum(parts[1]);
      const price = toNum(parts[2]);
      const amount = toNum(parts[3]);
      const computed = amount || (qty && price ? qty * price : 0);
      return sum + computed;
    }, 0);
    const computedTax = taxRate ? (computedSubtotal * taxRate) / 100 : 0;
    const computedGrandTotal = computedSubtotal + computedTax;
    const computedTotalLabel = computedGrandTotal > 0 ? fmt(computedGrandTotal) : "";

    inner = (
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
        {d.pageBgImage && (
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:`url(${d.pageBgImage})`,
            backgroundSize:"cover",backgroundPosition:"center",
            opacity:d.pageBgImageOpacity ?? 0.16,
            pointerEvents:"none",
          }}/>
        )}
        <ShapeOverlay d={d} />

        <div style={{background:d.headerBg, padding: compact ? "18px 24px" : "30px 38px", position:"relative", overflow:"hidden"}}>
          {d.headerBgImage && (
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`url(${d.headerBgImage})`,
              backgroundSize:"cover",backgroundPosition:"center",
              opacity:d.headerBgImageOpacity ?? 0.22,
              pointerEvents:"none",
            }}/>
          )}
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",gap:18,alignItems:"flex-start"}}>
            <div style={{minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                {(f.logoImage && (f.includeLogo ?? false)) && (
                  <div
                    style={{
                      width: compact ? 34 : 46,
                      height: compact ? 34 : 46,
                      borderRadius: 12,
                      backgroundImage: `url(${f.logoImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: `1px solid ${accent}55`,
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{fontFamily:HEADING_FONTS[d.headingFont],fontSize: compact ? 18 : d.headingSize + 4,fontWeight:950,color:d.headerText}}>
                  {f.businessName || f.company || "Your Business"}
                </div>
              </div>
              <div style={{marginTop:6,fontSize: compact ? 10 : 12,color:`${d.headerText}cc`}}>
                {f.invoiceTagline || "Invoice"}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize: compact ? 10 : 12,color:`${d.headerText}cc`}}>Invoice No.</div>
              <div style={{fontWeight:900,color:d.headerText}}>{f.invoiceNo || "—"}</div>
              <div style={{marginTop:10,fontSize: compact ? 10 : 12,color:`${d.headerText}cc`}}>Date / Due</div>
              <div style={{fontWeight:800,color:d.headerText}}>{(f.invoiceDate||"—") + " / " + (f.dueDate||"—")}</div>
            </div>
          </div>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:accent}}/>
        </div>

        <div style={{padding: compact ? "16px 24px" : "30px 38px", background:d.bodyBg, position:"relative", overflow:"hidden"}}>
          {d.bodyBgImage && (
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`url(${d.bodyBgImage})`,
              backgroundSize:"cover",backgroundPosition:"center",
              opacity:d.bodyBgImageOpacity ?? 0.14,
              pointerEvents:"none",
            }}/>
          )}
          <div style={{position:"relative"}}>
            <div style={{display:"grid",gridTemplateColumns: compact ? "1fr" : "1.05fr 0.95fr",gap: compact ? 12 : 18, marginBottom: compact ? 12 : 18}}>
              <div style={{border:`1px solid ${d.dividerColor}`,borderRadius:12,padding: compact ? 10 : 14,background:"#ffffffcc"}}>
                <div style={{fontSize: compact ? 10 : 12,color:"#6b7280",fontWeight:800,marginBottom:6}}>Bill To</div>
                <div style={{fontSize: compact ? 10 : 13,fontWeight:800,color:"#111"}}>{f.clientName || f.billTo || f.receiver || "Client Name"}</div>
                <div style={{marginTop:6,fontSize: compact ? 9 : 12,color:"#6b7280",whiteSpace:"pre-wrap"}}>{f.clientAddress || f.billToAddress || "Client address / details"}</div>
              </div>
              <div style={{border:`1px solid ${d.dividerColor}`,borderRadius:12,padding: compact ? 10 : 14,background:"#ffffffcc"}}>
                <div style={{fontSize: compact ? 10 : 12,color:"#6b7280",fontWeight:800,marginBottom:6}}>Total</div>
                <div style={{fontFamily:HEADING_FONTS[d.headingFont],fontSize: compact ? 16 : 26,fontWeight:950,color:"#111"}}>{f.total || "—"}</div>
                <div style={{marginTop:6,fontSize: compact ? 9 : 12,color:"#6b7280"}}>{f.paymentNote || "Payment due on receipt."}</div>
              </div>
            </div>

            <div style={{border:`1px solid ${d.dividerColor}`,borderRadius:14,overflow:"hidden",background:"#ffffffcc"}}>
              <div style={{display:"grid",gridTemplateColumns:"1.4fr .4fr .6fr .6fr",gap:10,padding: compact ? "8px 10px" : "12px 14px",background:`${accent}15`}}>
                {["Item","Qty","Price","Amount"].map((h)=>(
                  <div key={h} style={{fontSize: compact ? 9 : 11,fontWeight:900,color:"#111",textTransform:"uppercase",letterSpacing:0.8}}>{h}</div>
                ))}
              </div>
              {(f.items || "").split("\n").filter(Boolean).slice(0, compact ? 4 : 10).map((line,i)=>{
                const [item="",qty="",price="",amount=""] = line.split("|").map((s)=>s.trim());
                return (
                  <div key={i} style={{display:"grid",gridTemplateColumns:"1.4fr .4fr .6fr .6fr",gap:10,padding: compact ? "8px 10px" : "12px 14px",borderTop:`1px solid ${d.dividerColor}`}}>
                    <div style={{fontSize: compact ? 10 : 12,fontWeight:700,color:"#111"}}>{item || "Service / Product"}</div>
                    <div style={{fontSize: compact ? 10 : 12,color:"#374151"}}>{qty || "—"}</div>
                    <div style={{fontSize: compact ? 10 : 12,color:"#374151"}}>{price || "—"}</div>
                    <div style={{fontSize: compact ? 10 : 12,fontWeight:800,color:"#111"}}>{amount || "—"}</div>
                  </div>
                );
              })}
              {!f.items && (
                <div style={{padding: compact ? "10px 12px" : "14px 16px",color:"#9aa0aa",fontSize: compact ? 10 : 12}}>
                  Add items (format: <b>Item | Qty | Price | Amount</b> per line)
                </div>
              )}
            </div>

            {f.notes && (
              <div style={{marginTop: compact ? 10 : 14,fontSize: compact ? 10 : 12,color:"#6b7280",whiteSpace:"pre-wrap"}}>
                <b>Notes:</b> {f.notes}
              </div>
            )}
          </div>
        </div>

        <div style={{
          background: d.footerBg,
          padding: compact ? "12px 24px" : "20px 38px",
          borderTop: `1px solid ${d.dividerColor}`,
          position: "relative",
          overflow: "hidden",
        }}>
          {d.footerBgImage && (
            <div style={{
              position:"absolute",inset:0,
              backgroundImage:`url(${d.footerBgImage})`,
              backgroundSize:"cover",backgroundPosition:"center",
              opacity:d.footerBgImageOpacity ?? 0.18,
              pointerEvents:"none",
            }}/>
          )}
          <div style={{position:"relative",fontSize: compact ? 9 : 11,color:"#9aa0aa"}}>{f.footerLine || "Thank you for your business."}</div>
        </div>
      </div>
    );
  }

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
