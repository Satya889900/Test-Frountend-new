// ─────────────────────────────────────────────────────────────────────────────
// ViewTemplate.jsx — Full-screen viewer for a single saved template
//
// Props:
//   template         — the saved template object to display
//   onBack()         — navigate back to AllTemplates
//   onEdit(template) — open CreateTemplate in edit mode with this template
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  COLORS, LAYOUTS, DOC_TYPES, FONTS_URL,
  LetterPreview,
} from "../../data/Constant";

// ─── Metadata pill ────────────────────────────────────────────────────────────
function MetaPill({ icon, label, value, accent }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", gap:3,
      padding:"12px 18px", background:"white",
      border:"1px solid rgba(0,0,0,.08)", borderRadius:12,
      minWidth:110,
    }}>
      <div style={{fontSize:11,color:"#7a7a8a",fontWeight:600,textTransform:"uppercase",letterSpacing:.6,display:"flex",alignItems:"center",gap:5}}>
        <span>{icon}</span>{label}
      </div>
      <div style={{fontSize:14,fontWeight:600,color: accent || "#0d0d0f"}}>{value}</div>
    </div>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────
function ActionBtn({ icon, label, onClick, primary, danger }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        display:"flex", alignItems:"center", gap:7,
        padding:"9px 18px", borderRadius:9,
        fontSize:13, fontWeight:600, cursor:"pointer",
        border: primary ? "none" : danger ? "1px solid #fecaca" : "1px solid rgba(0,0,0,.12)",
        background: primary
          ? hover ? "#1a1a2e" : "#0d0d0f"
          : danger
            ? hover ? "#fef2f2" : "white"
            : hover ? "#f5f4f1" : "white",
        color: primary ? "white" : danger ? "#ef4444" : "#3a3a45",
        transition:"all .15s",
        transform: hover ? "translateY(-1px)" : "none",
        boxShadow: primary && hover ? "0 6px 16px rgba(0,0,0,.2)" : "none",
      }}
    >
      <span>{icon}</span> {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ViewTemplate
// ─────────────────────────────────────────────────────────────────────────────
export default function ViewTemplate({ template, onBack, onEdit }) {
  const [downloading, setDownloading] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  if (!template) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"#7a7a8a",fontSize:15}}>
      No template selected.
    </div>
  );

  const { design: d, form: f, docType, layout, name, createdAt } = template;
  const accentHex = COLORS[d.accentColor]?.hex || "#3b82f6";

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("PDF export: integrate html2pdf.js or a server route (e.g. Puppeteer) to generate the PDF.");
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href).catch(()=>{});
    setCopyMsg("Copied!");
    setTimeout(()=>setCopyMsg(""),2000);
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })
    : "—";

  return (
    <div style={{
      display:"flex", flexDirection:"column",
      minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", background:"#f5f4f1",
    }}>
      <link href={FONTS_URL} rel="stylesheet" />

      {/* ── Sticky header ── */}
      <div style={{
        position:"sticky", top:0, zIndex:20,
        background:"white", borderBottom:"1px solid rgba(0,0,0,.08)",
        padding:"14px 32px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        {/* Left: back + breadcrumb */}
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button
            onClick={onBack}
            style={{
              display:"flex",alignItems:"center",gap:6,
              padding:"7px 14px",borderRadius:8,
              border:"1px solid rgba(0,0,0,.14)",background:"white",
              color:"#3a3a45",fontSize:13,fontWeight:500,cursor:"pointer",
            }}
          >
            ‹ All Templates
          </button>
          <div style={{display:"flex",alignItems:"center",gap:6,color:"#7a7a8a",fontSize:13}}>
            <span>📁</span>
            <span>My Templates</span>
            <span style={{opacity:.4}}>/</span>
            <span style={{color:"#0d0d0f",fontWeight:600,maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name}</span>
          </div>
        </div>

        {/* Right: actions */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <ActionBtn icon="🔗" label={copyMsg||"Copy Link"} onClick={handleCopyLink}/>
          <ActionBtn icon="✏" label="Edit"    onClick={()=>onEdit(template)}/>
          <ActionBtn icon="🖨" label="Print"   onClick={()=>window.print()}/>
          <ActionBtn
            icon={downloading?"⏳":"⬇"}
            label={downloading?"Generating…":"Download PDF"}
            onClick={handleDownload}
            primary
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{flex:1,overflowY:"auto",padding:"36px 40px"}}>

        {/* Status chip */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 14px",borderRadius:99,background:"#dcfce7",color:"#15803d",fontSize:12,fontWeight:600,border:"1px solid #bbf7d0"}}>
            ✓ Document Ready
          </div>
          <div style={{fontSize:13,color:"#7a7a8a"}}>Created {formattedDate}</div>
        </div>

        {/* Metadata strip */}
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:32}}>
          <MetaPill icon="📄" label="Type"    value={DOC_TYPES[docType]?.label || docType}/>
          <MetaPill icon="⊞"  label="Layout"  value={LAYOUTS[layout]?.label   || layout}/>
          <MetaPill icon="🏢" label="Company" value={f.company || "—"}/>
          <MetaPill icon="👤" label="Receiver" value={f.receiver || "—"}/>
          <MetaPill icon="📅" label="Date"    value={f.date || "—"}/>
          <MetaPill icon="🎨" label="Colour"  value={COLORS[d.accentColor]?.name} accent={accentHex}/>
          <MetaPill icon="✅" label="Status"  value="Ready for Download" accent="#16a34a"/>
        </div>

        {/* Full document */}
        <div style={{maxWidth:820,margin:"0 auto"}}>
          <div style={{
            borderRadius:18,overflow:"hidden",
            boxShadow:"0 20px 60px rgba(0,0,0,.12)",
            transition:"transform .3s",
          }}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
          >
            <LetterPreview design={d} form={f} docType={docType} />
          </div>

          {/* Tip bar */}
          <div style={{
            marginTop:20, padding:"14px 20px", background:"white",
            borderRadius:12, border:"1px solid rgba(0,0,0,.08)",
            fontSize:13, color:"#3a3a45",
            display:"flex", alignItems:"center", gap:12, lineHeight:1.5,
          }}>
            <span style={{fontSize:18}}>💡</span>
            <span>
              <b>Pro tip:</b> Press <kbd style={{background:"#f5f4f1",border:"1px solid rgba(0,0,0,.12)",borderRadius:4,padding:"1px 6px",fontSize:12}}>Ctrl+P</kbd> (or <kbd style={{background:"#f5f4f1",border:"1px solid rgba(0,0,0,.12)",borderRadius:4,padding:"1px 6px",fontSize:12}}>⌘P</kbd> on Mac) then choose <b>Save as PDF</b> to export this document.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}