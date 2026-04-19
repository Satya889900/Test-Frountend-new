// BusinessLetterEditor.jsx
// Route: /editor/letter/:templateId
// Full letter editor — tabbed form, live A4 preview, color picker, font & page size controls
// Requires: react-router-dom, Layout component

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LETTER_TEMPLATES } from "./BusinessLetterPage";

// ─── Accent color palette ───────────────────────────────────────────────────
const ACCENT_COLORS = [
  "#7c3aed","#4f46e5","#2563eb","#0891b2","#0ea5e9",
  "#22c55e","#16a34a","#eab308","#f97316","#ef4444",
  "#db2777","#ec4899","#a855f7","#10b981","#14b8a6","#374151",
];

// ─── Page sizes (width × height in mm for display) ─────────────────────────
const PAGE_SIZES = {
  A4:     { label:"A4",     w:"210mm", h:"297mm", previewW:540, ratio: 297 / 210 },
  Letter: { label:"Letter", w:"8.5in", h:"11in",  previewW:520, ratio: 11 / 8.5 },
  Legal:  { label:"Legal",  w:"8.5in", h:"14in",  previewW:520, ratio: 14 / 8.5 },
};

// ─── Empty form state ───────────────────────────────────────────────────────
const EMPTY = {
  senderName:"", senderTitle:"", senderCompany:"",
  senderEmail:"", senderPhone:"", senderWebsite:"",
  senderAddress:"", senderCity:"", senderState:"", senderZip:"", senderCountry:"",
  recipientName:"", recipientTitle:"", recipientCompany:"",
  recipientAddress:"", recipientCity:"", recipientState:"", recipientZip:"",
  date:"", subject:"",
  salutation:"Dear", salutationName:"",
  body:"",
  closing:"Sincerely", signature:"",
};

// ─── Live letter preview renderer ──────────────────────────────────────────
function LetterPreview({ template, color, fontSize, data, pageSize }) {
  const a = color;
  const fs = parseInt(fontSize);
  const d = data;
  const pw = PAGE_SIZES[pageSize]?.previewW || 540;

  const salLine = d.salutation === "To Whom It May Concern"
    ? "To Whom It May Concern,"
    : `${d.salutation}${d.salutationName ? " " + d.salutationName : ""},`;

  // Shared blocks
  const senderInfo = (
    <div style={{ fontSize: fs, lineHeight: 1.8, color: "#374151" }}>
      {d.senderName    && <div style={{ fontWeight:700, fontSize: fs+1, color:"#0f172a" }}>{d.senderName}</div>}
      {d.senderTitle   && <div style={{ color:"#64748b" }}>{d.senderTitle}{d.senderCompany ? `, ${d.senderCompany}` : ""}</div>}
      {d.senderAddress && <div>{d.senderAddress}</div>}
      {(d.senderCity||d.senderState||d.senderZip) &&
        <div>{[d.senderCity, d.senderState, d.senderZip].filter(Boolean).join(", ")}</div>}
      {d.senderEmail   && <div>{d.senderEmail}</div>}
      {d.senderPhone   && <div>{d.senderPhone}</div>}
    </div>
  );

  const recipientBlock = (
    <div style={{ fontSize: fs, lineHeight: 1.8, color:"#374151", marginBottom:14 }}>
      {d.recipientName    && <div style={{ fontWeight:700 }}>{d.recipientName}</div>}
      {d.recipientTitle   && <div>{d.recipientTitle}</div>}
      {d.recipientCompany && <div>{d.recipientCompany}</div>}
      {d.recipientAddress && <div>{d.recipientAddress}</div>}
      {(d.recipientCity||d.recipientState||d.recipientZip) &&
        <div>{[d.recipientCity, d.recipientState, d.recipientZip].filter(Boolean).join(", ")}</div>}
    </div>
  );

  const dateSubjectBlock = (
    <>
      {d.date    && <div style={{ fontSize: fs, color:"#374151", marginBottom:8 }}>{d.date}</div>}
      {d.subject && <div style={{ fontSize: fs, fontWeight:700, color:"#0f172a", marginBottom:14 }}>Re: {d.subject}</div>}
    </>
  );

  const bodyBlock = (
    <div style={{ fontSize: fs, color:"#374151", lineHeight:1.75, marginBottom:18, whiteSpace:"pre-wrap" }}>
      {d.body || <span style={{ color:"#cbd5e1", fontStyle:"italic" }}>Your letter body will appear here…</span>}
    </div>
  );

  const closingBlock = (
    <div style={{ fontSize: fs, color:"#374151", lineHeight:1.8 }}>
      <div>{d.closing || "Sincerely"},</div>
      <div style={{ marginTop:30, borderTop:`1.5px solid ${a}`, paddingTop:6, display:"inline-block", minWidth:120, fontWeight:700 }}>
        {d.signature || d.senderName || ""}
      </div>
    </div>
  );

  const id = template?.id || "";

  // ── Sidebar / stripe-v / line-left / bold-flag
  if (["stripe-v","stripe-r","line-left","bold-flag"].includes(id)) {
    const isRight = id === "stripe-r";
    const sideW = id === "bold-flag" ? 10 : 14;
    return (
      <div style={{ display:"flex", height:"100%", fontFamily:"Georgia, serif" }}>
        {!isRight && <div style={{ width:sideW, minWidth:sideW, background:a }} />}
        {id === "bold-flag" && <div style={{ width:0, height:0 }} />}
        <div style={{ flex:1, padding:"28px 26px" }}>
          {id === "bold-flag" && (
            <div style={{ background: a+"18", borderBottom:`2px solid ${a}`, padding:"14px 0", marginBottom:20 }}>
              <div style={{ fontWeight:700, fontSize:fs+3, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
              <div style={{ fontSize:fs-1, color:"#64748b" }}>{[d.senderEmail, d.senderPhone].filter(Boolean).join(" · ")}</div>
            </div>
          )}
          {id !== "bold-flag" && senderInfo}
          {id !== "bold-flag" && <div style={{ height:1, background: a+"30", margin:"14px 0" }} />}
          {dateSubjectBlock}
          {recipientBlock}
          <div style={{ fontSize: fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}
          {closingBlock}
        </div>
        {isRight && <div style={{ width:sideW, minWidth:sideW, background:a }} />}
      </div>
    );
  }

  // ── Full header band (stripe-h, bold-solid, all gradients, newsletter)
  if (["stripe-h","bold-solid","grad-sunrise","grad-ocean","grad-forest","grad-sunset","grad-cosmic","grad-rose","newsletter"].includes(id)) {
    const isGrad = id.startsWith("grad") || id === "newsletter";
    const bg = isGrad ? `linear-gradient(135deg,${a},${a}80)` : a;
    return (
      <div style={{ fontFamily:"'Helvetica Neue',sans-serif" }}>
        <div style={{ background:bg, padding:"22px 28px", marginBottom:22 }}>
          <div style={{ fontSize:fs+5, fontWeight:700, color:"#fff" }}>{d.senderName||"Your Name"}</div>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginTop:5 }}>
            {[d.senderTitle, d.senderEmail, d.senderPhone, [d.senderCity,d.senderState].filter(Boolean).join(", ")].filter(Boolean).map((v,i)=>(
              <span key={i} style={{ fontSize:fs-1, color:"rgba(255,255,255,.8)" }}>{v}</span>
            ))}
          </div>
        </div>
        <div style={{ padding:"0 28px 28px" }}>
          {dateSubjectBlock}
          {recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}
          {closingBlock}
        </div>
      </div>
    );
  }

  // ── Stripe bottom
  if (id === "stripe-b") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", height:"100%" }}>
        <div style={{ padding:"28px 28px 0" }}>
          {senderInfo}
          <div style={{ height:1, background: a+"30", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
        <div style={{ height:12, background:a, marginTop:22 }} />
      </div>
    );
  }

  // ── Double stripe
  if (id === "stripe-d") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif" }}>
        <div style={{ background:a, height:12 }} />
        <div style={{ display:"flex" }}>
          <div style={{ width:12, background: a+"25" }} />
          <div style={{ flex:1, padding:"24px 24px 28px" }}>
            {senderInfo}
            <div style={{ height:1, background: a+"30", margin:"14px 0" }} />
            {dateSubjectBlock}{recipientBlock}
            <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
            {bodyBlock}{closingBlock}
          </div>
        </div>
      </div>
    );
  }

  // ── Mid divider
  if (id === "stripe-mid") {
    return (
      <div style={{ padding:"28px", fontFamily:"'Inter',sans-serif" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <div>{senderInfo}</div>
          <div style={{ textAlign:"right", fontSize:fs, color:"#64748b" }}>
            {d.date && <div>{d.date}</div>}
          </div>
        </div>
        <div style={{ height:2, background:a, marginBottom:20 }} />
        {d.subject && <div style={{ fontSize:fs+1, fontWeight:700, color:"#0f172a", marginBottom:14 }}>Re: {d.subject}</div>}
        {recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Minimal + airy + clean
  if (["min-clean","min-air","min-dot"].includes(id)) {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
          <div>
            <div style={{ fontSize:fs+5, fontWeight:700, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
            <div style={{ fontSize:fs-1, color:"#94a3b8", marginTop:3 }}>{[d.senderEmail,d.senderPhone].filter(Boolean).join(" · ")}</div>
          </div>
          <div style={{ fontSize:fs-1, color:"#94a3b8", textAlign:"right" }}>
            {d.date    && <div>{d.date}</div>}
            {d.senderCity && <div>{[d.senderCity,d.senderState].filter(Boolean).join(", ")}</div>}
          </div>
        </div>
        <div style={{ height:1.5, background:a, marginBottom:18 }} />
        {id === "min-dot" && (
          <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:`radial-gradient(circle, ${a}20 1px, transparent 1px)`, backgroundSize:"16px 16px", pointerEvents:"none", borderRadius:4 }} />
        )}
        {d.subject && <div style={{ fontSize:fs, fontWeight:700, color:a, marginBottom:14, textTransform:"uppercase", letterSpacing:".06em" }}>{d.subject}</div>}
        {recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Single underline
  if (id === "min-line") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", padding:28 }}>
        <div style={{ borderBottom:`2px solid ${a}`, paddingBottom:12, marginBottom:18 }}>
          <div style={{ fontSize:fs+5, fontWeight:700, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
          <div style={{ fontSize:fs-1, color:"#94a3b8" }}>{[d.senderEmail,d.senderPhone].filter(Boolean).join(" · ")}</div>
        </div>
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Monogram
  if (id === "min-mono") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", padding:28, position:"relative" }}>
        <div style={{ position:"absolute", top:10, right:20, fontSize:120, color: a+"10", fontWeight:800, fontFamily:"Georgia,serif", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
          {(d.senderName||"A").charAt(0).toUpperCase()}
        </div>
        <div style={{ position:"relative" }}>
          {senderInfo}
          <div style={{ height:1, background: a+"30", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Edge border
  if (id === "min-edge") {
    return (
      <div style={{ border:`2px solid ${a}`, padding:28, fontFamily:"'Inter',sans-serif", height:"100%" }}>
        {senderInfo}
        <div style={{ height:1, background: a+"30", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Bold split
  if (id === "bold-split") {
    return (
      <div style={{ display:"flex", height:"100%", fontFamily:"'Inter',sans-serif" }}>
        <div style={{ width:"36%", background: a+"15", borderRight:`2px solid ${a}30`, padding:"28px 20px" }}>
          <div style={{ fontSize:fs+2, fontWeight:700, color:"#0f172a", marginBottom:6 }}>{d.senderName||"Your Name"}</div>
          <div style={{ fontSize:fs-1, color:"#64748b", marginBottom:4 }}>{d.senderTitle}</div>
          <div style={{ fontSize:fs-1, color:"#64748b" }}>{d.senderEmail}</div>
          <div style={{ fontSize:fs-1, color:"#64748b" }}>{d.senderPhone}</div>
          <div style={{ height:1, background: a, margin:"16px 0" }} />
          <div style={{ fontSize:fs-1, color:"#64748b", lineHeight:1.8 }}>
            {d.senderAddress && <div>{d.senderAddress}</div>}
            {d.senderCity && <div>{[d.senderCity,d.senderState,d.senderZip].filter(Boolean).join(", ")}</div>}
          </div>
        </div>
        <div style={{ flex:1, padding:"28px 26px" }}>
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Bold banner
  if (id === "bold-banner") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", padding:"28px 28px 28px" }}>
        {senderInfo}
        {d.date && <div style={{ fontSize:fs, color:"#374151", marginTop:14 }}>{d.date}</div>}
        {d.subject && (
          <div style={{ background:a, color:"#fff", fontWeight:700, fontSize:fs+1, padding:"10px 18px", margin:"18px 0", borderRadius:4 }}>
            Re: {d.subject}
          </div>
        )}
        {recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Bold stamp / complaint
  if (["bold-stamp","complaint-red"].includes(id)) {
    return (
      <div style={{ border:`3px solid ${a}`, padding:28, fontFamily:"Georgia,serif", height:"100%" }}>
        {id === "complaint-red" && (
          <div style={{ textAlign:"center", fontSize:fs+2, fontWeight:700, color:a, borderBottom:`2px solid ${a}`, paddingBottom:12, marginBottom:18, textTransform:"uppercase", letterSpacing:".1em" }}>
            Formal Complaint
          </div>
        )}
        {senderInfo}
        <div style={{ height:1, background: a+"40", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Bold block
  if (id === "bold-block") {
    return (
      <div style={{ background: a+"08", padding:28, fontFamily:"'Inter',sans-serif", height:"100%" }}>
        <div style={{ background:a, borderRadius:8, padding:"16px 20px", marginBottom:22 }}>
          <div style={{ fontSize:fs+4, fontWeight:700, color:"#fff" }}>{d.senderName||"Your Name"}</div>
          <div style={{ fontSize:fs-1, color:"rgba(255,255,255,.75)", marginTop:4 }}>{[d.senderTitle,d.senderEmail,d.senderPhone].filter(Boolean).join(" · ")}</div>
        </div>
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Line top
  if (id === "line-top") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif" }}>
        <div style={{ height:5, background:a }} />
        <div style={{ padding:"22px 28px 28px" }}>
          {senderInfo}
          <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Line double
  if (id === "line-double") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif" }}>
        <div style={{ height:4, background:a }} />
        <div style={{ height:2, background: a+"50", marginTop:3 }} />
        <div style={{ padding:"22px 28px 28px" }}>
          {senderInfo}
          <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Line frame
  if (id === "line-frame") {
    return (
      <div style={{ border:`2px solid ${a}`, padding:28, fontFamily:"'Inter',sans-serif", height:"100%" }}>
        {senderInfo}
        <div style={{ height:1, background: a+"30", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Line dash
  if (id === "line-dash") {
    return (
      <div style={{ border:`2px dashed ${a}`, padding:28, borderRadius:8, fontFamily:"'Inter',sans-serif", height:"100%" }}>
        {senderInfo}
        <div style={{ height:1, background: a+"30", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Line underline
  if (id === "line-under") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", padding:28 }}>
        <div style={{ paddingBottom:10, borderBottom:`2px solid ${a}`, marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <div style={{ fontSize:fs+4, fontWeight:700, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
              <div style={{ fontSize:fs-1, color:"#94a3b8" }}>{[d.senderTitle,d.senderCompany].filter(Boolean).join(", ")}</div>
            </div>
            <div style={{ fontSize:fs-1, color:"#94a3b8", textAlign:"right" }}>
              <div>{d.senderEmail}</div><div>{d.senderPhone}</div>
            </div>
          </div>
        </div>
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Invoice style
  if (id === "invoice-style") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif" }}>
        <div style={{ height:5, background:a }} />
        <div style={{ padding:"20px 28px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:`1px solid #e2e8f0` }}>
          <div>
            <div style={{ fontSize:fs+6, fontWeight:800, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
            <div style={{ fontSize:fs-1, color:"#94a3b8" }}>{d.senderEmail} · {d.senderPhone}</div>
          </div>
          <div style={{ background: a+"15", border:`1px solid ${a}30`, borderRadius:8, padding:"8px 16px", textAlign:"right" }}>
            <div style={{ fontSize:fs-1, color:"#64748b" }}>Date</div>
            <div style={{ fontSize:fs, fontWeight:700, color:"#0f172a" }}>{d.date||"—"}</div>
          </div>
        </div>
        <div style={{ padding:"20px 28px 28px" }}>
          {d.subject && (
            <div style={{ background: a+"12", border:`1px solid ${a}25`, borderRadius:8, padding:"8px 16px", fontSize:fs, fontWeight:700, color:a, marginBottom:16 }}>
              Subject: {d.subject}
            </div>
          )}
          {recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Corner TL
  if (id === "corner-tl") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28 }}>
        <div style={{ position:"absolute", top:0, left:0, width:50, height:50, background:a, borderRadius:"0 0 50px 0" }} />
        <div style={{ paddingLeft:60, marginBottom:18 }}>
          <div style={{ fontSize:fs+4, fontWeight:700, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
          <div style={{ fontSize:fs-1, color:"#94a3b8" }}>{[d.senderEmail,d.senderPhone].filter(Boolean).join(" · ")}</div>
        </div>
        <div style={{ height:1, background:"#f1f5f9", marginBottom:16 }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Corner TR
  if (id === "corner-tr") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28 }}>
        <div style={{ position:"absolute", top:0, right:0, width:50, height:50, background:a, borderRadius:"0 0 0 50px" }} />
        {senderInfo}
        <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Corner BR + BL
  if (["corner-br","corner-bl"].includes(id)) {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28, height:"100%" }}>
        {id === "corner-br" && <div style={{ position:"absolute", bottom:0, right:0, width:50, height:50, background:a }} />}
        {id === "corner-bl" && <div style={{ position:"absolute", bottom:0, left:0, width:50, height:50, background:a }} />}
        {senderInfo}
        <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── All corners
  if (id === "corner-all") {
    const sq = { position:"absolute", width:32, height:32, background:a };
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28, height:"100%" }}>
        <div style={{ ...sq, top:0,left:0 }} />
        <div style={{ ...sq, top:0,right:0 }} />
        <div style={{ ...sq, bottom:0,left:0 }} />
        <div style={{ ...sq, bottom:0,right:0 }} />
        <div style={{ paddingLeft:20 }}>
          {senderInfo}
          <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Corner diagonal
  if (id === "corner-diag") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28, height:"100%" }}>
        <div style={{ position:"absolute", top:0, left:0, width:0, height:0, borderStyle:"solid", borderWidth:"50px 50px 0 0", borderColor:`${a} transparent transparent transparent` }} />
        <div style={{ position:"absolute", bottom:0, right:0, width:0, height:0, borderStyle:"solid", borderWidth:"0 0 50px 50px", borderColor:`transparent transparent ${a} transparent` }} />
        {senderInfo}
        <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Geometric wave
  if (id === "geo-wave") {
    return (
      <div style={{ fontFamily:"'Helvetica Neue',sans-serif", position:"relative", height:"100%" }}>
        <div style={{ padding:"28px 28px 0" }}>
          {senderInfo}
          <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
        <svg viewBox="0 0 600 50" style={{ width:"100%", display:"block", marginTop:20 }}>
          <path d="M0 25 Q150 5 300 25 Q450 45 600 25 L600 50 L0 50 Z" fill={a} />
        </svg>
      </div>
    );
  }

  // ── Geometric chevron
  if (id === "geo-chevron") {
    return (
      <div style={{ fontFamily:"'Helvetica Neue',sans-serif" }}>
        <svg viewBox="0 0 600 60" style={{ width:"100%", display:"block" }}>
          <polygon points="0,0 600,0 600,42 300,58 0,42" fill={a} />
          <text x="24" y="28" fill="white" fontSize={fs+4} fontWeight="bold" fontFamily="inherit">{d.senderName||"Your Name"}</text>
          <text x="24" y="44" fill="rgba(255,255,255,.75)" fontSize={fs-1} fontFamily="inherit">{d.senderEmail}</text>
        </svg>
        <div style={{ padding:"18px 28px 28px" }}>
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Geometric triangle
  if (id === "geo-triangle") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28, height:"100%" }}>
        <div style={{ position:"absolute", top:0, left:0, width:0, height:0, borderStyle:"solid", borderWidth:"80px 80px 0 0", borderColor:`${a}30 transparent transparent transparent`, pointerEvents:"none" }} />
        {senderInfo}
        <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Geometric circle
  if (id === "geo-circle") {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", position:"relative", padding:28, height:"100%" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:300, height:300, borderRadius:"50%", background: a+"08", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          {senderInfo}
          <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Geometric hex + diamond (both use accent shape)
  if (["geo-hex","geo-diamond"].includes(id)) {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", padding:28, position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
          <div>
            <div style={{ fontSize:fs+4, fontWeight:700, color:"#0f172a" }}>{d.senderName||"Your Name"}</div>
            <div style={{ fontSize:fs-1, color:"#94a3b8" }}>{d.senderEmail}</div>
          </div>
          <svg viewBox="0 0 50 50" width="44" height="44">
            {id === "geo-hex"
              ? <polygon points="25,3 47,14 47,36 25,47 3,36 3,14" fill={a+"30"} stroke={a} strokeWidth="2" />
              : <rect x="12" y="12" width="26" height="26" fill={a+"30"} stroke={a} strokeWidth="2" transform="rotate(45 25 25)" />
            }
          </svg>
        </div>
        <div style={{ height:1, background: a, marginBottom:18 }} />
        {dateSubjectBlock}{recipientBlock}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Classic / Traditional / Corporate / Executive / Government / Legal / Academic
  if (["classic-trad","classic-corp","classic-exec","classic-gov","classic-legal","classic-acad"].includes(id)) {
    return (
      <div style={{ fontFamily:"Georgia, serif", padding:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
          {/* Logo/company block */}
          <div>
            {d.senderCompany && <div style={{ fontSize:fs+4, fontWeight:700, color:a, letterSpacing:"-0.3px" }}>{d.senderCompany}</div>}
            {d.senderTitle   && <div style={{ fontSize:fs-1, color:"#64748b" }}>{d.senderTitle}</div>}
          </div>
          {/* Sender address right */}
          <div style={{ textAlign:"right", fontSize:fs-1, color:"#374151", lineHeight:1.8 }}>
            {d.senderName    && <div style={{ fontWeight:700 }}>{d.senderName}</div>}
            {d.senderEmail   && <div>{d.senderEmail}</div>}
            {d.senderPhone   && <div>{d.senderPhone}</div>}
            {d.senderAddress && <div>{d.senderAddress}</div>}
            {d.senderCity    && <div>{[d.senderCity,d.senderState,d.senderZip].filter(Boolean).join(", ")}</div>}
          </div>
        </div>
        <div style={{ height:2, background:a, marginBottom:18 }} />
        {d.date    && <div style={{ fontSize:fs-1, color:"#374151", marginBottom:14 }}>{d.date}</div>}
        {recipientBlock}
        {d.subject && <div style={{ fontWeight:700, fontSize:fs, textDecoration:"underline", marginBottom:14, color:"#0f172a" }}>Re: {d.subject}</div>}
        <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Cover letter
  if (id === "cover-modern") {
    return (
      <div style={{ fontFamily:"'Helvetica Neue',sans-serif" }}>
        <div style={{ background:a, padding:"24px 28px" }}>
          <div style={{ fontSize:fs+6, fontWeight:700, color:"#fff" }}>{d.senderName||"Your Name"}</div>
          <div style={{ fontSize:fs-1, color:"rgba(255,255,255,.8)", marginTop:4 }}>{d.senderTitle}</div>
          <div style={{ display:"flex", gap:16, marginTop:10, flexWrap:"wrap" }}>
            {[d.senderEmail,d.senderPhone,d.senderWebsite].filter(Boolean).map((v,i)=>(
              <span key={i} style={{ fontSize:fs-1, color:"rgba(255,255,255,.75)" }}>{v}</span>
            ))}
          </div>
        </div>
        <div style={{ padding:"22px 28px 28px" }}>
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Memo
  if (id === "memo-style") {
    return (
      <div style={{ fontFamily:"'Arial',sans-serif", padding:28 }}>
        <div style={{ textAlign:"center", borderBottom:`2px solid ${a}`, paddingBottom:14, marginBottom:20 }}>
          <div style={{ fontSize:fs+6, fontWeight:800, color:a, letterSpacing:".1em", textTransform:"uppercase" }}>Memorandum</div>
          {d.senderCompany && <div style={{ fontSize:fs, color:"#64748b", marginTop:4 }}>{d.senderCompany}</div>}
        </div>
        <table style={{ width:"100%", fontSize:fs, marginBottom:20 }}>
          {[["To:",d.recipientName||"—"],["From:",d.senderName||"—"],["Date:",d.date||"—"],["Subject:",d.subject||"—"]].map(([l,v]) => (
            <tr key={l}>
              <td style={{ fontWeight:700, color:"#374151", paddingBottom:6, width:70 }}>{l}</td>
              <td style={{ color:"#0f172a", paddingBottom:6, borderBottom:"1px solid #f1f5f9" }}>{v}</td>
            </tr>
          ))}
        </table>
        {bodyBlock}{closingBlock}
      </div>
    );
  }

  // ── Invoice / newsletter fallback → same as top-band
  if (["newsletter"].includes(id)) {
    return (
      <div style={{ fontFamily:"'Helvetica Neue',sans-serif" }}>
        <div style={{ background:`linear-gradient(135deg,${a},${a}88)`, padding:"22px 28px", marginBottom:22 }}>
          <div style={{ fontSize:fs+5, fontWeight:700, color:"#fff" }}>{d.senderName||"Your Name"}</div>
        </div>
        <div style={{ padding:"0 28px 28px" }}>
          {dateSubjectBlock}{recipientBlock}
          <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
          {bodyBlock}{closingBlock}
        </div>
      </div>
    );
  }

  // ── Default minimal fallback
  return (
    <div style={{ fontFamily:"'Inter',sans-serif", padding:28 }}>
      <div style={{ height:2.5, background:a, marginBottom:18 }} />
      {senderInfo}
      <div style={{ height:1, background:"#f1f5f9", margin:"14px 0" }} />
      {dateSubjectBlock}{recipientBlock}
      <div style={{ fontSize:fs, color:"#374151", marginBottom:10 }}>{salLine}</div>
      {bodyBlock}{closingBlock}
    </div>
  );
}

// ─── Reusable form field ────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <label style={{ fontSize:10, fontWeight:700, color:"#64748b", letterSpacing:".03em" }}>{label}</label>
      {children}
    </div>
  );
}

function iStyle(a) {
  return {
    width:"100%", padding:"9px 12px", border:"1.5px solid #e2e8f0", borderRadius:9,
    fontSize:12, outline:"none", fontFamily:"inherit", color:"#0f172a", background:"#fff",
    transition:"border-color .15s",
  };
}

function Grid2({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>{children}</div>;
}
function Grid3({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:10, marginBottom:10 }}>{children}</div>;
}

function SectionCard({ icon, title, children }) {
  return (
    <div style={{ background:"#fff", borderRadius:16, padding:"18px 16px", border:"1.5px solid #f1f5f9", marginBottom:14 }}>
      <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:14, display:"flex", alignItems:"center", gap:7, paddingBottom:9, borderBottom:"1px solid #f8fafc" }}>
        <span style={{ fontSize:16 }}>{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

// ─── Main editor ────────────────────────────────────────────────────────────
export default function BusinessLetterEditor() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [user] = useState({ name: "Satya" });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ ...EMPTY });
  const [tab, setTab] = useState("sender");         // sender | recipient | content
  const [accentColor, setAccentColor] = useState(null);
  const [pageSize, setPageSize] = useState("A4");
  const [fontSize, setFontSize] = useState(12);
  const previewRef = useRef(null);

  // Resolve template from id
  const template = LETTER_TEMPLATES.find(t => t.id === templateId)
    || LETTER_TEMPLATES[0];

  const a = accentColor || template.color;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }
    setData(d => ({
      ...d,
      date: new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }),
    }));
    setTimeout(() => setLoading(false), 420);
  }, [navigate]);

  const set = (key) => (e) => setData(d => ({ ...d, [key]: e.target.value }));

  const handlePrint = () => {
    const content = previewRef.current;
    if (!content) { window.print(); return; }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${template.name} Letter — ${data.senderName||"Letter"}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { width: ${PAGE_SIZES[pageSize].w}; margin: 0 auto; }
            @page { size: ${PAGE_SIZES[pageSize].w} ${PAGE_SIZES[pageSize].h}; margin: 20mm 18mm; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 400);
  };

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:46, height:46, border:`3px solid ${a}22`, borderTopColor:a, borderRadius:"50%", animation:"spin .8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const TABS = [
    { id:"sender",    label:"Sender",    icon:"👤" },
    { id:"recipient", label:"Recipient", icon:"🏢" },
    { id:"content",   label:"Content",   icon:"✍️" },
    { id:"style",     label:"Style",     icon:"🎨" },
  ];

  const previewW = PAGE_SIZES[pageSize]?.previewW || 540;
  const previewH = Math.round(previewW * (PAGE_SIZES[pageSize]?.ratio || (297 / 210)));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;font-family:'Inter',sans-serif}
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{border-color:${a}!important;box-shadow:0 0 0 3px ${a}18!important;outline:none}
      `}</style>

      <div style={{ background:"#f8fafc", minHeight:"100vh" }}>

        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <div style={{
          background:`linear-gradient(135deg,${a}ee,${a})`,
          padding:"18px 28px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:14,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <button
              onClick={() => navigate("/letter-builder")}
              style={{ padding:"7px 18px", borderRadius:9, border:"1.5px solid rgba(255,255,255,.3)", background:"rgba(255,255,255,.15)", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
              ← Templates
            </button>
            <div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff" }}>{template.name} Letter</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.7)" }}>Fill in your details — preview updates live</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:9 }}>
            <button style={{ padding:"8px 20px", borderRadius:9, border:"1.5px solid rgba(255,255,255,.3)", background:"rgba(255,255,255,.15)", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
              Save draft
            </button>
            <button
              onClick={handlePrint}
              style={{ padding:"8px 20px", borderRadius:9, border:"none", background:"#fff", color:a, fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
              Download PDF ↗
            </button>
          </div>
        </div>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"400px 1fr", minHeight:"calc(100vh - 66px)" }}>

          {/* ── FORM PANE ─────────────────────────────────────────────── */}
          <div style={{ background:"#fff", borderRight:"1px solid #f1f5f9", display:"flex", flexDirection:"column", height:"calc(100vh - 66px)", overflow:"hidden" }}>

            {/* Tab bar */}
            <div style={{ display:"flex", borderBottom:"1px solid #f1f5f9", padding:"0 16px" }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex:1, padding:"12px 4px", border:"none",
                    borderBottom:`2.5px solid ${tab===t.id ? a : "transparent"}`,
                    background:"none",
                    color: tab===t.id ? a : "#94a3b8",
                    fontWeight: tab===t.id ? 700 : 500,
                    fontSize:11, cursor:"pointer", fontFamily:"inherit",
                    display:"flex", alignItems:"center", justifyContent:"center", gap:4,
                    transition:"all .15s",
                  }}>
                  <span style={{ fontSize:13 }}>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>

            {/* Scrollable form body */}
            <div style={{ flex:1, overflowY:"auto", padding:16 }}>

              {/* ── SENDER TAB */}
              {tab === "sender" && (
                <SectionCard icon="👤" title="Your information">
                  <Grid2>
                    <Field label="Full name"><input value={data.senderName} onChange={set("senderName")} placeholder="John Doe" style={iStyle(a)} /></Field>
                    <Field label="Job title"><input value={data.senderTitle} onChange={set("senderTitle")} placeholder="Manager" style={iStyle(a)} /></Field>
                  </Grid2>
                  <div style={{ marginBottom:10 }}>
                    <Field label="Company name"><input value={data.senderCompany} onChange={set("senderCompany")} placeholder="Acme Inc." style={iStyle(a)} /></Field>
                  </div>
                  <Grid2>
                    <Field label="Email"><input value={data.senderEmail} onChange={set("senderEmail")} placeholder="john@acme.com" style={iStyle(a)} type="email" /></Field>
                    <Field label="Phone"><input value={data.senderPhone} onChange={set("senderPhone")} placeholder="+1 (555) 000-0000" style={iStyle(a)} /></Field>
                  </Grid2>
                  <div style={{ marginBottom:10 }}>
                    <Field label="Website"><input value={data.senderWebsite} onChange={set("senderWebsite")} placeholder="www.acme.com" style={iStyle(a)} /></Field>
                  </div>
                  <div style={{ marginBottom:10 }}>
                    <Field label="Street address"><input value={data.senderAddress} onChange={set("senderAddress")} placeholder="123 Main Street" style={iStyle(a)} /></Field>
                  </div>
                  <Grid3>
                    <Field label="City"><input value={data.senderCity} onChange={set("senderCity")} placeholder="New York" style={iStyle(a)} /></Field>
                    <Field label="State"><input value={data.senderState} onChange={set("senderState")} placeholder="NY" style={iStyle(a)} /></Field>
                    <Field label="ZIP"><input value={data.senderZip} onChange={set("senderZip")} placeholder="10001" style={iStyle(a)} /></Field>
                  </Grid3>
                </SectionCard>
              )}

              {/* ── RECIPIENT TAB */}
              {tab === "recipient" && (
                <SectionCard icon="🏢" title="Recipient information">
                  <Grid2>
                    <Field label="Recipient name"><input value={data.recipientName} onChange={set("recipientName")} placeholder="Jane Smith" style={iStyle(a)} /></Field>
                    <Field label="Title / Role"><input value={data.recipientTitle} onChange={set("recipientTitle")} placeholder="HR Manager" style={iStyle(a)} /></Field>
                  </Grid2>
                  <div style={{ marginBottom:10 }}>
                    <Field label="Company name"><input value={data.recipientCompany} onChange={set("recipientCompany")} placeholder="XYZ Corporation" style={iStyle(a)} /></Field>
                  </div>
                  <div style={{ marginBottom:10 }}>
                    <Field label="Street address"><input value={data.recipientAddress} onChange={set("recipientAddress")} placeholder="456 Business Avenue" style={iStyle(a)} /></Field>
                  </div>
                  <Grid3>
                    <Field label="City"><input value={data.recipientCity} onChange={set("recipientCity")} placeholder="Los Angeles" style={iStyle(a)} /></Field>
                    <Field label="State"><input value={data.recipientState} onChange={set("recipientState")} placeholder="CA" style={iStyle(a)} /></Field>
                    <Field label="ZIP"><input value={data.recipientZip} onChange={set("recipientZip")} placeholder="90210" style={iStyle(a)} /></Field>
                  </Grid3>
                </SectionCard>
              )}

              {/* ── CONTENT TAB */}
              {tab === "content" && (
                <>
                  <SectionCard icon="📅" title="Date & subject">
                    <div style={{ marginBottom:10 }}>
                      <Field label="Date"><input value={data.date} onChange={set("date")} placeholder="January 15, 2025" style={iStyle(a)} /></Field>
                    </div>
                    <Field label="Subject line"><input value={data.subject} onChange={set("subject")} placeholder="Subject of your letter" style={iStyle(a)} /></Field>
                  </SectionCard>

                  <SectionCard icon="✍️" title="Letter body">
                    <Grid2>
                      <Field label="Salutation">
                        <select value={data.salutation} onChange={set("salutation")} style={{ ...iStyle(a), cursor:"pointer" }}>
                          {["Dear","To Whom It May Concern","Hello","Dear Sir/Madam","Respected"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field label="Name in salutation">
                        <input value={data.salutationName} onChange={set("salutationName")} placeholder="Jane Smith" style={iStyle(a)} />
                      </Field>
                    </Grid2>
                    <div style={{ marginBottom:10 }}>
                      <Field label="Letter body">
                        <textarea
                          value={data.body} onChange={set("body")}
                          placeholder="Write the main content of your letter here…"
                          style={{ ...iStyle(a), minHeight:180, resize:"vertical", lineHeight:1.65 }}
                        />
                      </Field>
                    </div>
                    <Grid2>
                      <Field label="Closing">
                        <select value={data.closing} onChange={set("closing")} style={{ ...iStyle(a), cursor:"pointer" }}>
                          {["Sincerely","Best regards","Regards","Thank you","Yours truly","Respectfully","Kind regards"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </Field>
                      <Field label="Signature name">
                        <input value={data.signature} onChange={set("signature")} placeholder="John Doe" style={iStyle(a)} />
                      </Field>
                    </Grid2>
                  </SectionCard>
                </>
              )}

              {/* ── STYLE TAB */}
              {tab === "style" && (
                <>
                  <SectionCard icon="🎨" title="Accent color">
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:6 }}>
                      {ACCENT_COLORS.map(c => (
                        <div
                          key={c}
                          onClick={() => setAccentColor(c)}
                          style={{
                            width:28, height:28, borderRadius:"50%",
                            background:c, cursor:"pointer",
                            border:`3px solid ${(accentColor||template.color)===c ? "#0f172a" : "transparent"}`,
                            transition:".15s",
                          }}
                          title={c}
                        />
                      ))}
                    </div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:8 }}>
                      Current: <span style={{ color:a, fontWeight:700 }}>{a}</span>
                      {!accentColor && " (template default)"}
                    </div>
                    {accentColor && (
                      <button onClick={() => setAccentColor(null)} style={{ marginTop:8, fontSize:11, color:"#64748b", background:"none", border:"none", cursor:"pointer", padding:0, textDecoration:"underline", fontFamily:"inherit" }}>
                        Reset to template color
                      </button>
                    )}
                  </SectionCard>

                  <SectionCard icon="📐" title="Page size">
                    <div style={{ display:"flex", gap:10 }}>
                      {Object.entries(PAGE_SIZES).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setPageSize(key)}
                          style={{
                            flex:1, padding:"10px 6px", borderRadius:10,
                            border:`1.5px solid ${pageSize===key ? a : "#e2e8f0"}`,
                            background: pageSize===key ? a+"12" : "#fff",
                            color: pageSize===key ? a : "#374151",
                            fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit",
                            transition:".15s",
                          }}
                        >
                          {val.label}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:10 }}>
                      {PAGE_SIZES[pageSize].w} × {PAGE_SIZES[pageSize].h}
                    </div>
                  </SectionCard>

                  <SectionCard icon="🔠" title="Font size">
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <input
                        type="range" min="10" max="18" step="1"
                        value={fontSize}
                        onChange={e => setFontSize(Number(e.target.value))}
                        style={{ flex:1, accentColor: a }}
                      />
                      <span style={{ fontSize:13, fontWeight:700, color:a, minWidth:36, textAlign:"right" }}>
                        {fontSize}px
                      </span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#94a3b8", marginTop:4 }}>
                      <span>10px (small)</span><span>18px (large)</span>
                    </div>
                  </SectionCard>

                  <SectionCard icon="📋" title="Template info">
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                      <div style={{ width:40, height:40, borderRadius:10, background: template.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                        {template.icon}
                      </div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{template.name}</div>
                        <div style={{ fontSize:11, color:"#94a3b8" }}>{template.category} · {template.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/letter-builder")}
                      style={{ width:"100%", padding:"8px", borderRadius:9, border:"1.5px solid #e2e8f0", background:"#fff", color:"#374151", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                      ← Change template
                    </button>
                  </SectionCard>
                </>
              )}
            </div>

            {/* ── Bottom nav bar */}
            <div style={{ padding:"12px 16px", borderTop:"1px solid #f1f5f9", display:"flex", gap:9 }}>
              {tab !== "sender" && (
                <button
                  onClick={() => {
                    const order = ["sender","recipient","content","style"];
                    setTab(order[order.indexOf(tab) - 1]);
                  }}
                  style={{ flex:1, padding:"10px", borderRadius:9, border:"1.5px solid #e2e8f0", background:"#fff", color:"#374151", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                  ← Previous
                </button>
              )}
              {tab !== "style" ? (
                <button
                  onClick={() => {
                    const order = ["sender","recipient","content","style"];
                    setTab(order[order.indexOf(tab) + 1]);
                  }}
                  style={{ flex:1, padding:"10px", borderRadius:9, border:"none", background:a, color:"#fff", fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                  Next →
                </button>
              ) : (
                <button
                  onClick={handlePrint}
                  style={{ flex:1, padding:"10px", borderRadius:9, border:"none", background:a, color:"#fff", fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                  Download PDF ↗
                </button>
              )}
            </div>
          </div>

          {/* ── PREVIEW PANE ──────────────────────────────────────────── */}
          <div style={{ background:"#dde3ef", padding:28, overflowY:"auto", display:"flex", flexDirection:"column", alignItems:"center" }}>

            {/* Preview toolbar */}
            <div style={{ width:"100%", maxWidth: previewW, display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#64748b" }}>Live preview</div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontSize:11, background: a+"18", color:a, padding:"3px 11px", borderRadius:100, fontWeight:700 }}>{template.name}</span>
                <span style={{ fontSize:11, background:"#f1f5f9", color:"#64748b", padding:"3px 11px", borderRadius:100 }}>{pageSize}</span>
                <span style={{ fontSize:11, background:"#f1f5f9", color:"#64748b", padding:"3px 11px", borderRadius:100 }}>{fontSize}px</span>
              </div>
            </div>

            {/* Paper */}
            <div
              ref={previewRef}
              style={{
                width:"100%",
                maxWidth: previewW,
                height: previewH,
                background:"#fff",
                borderRadius:4,
                boxShadow:"0 6px 32px rgba(0,0,0,.14)",
                overflow:"hidden",
              }}
            >
              <LetterPreview
                template={template}
                color={a}
                fontSize={fontSize}
                data={data}
                pageSize={pageSize}
              />
            </div>

            {/* Footer note */}
            <div style={{ marginTop:16, fontSize:11, color:"#94a3b8", textAlign:"center" }}>
              Watermark removed in downloaded version · {PAGE_SIZES[pageSize].w} × {PAGE_SIZES[pageSize].h}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
