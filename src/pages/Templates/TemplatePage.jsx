// ─────────────────────────────────────────────────────────────────────────────
// CreateTemplate.jsx — 3-step template creation wizard
//
// Props:
//   onSave(templateObject)  — called when user saves; receives the full template
//   onCancel()              — called when user cancels / goes back to dashboard
//   initialData             — optional, for editing an existing template
//
// Step 1 → Choose doc type, layout, accent colour
// Step 2 → Fill form details + customise design (split-screen with live preview)
// Step 3 → Review summary + save
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  COLORS, LAYOUTS, DOC_TYPES,
  BORDER_STYLES, BORDER_WEIGHTS, BORDER_PLACEMENTS,
  SHAPE_TYPES, SHAPE_OPACITIES, SHAPE_OPACITY_LABELS,
  HEADING_FONTS, BODY_FONTS, HEADING_FONT_NAMES, BODY_FONT_NAMES,
  FONTS_URL, DEFAULT_DESIGN, DEFAULT_FORM, PALETTE,
  validateField, isFormComplete, formProgress, uid, formFieldsFor,
  LetterPreview, Chip, Row, SectionHead, StepRail,
} from "../../data/Constant";

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Choose Template
// ─────────────────────────────────────────────────────────────────────────────
function StepChoose({ state, setState, onNext }) {
  const set = (key, val) => setState((s) => ({ ...s, [key]: val }));
  const setDesign = (key, val) =>
    setState((s) => ({ ...s, design: { ...s.design, [key]: val } }));

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "40px 56px" }}>
      {/* Hero */}
      <div style={{
        display:"inline-flex",alignItems:"center",gap:6,
        padding:"6px 14px",borderRadius:99,
        background:"#f5f4f1",border:"1px solid rgba(0,0,0,.12)",
        fontSize:12,color:"#3a3a45",marginBottom:20,fontWeight:500,
      }}>✦ Step 1 of 3</div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:"#0d0d0f",lineHeight:1.1,marginBottom:8}}>
        Choose Your Template
      </h1>
      <p style={{fontSize:15,color:"#7a7a8a",maxWidth:500,lineHeight:1.6,marginBottom:44}}>
        Select a document type, layout style, and accent colour. You'll customise everything next.
      </p>

      {/* ── Document Type ── */}
      <div style={{ marginBottom: 44 }}>
        <SectionHead icon="📄" bg="#dbeafe" title="Document Type" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {Object.entries(DOC_TYPES).map(([k, v]) => (
            <button
              key={k}
              onClick={() => set("docType", k)}
              style={{
                border:      state.docType === k ? "1.5px solid #6366f1" : "1.5px solid rgba(0,0,0,.08)",
                borderRadius: 16, padding:"18px 20px",
                background:  state.docType === k ? "#fafafe" : "white",
                cursor:"pointer", textAlign:"left", transition:"all .18s",
                boxShadow: state.docType === k ? "0 0 0 3px rgba(99,102,241,.12)" : "none",
                position:"relative",
              }}
            >
              <div style={{fontSize:28,marginBottom:10}}>{v.icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#0d0d0f",marginBottom:3}}>{v.label}</div>
              <div style={{fontSize:12,color:"#7a7a8a"}}>{v.desc}</div>
              {state.docType === k && (
                <div style={{position:"absolute",top:12,right:12,width:20,height:20,background:"#6366f1",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"white"}}>✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Layout Style ── */}
      <div style={{ marginBottom: 44 }}>
        <SectionHead icon="⊞" bg="#ede9fe" title="Layout Style" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {Object.entries(LAYOUTS).map(([k, v]) => (
            <button
              key={k}
              onClick={() => set("layout", k)}
              style={{
                border:      state.layout === k ? "1.5px solid #6366f1" : "1.5px solid rgba(0,0,0,.08)",
                borderRadius: 12, padding:"18px 12px",
                background:  state.layout === k ? "#fafafe" : "white",
                cursor:"pointer", textAlign:"center", transition:"all .18s",
                boxShadow: state.layout === k ? "0 0 0 3px rgba(99,102,241,.12)" : "none",
                position:"relative",
              }}
            >
              <div style={{fontSize:26,marginBottom:8}}>{v.emoji}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#0d0d0f",marginBottom:2}}>{v.label}</div>
              <div style={{fontSize:11,color:"#7a7a8a"}}>{v.desc}</div>
              {state.layout === k && (
                <div style={{position:"absolute",top:8,right:8,width:16,height:16,background:"#6366f1",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"white"}}>✓</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Accent Colour ── */}
      <div style={{ marginBottom: 44 }}>
        <SectionHead icon="🎨" bg="#ffedd5" title="Accent Colour" />
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {Object.entries(COLORS).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setDesign("accentColor", k)}
              style={{
                display:"flex",flexDirection:"column",alignItems:"center",gap:7,
                padding:"10px 16px",borderRadius:12,border:"1.5px solid",
                borderColor:  state.design.accentColor === k ? "#0d0d0f" : "transparent",
                background:   state.design.accentColor === k ? "#f5f4f1"  : "white",
                cursor:"pointer",transition:"all .15s",
              }}
            >
              <div style={{
                width:36,height:36,borderRadius:"50%",background:v.hex,
                boxShadow: state.design.accentColor === k ? `0 0 0 3px ${v.hex}44` : "none",
              }}/>
              <div style={{fontSize:11,color:"#3a3a45",fontWeight:500}}>{v.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display:"flex", justifyContent:"flex-end", paddingBottom:40 }}>
        <button
          onClick={onNext}
          style={{
            display:"flex",alignItems:"center",gap:8,
            padding:"13px 36px",borderRadius:12,
            background:"#0d0d0f",color:"white",
            fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,
            border:"none",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,.2)",
            transition:"transform .15s",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
        >
          Continue to Editor ›
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Edit Details + Design (split-screen)
// ─────────────────────────────────────────────────────────────────────────────
function StepEditor({ state, setState, onBack, onNext }) {
  const [designTab, setDesignTab] = useState("border");
  const [errors, setErrors] = useState({});
  const [showDetails, setShowDetails] = useState(true);

  const accentHex = COLORS[state.design.accentColor]?.hex || "#3b82f6";

  const setForm = (k, v) =>
    setState((s) => ({ ...s, form: { ...s.form, [k]: v } }));

  const setDesign = (k, v) =>
    setState((s) => ({ ...s, design: { ...s.design, [k]: v } }));

  const handleFieldChange = (k, v) => {
    setState((s) => {
      const nextForm = { ...s.form, [k]: v };

      // Back-compat + shared preview keys
      if (s.docType === "resume") {
        if (k === "fullName") nextForm.company = v;
        if (k === "email") nextForm.receiver = v;
        if (k === "phone") nextForm.subject = v;
      }
      if (s.docType === "invoice") {
        if (k === "businessName") nextForm.company = v;
        if (k === "clientName") {
          nextForm.billTo = v;
          nextForm.receiver = v;
        }
        if (k === "clientAddress") nextForm.billToAddress = v;
      }

      return { ...s, form: nextForm };
    });
    setErrors((prev) => ({ ...prev, [k]: validateField(k, v, state.docType) }));
  };

  const progress = formProgress(state.form, state.docType);
  const canProceed = true;

  const FORM_FIELDS = formFieldsFor(state.docType);

  const handleImageField = (k, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(k, reader.result);
    reader.readAsDataURL(file);
  };

  const handleDesignImage = (k, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDesign(k, reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", overflow:"hidden", minHeight:0 }}>

      {/* ── LEFT: Form + Design panel ── */}
      <div style={{ overflowY:"auto", padding:"28px 32px", borderRight:"1px solid rgba(0,0,0,.08)" }}>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#0d0d0f"}}>
            Editor
          </div>
          <button
            onClick={() => setShowDetails((v) => !v)}
            style={{
              padding:"7px 12px",
              borderRadius:10,
              border:"1px solid rgba(0,0,0,.12)",
              background:"white",
              color:"#3a3a45",
              fontSize:12,
              fontWeight:700,
              cursor:"pointer",
            }}
          >
            {showDetails ? "Hide Fields" : "Show Fields"}
          </button>
        </div>

        {showDetails && (
          <>
        {/* Completion bar */}
        <div style={{background:"white",border:"1px solid rgba(0,0,0,.08)",borderRadius:12,padding:"14px 20px",marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
            <span style={{fontSize:13,fontWeight:500,color:"#3a3a45"}}>Form Completion</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:"#0d0d0f"}}>{progress}%</span>
          </div>
          <div style={{height:6,background:"#eeede8",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:accentHex,borderRadius:3,transition:"width .4s ease"}}/>
          </div>
        </div>

        {/* Form card */}
        <div style={{background:"white",border:"1px solid rgba(0,0,0,.08)",borderRadius:16,padding:"24px",marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,color:"#0d0d0f",marginBottom:4}}>Document Details</div>
          <div style={{fontSize:13,color:"#7a7a8a",marginBottom:22}}>Fill all required fields to proceed</div>

          {FORM_FIELDS.map((f) => (
            (f.key === "profileImage" && !state.form.includeProfileImage) ? null :
            (f.key === "logoImage" && !state.form.includeLogo) ? null :
            <div key={f.key} style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:13,fontWeight:500,color:"#3a3a45",marginBottom:6}}>
                {f.label} {f.required && <span style={{color:"#ef4444"}}>*</span>}
                {f.hint && <span style={{fontSize:11,color:"#7a7a8a",marginLeft:8}}>{f.hint}</span>}
              </label>
              {f.type === "toggle" ? (
                <label style={{display:"flex",alignItems:"center",gap:10,fontSize:13,color:"#3a3a45",userSelect:"none"}}>
                  <input
                    type="checkbox"
                    checked={!!state.form[f.key]}
                    onChange={(e) => handleFieldChange(f.key, e.target.checked)}
                    style={{width:18,height:18,accentColor:accentHex}}
                  />
                  <span>{state.form[f.key] ? "Enabled" : "Disabled"}</span>
                </label>
              ) : f.type === "image" ? (
                <div style={{display:"grid",gap:10}}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageField(f.key, e.target.files?.[0])}
                    style={{fontSize:12}}
                  />
                  <input
                    placeholder="or paste image URL"
                    value={state.form[f.key] ?? ""}
                    onChange={(e) => handleFieldChange(f.key, e.target.value)}
                    style={{
                      width:"100%", padding:"10px 12px",
                      border:"1.5px solid rgba(0,0,0,.12)",
                      borderRadius:10, fontSize:13, background:"white", outline:"none",
                      fontFamily:"'DM Sans',sans-serif",
                    }}
                  />
                  {state.form[f.key] && (
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
                      <img
                        src={state.form[f.key]}
                        alt="preview"
                        style={{width:46,height:46,borderRadius:12,objectFit:"cover",border:"1px solid rgba(0,0,0,.12)"}}
                      />
                      <div style={{fontSize:12,color:"#7a7a8a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        Image selected
                      </div>
                      </div>
                      <button
                        onClick={() => setForm(f.key, "")}
                        style={{
                          padding:"8px 12px",
                          borderRadius:10,
                          border:"1px solid rgba(0,0,0,.12)",
                          background:"white",
                          color:"#3a3a45",
                          fontSize:12,
                          fontWeight:700,
                          cursor:"pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ) : f.type === "textarea" ? (
                <textarea
                  placeholder={f.ph}
                  value={state.form[f.key] ?? ""}
                  rows={f.rows ?? (f.key === "items" ? 5 : 6)}
                  onChange={(e) => handleFieldChange(f.key, e.target.value)}
                  style={{
                    width:"100%", padding:"10px 13px",
                    border:`1.5px solid ${errors[f.key] ? "#ef4444" : state.form[f.key] ? "#22c55e" : "rgba(0,0,0,.14)"}`,
                    borderRadius:9, fontSize:14, color:"#0d0d0f",
                    background:"white", outline:"none", resize:"vertical", lineHeight:1.6,
                    fontFamily:"'DM Sans',sans-serif",
                    transition:"border .2s",
                  }}
                />
              ) : (
                <input
                  type={f.type}
                  placeholder={f.ph}
                  value={state.form[f.key] ?? ""}
                  onChange={(e) => handleFieldChange(f.key, e.target.value)}
                  style={{
                    width:"100%", padding:"10px 13px",
                    border:`1.5px solid ${errors[f.key] ? "#ef4444" : state.form[f.key] ? "#22c55e" : "rgba(0,0,0,.14)"}`,
                    borderRadius:9, fontSize:14, color:"#0d0d0f",
                    background:"white", outline:"none",
                    fontFamily:"'DM Sans',sans-serif",
                    transition:"border .2s",
                  }}
                />
              )}
              {errors[f.key] && (
                <div style={{fontSize:12,color:"#ef4444",marginTop:4}}>⚠ {errors[f.key]}</div>
              )}
              {!errors[f.key] && state.form[f.key] && (
                <div style={{fontSize:12,color:"#16a34a",marginTop:4}}>✓ Looks good!</div>
              )}
            </div>
          ))}

          {/* Body textarea (legacy: handled via FORM_FIELDS) */}
          {false && (
          <div style={{marginBottom:8}}>
            <label style={{display:"block",fontSize:13,fontWeight:500,color:"#3a3a45",marginBottom:6}}>
              Message Body <span style={{color:"#ef4444"}}>*</span>
              <span style={{fontSize:11,color:"#7a7a8a",marginLeft:8}}>min. 10 characters</span>
            </label>
            <textarea
              placeholder="Write your message here…"
              value={state.form.body}
              rows={6}
              onChange={(e) => handleFieldChange("body", e.target.value)}
              style={{
                width:"100%", padding:"10px 13px",
                border:`1.5px solid ${errors.body ? "#ef4444" : state.form.body.length >= 10 ? "#22c55e" : "rgba(0,0,0,.14)"}`,
                borderRadius:9, fontSize:14, color:"#0d0d0f",
                background:"white", outline:"none", resize:"vertical", lineHeight:1.6,
                fontFamily:"'DM Sans',sans-serif",
              }}
            />
            {errors.body && <div style={{fontSize:12,color:"#ef4444",marginTop:4}}>⚠ {errors.body}</div>}
            {!errors.body && state.form.body.length >= 10 && (
              <div style={{fontSize:12,color:"#16a34a",marginTop:4}}>✓ Looks good!</div>
            )}
          </div>
          )}
        </div>
          </>
        )}

        {/* ── Design panel ── */}
        <div style={{background:"white",border:"1px solid rgba(0,0,0,.08)",borderRadius:16,padding:"24px",marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,color:"#0d0d0f",marginBottom:16}}>
            🎨 Design Customisation
          </div>

          {/* Tab bar */}
          <div style={{display:"flex",gap:4,marginBottom:22,background:"#f5f4f1",padding:4,borderRadius:10}}>
            {["border","shapes","colours","bg","font"].map((t) => (
              <button
                key={t}
                onClick={() => setDesignTab(t)}
                style={{
                  flex:1, padding:"7px 0", borderRadius:7, border:"none", cursor:"pointer",
                  fontSize:12, fontWeight:600,
                  background: designTab === t ? "white" : "transparent",
                  color:      designTab === t ? "#0d0d0f" : "#7a7a8a",
                  boxShadow:  designTab === t ? "0 1px 4px rgba(0,0,0,.1)" : "none",
                  transition:"all .2s",
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Border tab */}
          {designTab === "border" && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Row label="Style">
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {BORDER_STYLES.map((s) => (
                    <Chip key={s} active={state.design.borderStyle===s} onClick={()=>setDesign("borderStyle",s)}>{s}</Chip>
                  ))}
                </div>
              </Row>
              {state.design.borderStyle !== "none" && (
                <>
                  <Row label="Weight">
                    {BORDER_WEIGHTS.map((w) => (
                      <Chip key={w} active={state.design.borderWeight===w} onClick={()=>setDesign("borderWeight",w)}>{w}</Chip>
                    ))}
                  </Row>
                  <Row label="Placement">
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {BORDER_PLACEMENTS.map((p) => (
                        <Chip key={p} active={state.design.borderPlacement===p} onClick={()=>setDesign("borderPlacement",p)}>{p}</Chip>
                      ))}
                    </div>
                  </Row>
                  <Row label="Colour">
                    <input type="color" value={state.design.borderColor}
                      onChange={(e)=>setDesign("borderColor",e.target.value)}
                      style={{width:40,height:30,borderRadius:6,border:"1px solid rgba(0,0,0,.12)",cursor:"pointer",padding:2}}/>
                    <span style={{fontSize:12,color:"#7a7a8a"}}>{state.design.borderColor}</span>
                  </Row>
                  <Row label="Corners">
                    <input type="range" min={0} max={24} value={state.design.cornerRadius}
                      onChange={(e)=>setDesign("cornerRadius",+e.target.value)}
                      style={{width:110,accentColor:accentHex}}/>
                    <span style={{fontSize:12,color:"#7a7a8a"}}>{state.design.cornerRadius}px</span>
                  </Row>
                </>
              )}
            </div>
          )}

          {/* Shapes tab */}
          {designTab === "shapes" && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Row label="Shape">
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {SHAPE_TYPES.map((s) => (
                    <Chip key={s} active={state.design.shapeType===s} onClick={()=>setDesign("shapeType",s)}>{s}</Chip>
                  ))}
                </div>
              </Row>
              {state.design.shapeType !== "none" && (
                <>
                  <Row label="Colour">
                    <input type="color" value={state.design.shapeColor}
                      onChange={(e)=>setDesign("shapeColor",e.target.value)}
                      style={{width:40,height:30,borderRadius:6,border:"1px solid rgba(0,0,0,.12)",cursor:"pointer",padding:2}}/>
                  </Row>
                  <Row label="Opacity">
                    {SHAPE_OPACITY_LABELS.map((l, i) => (
                      <Chip key={l} active={state.design.shapeOpacity===SHAPE_OPACITIES[i]}
                        onClick={()=>setDesign("shapeOpacity",SHAPE_OPACITIES[i])}>{l}</Chip>
                    ))}
                  </Row>
                </>
              )}
            </div>
          )}

          {/* Colours tab */}
          {designTab === "colours" && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[
                ["Header Bg",   "headerBg"],
                ["Header Text", "headerText"],
                ["Body Bg",     "bodyBg"],
                ["Footer Bg",   "footerBg"],
                ["Divider",     "dividerColor"],
              ].map(([label, key]) => (
                <Row key={key} label={label}>
                  <input type="color" value={state.design[key]}
                    onChange={(e)=>setDesign(key,e.target.value)}
                    style={{width:40,height:30,borderRadius:6,border:"1px solid rgba(0,0,0,.12)",cursor:"pointer",padding:2}}/>
                  <span style={{fontSize:12,color:"#7a7a8a",fontFamily:"monospace"}}>{state.design[key]}</span>
                </Row>
              ))}
              <p style={{fontSize:12,color:"#7a7a8a",marginTop:4}}>
                💡 Each section can be a completely different colour.
              </p>
            </div>
          )}

          {/* Backgrounds tab */}
          {designTab === "bg" && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{fontSize:12,color:"#7a7a8a",lineHeight:1.5}}>
                Add background images for the full page, header, body, or footer. (Optional)
              </div>

              {[
                ["Page",   "pageBgImage",   "pageBgImageOpacity"],
                ["Header", "headerBgImage", "headerBgImageOpacity"],
                ["Body",   "bodyBgImage",   "bodyBgImageOpacity"],
                ["Footer", "footerBgImage", "footerBgImageOpacity"],
              ].map(([label, key, opKey]) => (
                <div key={key} style={{border:"1px solid rgba(0,0,0,.08)",borderRadius:14,padding:"14px 14px",background:"#fafafa"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:"#0d0d0f"}}>{label} Background</div>
                    {state.design[key] && (
                      <button
                        onClick={() => setDesign(key, "")}
                        style={{padding:"6px 10px",borderRadius:10,border:"1px solid rgba(0,0,0,.12)",background:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{display:"grid",gap:10}}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDesignImage(key, e.target.files?.[0])}
                      style={{fontSize:12}}
                    />
                    <input
                      placeholder="or paste image URL"
                      value={state.design[key] ?? ""}
                      onChange={(e) => setDesign(key, e.target.value)}
                      style={{
                        width:"100%", padding:"10px 12px",
                        border:"1.5px solid rgba(0,0,0,.12)",
                        borderRadius:10, fontSize:13, background:"white", outline:"none",
                        fontFamily:"'DM Sans',sans-serif",
                      }}
                    />
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:12,fontWeight:700,color:"#3a3a45",width:70}}>Opacity</span>
                      <input
                        type="range"
                        min={0}
                        max={0.6}
                        step={0.02}
                        value={state.design[opKey] ?? 0.2}
                        onChange={(e) => setDesign(opKey, +e.target.value)}
                        style={{flex:1, accentColor: accentHex}}
                      />
                      <span style={{fontSize:12,color:"#7a7a8a",width:42,textAlign:"right"}}>
                        {Math.round((state.design[opKey] ?? 0.2) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Font tab */}
          {designTab === "font" && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Row label="Heading">
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {HEADING_FONT_NAMES.map((n, i) => (
                    <Chip key={n} active={state.design.headingFont===i} onClick={()=>setDesign("headingFont",i)}>{n}</Chip>
                  ))}
                </div>
              </Row>
              <Row label="Body">
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {BODY_FONT_NAMES.map((n, i) => (
                    <Chip key={n} active={state.design.bodyFont===i} onClick={()=>setDesign("bodyFont",i)}>{n}</Chip>
                  ))}
                </div>
              </Row>
              <Row label="Size">
                <input type="range" min={14} max={36} value={state.design.headingSize}
                  onChange={(e)=>setDesign("headingSize",+e.target.value)}
                  style={{width:110,accentColor:accentHex}}/>
                <span style={{fontSize:12,color:"#7a7a8a"}}>{state.design.headingSize}px</span>
              </Row>
              <Row label="Alignment">
                {["left","center","right"].map((a) => (
                  <Chip key={a} active={state.design.textAlign===a} onClick={()=>setDesign("textAlign",a)}>{a}</Chip>
                ))}
              </Row>
              <Row label="Line Gap">
                <input type="range" min={1.2} max={2.5} step={0.1} value={state.design.lineSpacing}
                  onChange={(e)=>setDesign("lineSpacing",+e.target.value)}
                  style={{width:110,accentColor:accentHex}}/>
                <span style={{fontSize:12,color:"#7a7a8a"}}>{state.design.lineSpacing}×</span>
              </Row>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{display:"flex",gap:10,paddingBottom:32}}>
          <button onClick={onBack} style={{padding:"10px 20px",borderRadius:9,border:"1px solid rgba(0,0,0,.14)",background:"white",color:"#3a3a45",fontSize:13,fontWeight:500,cursor:"pointer"}}>
            ‹ Back
          </button>
          <button
            onClick={onNext}
            disabled={!canProceed}
            style={{
              flex:1, padding:"11px 20px", borderRadius:9, border:"none",
              background: canProceed ? "#0d0d0f" : "#d1d5db",
              color: "white", fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700,
              cursor: canProceed ? "pointer" : "not-allowed", transition:"all .2s",
            }}
          >
            Preview Document →
          </button>
        </div>
      </div>

      {/* ── RIGHT: Live preview ── */}
        <div style={{ overflowY:"auto", padding:"28px 32px", background:"#eeede8" }}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,fontSize:13,fontWeight:500,color:"#3a3a45"}}>
          <span>👁</span> Live Preview — updates as you type
        </div>
        {/* Window chrome dots */}
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {["#ef4444","#f59e0b","#22c55e"].map((c,i)=>(
            <div key={i} style={{width:10,height:10,borderRadius:"50%",background:c}}/>
          ))}
        </div>
        <LetterPreview design={state.design} form={state.form} docType={state.docType} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 3 — Preview & Save
// ─────────────────────────────────────────────────────────────────────────────
function StepPreviewSave({ state, onBack, onSave }) {
  const [name, setName] = useState(
    state.form.company ? `${state.form.company} — ${DOC_TYPES[state.docType]?.label}` : ""
  );
  const [nameError, setNameError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const accentHex = COLORS[state.design.accentColor]?.hex || "#3b82f6";

  const handleSave = () => {
    if (!name.trim()) { setNameError("Please give your template a name"); return; }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      onSave({
        id:        uid(),
        name:      name.trim(),
        docType:   state.docType,
        layout:    state.layout,
        design:    { ...state.design },
        form:      { ...state.form },
        createdAt: new Date().toISOString(),
      });
    }, 800);
  };

  const summaryRows = [
    ["Template Name", name || "—"],
    ["Document Type", DOC_TYPES[state.docType]?.label],
    ["Layout",        LAYOUTS[state.layout]?.label],
    ["Accent Colour", COLORS[state.design.accentColor]?.name],
  ];

  const previewForm =
    state.docType === "resume"
      ? { ...state.form, body: state.form.summary || state.form.body }
      : state.form;

  return (
    <div style={{ flex:1, display:"grid", gridTemplateColumns:"360px 1fr", overflow:"hidden", minHeight:0 }}>

      {/* ── LEFT: Summary + Save ── */}
      <div style={{ overflowY:"auto", padding:"28px 28px", borderRight:"1px solid rgba(0,0,0,.08)", background:"#f9f9f7" }}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:"#0d0d0f",marginBottom:4}}>
          Review & Save
        </div>
        <div style={{fontSize:13,color:"#7a7a8a",marginBottom:24}}>
          Name your template and save it to your library
        </div>

        {/* Template name input */}
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:13,fontWeight:600,color:"#3a3a45",marginBottom:7}}>
            Template Name <span style={{color:"#ef4444"}}>*</span>
          </label>
          <input
            value={name}
            onChange={(e)=>{setName(e.target.value);setNameError("");}}
            placeholder="e.g. Acme Corp Partnership Letter"
            style={{
              width:"100%", padding:"10px 13px",
              border:`1.5px solid ${nameError ? "#ef4444" : name ? "#22c55e" : "rgba(0,0,0,.14)"}`,
              borderRadius:9, fontSize:14, color:"#0d0d0f",
              background:"white", outline:"none", fontFamily:"'DM Sans',sans-serif",
            }}
          />
          {nameError && <div style={{fontSize:12,color:"#ef4444",marginTop:4}}>⚠ {nameError}</div>}
        </div>

        {/* Summary table */}
        <div style={{background:"white",borderRadius:14,overflow:"hidden",border:"1px solid rgba(0,0,0,.08)",marginBottom:20}}>
          {summaryRows.map(([l, v], i) => (
            <div key={l} style={{
              display:"flex", justifyContent:"space-between",
              padding:"11px 16px",
              borderBottom: i < summaryRows.length-1 ? "1px solid rgba(0,0,0,.05)" : "none",
              alignItems:"center",
            }}>
              <span style={{fontSize:11,color:"#7a7a8a",fontWeight:600,textTransform:"uppercase",letterSpacing:.6,flexShrink:0}}>{l}</span>
              <span style={{fontSize:13,fontWeight:600,color:"#0d0d0f",maxWidth:160,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v||"—"}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{display:"flex",flexDirection:"column",gap:10,paddingBottom:32}}>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            style={{
              padding:"13px 0", borderRadius:10,
              background: saved ? "#22c55e" : saving ? "#9ca3af" : accentHex,
              color:"white", fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700,
              border:"none", cursor: saved||saving ? "default" : "pointer", transition:"background .3s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}
          >
            {saving ? "⏳ Saving…" : saved ? "✓ Saved to Library!" : "💾 Save Template"}
          </button>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>window.print()} style={{flex:1,padding:"9px 0",borderRadius:9,border:"1px solid rgba(0,0,0,.14)",background:"white",color:"#3a3a45",fontSize:13,fontWeight:500,cursor:"pointer"}}>
              🖨 Print
            </button>
            <button
              onClick={()=>{
                const btn = document.getElementById("dl-btn");
                if(btn){btn.textContent="⏳";setTimeout(()=>{btn.textContent="⬇ PDF";alert("PDF export needs html2pdf.js or a server route.");},1500);}
              }}
              id="dl-btn"
              style={{flex:1,padding:"9px 0",borderRadius:9,background:"#0d0d0f",color:"white",fontSize:13,fontWeight:600,border:"none",cursor:"pointer"}}
            >
              ⬇ PDF
            </button>
          </div>
          <button onClick={onBack} style={{padding:"9px 0",borderRadius:9,border:"1px solid rgba(0,0,0,.08)",background:"transparent",color:"#7a7a8a",fontSize:13,cursor:"pointer"}}>
            ‹ Back to Editor
          </button>
        </div>

        {saved && (
          <div style={{padding:"12px 16px",borderRadius:10,background:"#dcfce7",border:"1px solid #bbf7d0",fontSize:13,color:"#15803d"}}>
            ✓ Template saved! You can find it in <b>My Templates</b>.
          </div>
        )}
      </div>

      {/* ── RIGHT: Full preview ── */}
      <div style={{ overflowY:"auto", padding:"28px 40px", background:"#eeede8" }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <div style={{fontSize:13,fontWeight:500,color:"#3a3a45"}}>📄 Final Preview</div>
          <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 12px",borderRadius:99,background:"#dcfce7",color:"#15803d",fontSize:12,fontWeight:500,border:"1px solid #bbf7d0"}}>
            ✓ Document Ready
          </div>
        </div>
        <div style={{boxShadow:"0 20px 60px rgba(0,0,0,.12)",borderRadius:18,overflow:"hidden"}}>
          <LetterPreview design={state.design} form={previewForm} docType={state.docType} />
        </div>
        <div style={{marginTop:16,padding:"12px 18px",background:"white",borderRadius:10,border:"1px solid rgba(0,0,0,.08)",fontSize:13,color:"#3a3a45",display:"flex",alignItems:"center",gap:10}}>
          <span>💡</span>
          <span><b>Pro tip:</b> Ctrl+P → Save as PDF exports this document directly from your browser.</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CreateTemplate — orchestrator
// ─────────────────────────────────────────────────────────────────────────────
export default function CreateTemplate({ onSave, onCancel, initialData }) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    docType: initialData?.docType  || "letter",
    layout:  initialData?.layout   || "modern",
    design:  initialData?.design   ? { ...initialData.design }  : { ...DEFAULT_DESIGN },
    form:    initialData?.form     ? { ...initialData.form }    : { ...DEFAULT_FORM },
  });

  return (
    <div style={{
      display:"flex", flexDirection:"column",
      minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", background:"#f5f4f1",
    }}>
      <link href={FONTS_URL} rel="stylesheet" />
      <StepRail step={step} />
      <div style={{flex:1,display:"flex",overflow:"hidden",minHeight:0}}>
        {step === 1 && (
          <StepChoose
            state={state}
            setState={setState}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepEditor
            state={state}
            setState={setState}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepPreviewSave
            state={state}
            onBack={() => setStep(2)}
            onSave={onSave}
          />
        )}
      </div>
    </div>
  );
}
