// ─────────────────────────────────────────────────────────────────────────────
// AllTemplates.jsx — Dashboard: grid of all saved templates
//
// Props:
//   templates[]         — array of saved template objects
//   onCreateNew()       — navigate to CreateTemplate
//   onView(template)    — open ViewTemplate for a specific template
//   onEdit(template)    — open CreateTemplate in edit mode
//   onDelete(id)        — delete a template by id
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import {
  COLORS, LAYOUTS, DOC_TYPES, FONTS_URL,
  LetterPreview, Sidebar,
} from "../../data/Constant";

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onCreateNew }) {
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"80px 40px", textAlign:"center",
    }}>
      <div style={{fontSize:64,marginBottom:20}}>📭</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:700,color:"#0d0d0f",marginBottom:8}}>
        No templates yet
      </div>
      <div style={{fontSize:15,color:"#7a7a8a",maxWidth:360,lineHeight:1.6,marginBottom:32}}>
        Create your first template and it will appear here. You can build as many as you need.
      </div>
      <button
        onClick={onCreateNew}
        style={{
          display:"flex",alignItems:"center",gap:8,
          padding:"13px 30px",borderRadius:12,
          background:"#0d0d0f",color:"white",
          fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,
          border:"none",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,.18)",
        }}
      >
        + Create First Template
      </button>
    </div>
  );
}

// ─── Single template card ─────────────────────────────────────────────────────
function TemplateCard({ template, onView, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hovered, setHovered] = useState(false);

  const accentHex = COLORS[template.design?.accentColor]?.hex || "#3b82f6";
  const docLabel  = DOC_TYPES[template.docType]?.label || template.docType;
  const layoutLabel = LAYOUTS[template.layout]?.label || template.layout;
  const dateStr = template.createdAt
    ? new Date(template.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })
    : "";

  return (
    <div
      style={{
        background:"white", borderRadius:16,
        border: hovered ? "1.5px solid rgba(99,102,241,.3)" : "1.5px solid rgba(0,0,0,.08)",
        overflow:"hidden", cursor:"pointer",
        transition:"all .2s",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,.1)" : "0 2px 8px rgba(0,0,0,.04)",
        transform: hovered ? "translateY(-3px)" : "none",
        position:"relative",
      }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>{setHovered(false);setMenuOpen(false);}}
    >
      {/* Thumbnail — clicks open viewer */}
      <div onClick={()=>onView(template)} style={{position:"relative"}}>
        <LetterPreview
          design={template.design}
          form={template.form}
          docType={template.docType}
          compact
        />
        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position:"absolute",inset:0,
            background:"rgba(0,0,0,.28)",
            display:"flex",alignItems:"center",justifyContent:"center",
            borderRadius:"0 0 0 0",
            transition:"opacity .2s",
          }}>
            <span style={{
              padding:"8px 20px",borderRadius:20,
              background:"white",color:"#0d0d0f",
              fontSize:13,fontWeight:700,
              boxShadow:"0 4px 12px rgba(0,0,0,.15)",
            }}>View →</span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div style={{padding:"14px 16px 16px"}}>
        {/* Accent dot + type */}
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:accentHex,flexShrink:0}}/>
          <span style={{fontSize:11,fontWeight:600,color:"#7a7a8a",textTransform:"uppercase",letterSpacing:.7}}>
            {docLabel}
          </span>
        </div>

        {/* Name */}
        <div style={{
          fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:"#0d0d0f",
          marginBottom:6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
        }}>
          {template.name}
        </div>

        {/* Meta row */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",gap:8}}>
            <span style={{fontSize:11,color:"#7a7a8a",background:"#f5f4f1",padding:"2px 8px",borderRadius:99}}>{layoutLabel}</span>
            <span style={{fontSize:11,color:"#7a7a8a",background:"#f5f4f1",padding:"2px 8px",borderRadius:99}}>{dateStr}</span>
          </div>
        </div>

        {/* Action row */}
        <div style={{display:"flex",gap:8,position:"relative"}}>
          <button
            onClick={()=>onView(template)}
            style={{
              flex:1, padding:"8px 0", borderRadius:8,
              background:"#0d0d0f",color:"white",
              fontSize:12,fontWeight:600, border:"none",cursor:"pointer",
              transition:"background .15s",
            }}
            onMouseEnter={e=>e.currentTarget.style.background="#1a1a2e"}
            onMouseLeave={e=>e.currentTarget.style.background="#0d0d0f"}
          >
            Open →
          </button>
          <button
            onClick={()=>onEdit(template)}
            style={{
              padding:"8px 14px", borderRadius:8,
              border:"1px solid rgba(0,0,0,.12)", background:"white",
              color:"#3a3a45", fontSize:12,fontWeight:500, cursor:"pointer",
            }}
          >
            ✏ Edit
          </button>
          {/* ⋮ menu */}
          <div style={{position:"relative"}}>
            <button
              onClick={(e)=>{e.stopPropagation();setMenuOpen(v=>!v);setConfirmDelete(false);}}
              style={{
                padding:"8px 10px",borderRadius:8,
                border:"1px solid rgba(0,0,0,.12)",background:"white",
                color:"#3a3a45",fontSize:16,cursor:"pointer",lineHeight:1,
              }}
            >⋮</button>

            {menuOpen && (
              <div style={{
                position:"absolute",right:0,bottom:"calc(100% + 6px)",
                background:"white",border:"1px solid rgba(0,0,0,.1)",
                borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,.12)",
                padding:6,minWidth:160,zIndex:50,
              }}
                onClick={e=>e.stopPropagation()}
              >
                {!confirmDelete ? (
                  <>
                    <MenuItem icon="👁" label="View" onClick={()=>{setMenuOpen(false);onView(template);}}/>
                    <MenuItem icon="✏" label="Edit"  onClick={()=>{setMenuOpen(false);onEdit(template);}}/>
                    <MenuItem icon="🖨" label="Print" onClick={()=>{setMenuOpen(false);window.print();}}/>
                    <div style={{height:1,background:"rgba(0,0,0,.06)",margin:"4px 0"}}/>
                    <MenuItem icon="🗑" label="Delete" onClick={()=>setConfirmDelete(true)} danger/>
                  </>
                ) : (
                  <div style={{padding:"8px 10px"}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#0d0d0f",marginBottom:10}}>
                      Delete this template?
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>{setMenuOpen(false);setConfirmDelete(false);onDelete(template.id);}}
                        style={{flex:1,padding:"6px 0",borderRadius:7,background:"#ef4444",color:"white",fontSize:12,fontWeight:600,border:"none",cursor:"pointer"}}>
                        Yes, delete
                      </button>
                      <button onClick={()=>setConfirmDelete(false)}
                        style={{flex:1,padding:"6px 0",borderRadius:7,border:"1px solid rgba(0,0,0,.12)",background:"white",color:"#3a3a45",fontSize:12,cursor:"pointer"}}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:"flex",alignItems:"center",gap:9,width:"100%",padding:"7px 10px",
        borderRadius:7,border:"none",background:hov?(danger?"#fef2f2":"#f5f4f1"):"transparent",
        color:danger?"#ef4444":"#3a3a45",fontSize:13,cursor:"pointer",textAlign:"left",
      }}>
      <span>{icon}</span>{label}
    </button>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ templates }) {
  const byType = useMemo(()=>{
    const counts = {};
    templates.forEach(t=>{ counts[t.docType]=(counts[t.docType]||0)+1; });
    return counts;
  },[templates]);

  return (
    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:28}}>
      <StatCard icon="📋" label="Total Templates" value={templates.length} color="#6366f1"/>
      {Object.entries(byType).map(([type,count])=>(
        <StatCard key={type} icon={DOC_TYPES[type]?.icon||"📄"} label={DOC_TYPES[type]?.label||type} value={count} color="#14b8a6"/>
      ))}
    </div>
  );
}
function StatCard({ icon, label, value, color }) {
  return (
    <div style={{background:"white",border:"1px solid rgba(0,0,0,.08)",borderRadius:12,padding:"14px 20px",display:"flex",alignItems:"center",gap:12,minWidth:140}}>
      <div style={{width:36,height:36,borderRadius:8,background:`${color}1a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{icon}</div>
      <div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:"#0d0d0f"}}>{value}</div>
        <div style={{fontSize:11,color:"#7a7a8a",fontWeight:500,marginTop:1}}>{label}</div>
      </div>
    </div>
  );
}

// ─── Filter chips ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = ["Newest","Oldest","A → Z","Z → A"];

function FilterBar({ search, setSearch, filterType, setFilterType, sortBy, setSortBy }) {
  return (
    <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginBottom:24}}>
      {/* Search */}
      <div style={{position:"relative",flex:"1 1 220px",maxWidth:340}}>
        <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#7a7a8a"}}>🔍</span>
        <input
          placeholder="Search templates…"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={{
            width:"100%",padding:"9px 13px 9px 34px",
            border:"1px solid rgba(0,0,0,.12)",borderRadius:9,
            fontSize:13,color:"#0d0d0f",background:"white",outline:"none",
            fontFamily:"'DM Sans',sans-serif",
          }}
        />
      </div>

      {/* Type filter */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {["all",...Object.keys(DOC_TYPES)].map(k=>(
          <button key={k} onClick={()=>setFilterType(k)} style={{
            padding:"7px 13px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",border:"1.5px solid",
            borderColor: filterType===k ? "#6366f1" : "rgba(0,0,0,.1)",
            background:  filterType===k ? "#eef2ff" : "white",
            color:       filterType===k ? "#4338ca" : "#3a3a45",
          }}>
            {k==="all" ? "All Types" : DOC_TYPES[k]?.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e=>setSortBy(e.target.value)}
        style={{
          padding:"8px 12px",borderRadius:9,border:"1px solid rgba(0,0,0,.12)",
          fontSize:13,color:"#3a3a45",background:"white",cursor:"pointer",outline:"none",
          fontFamily:"'DM Sans',sans-serif",
        }}
      >
        {SORT_OPTIONS.map(s=><option key={s}>{s}</option>)}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AllTemplates — main export
// ─────────────────────────────────────────────────────────────────────────────
export default function AllTemplates({ templates, onCreateNew, onView, onEdit, onDelete }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("all");
  const [sortBy,      setSortBy]      = useState("Newest");

  // Derived list
  const filtered = useMemo(() => {
    let list = [...templates];

    // filter by type
    if (filterType !== "all") list = list.filter(t => t.docType === filterType);

    // search by name, company, subject
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.name?.toLowerCase().includes(q) ||
        t.form?.company?.toLowerCase().includes(q) ||
        t.form?.subject?.toLowerCase().includes(q)
      );
    }

    // sort
    if (sortBy === "Newest") list.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt));
    if (sortBy === "Oldest") list.sort((a,b) => new Date(a.createdAt)-new Date(b.createdAt));
    if (sortBy === "A → Z")  list.sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === "Z → A")  list.sort((a,b) => b.name.localeCompare(a.name));

    return list;
  }, [templates, search, filterType, sortBy]);

  return (
    <div style={{
      display:"flex", minHeight:"100vh",
      fontFamily:"'DM Sans',sans-serif", background:"#f5f4f1",
    }}>
      <link href={FONTS_URL} rel="stylesheet" />

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={()=>setSidebarCollapsed(v=>!v)}
        activeView="all"
        onNav={(view)=>{ if(view==="create") onCreateNew(); }}
      />

      {/* Main content */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* Top header */}
        <div style={{
          background:"white",borderBottom:"1px solid rgba(0,0,0,.08)",
          padding:"16px 36px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          position:"sticky",top:0,zIndex:10,
        }}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#0d0d0f"}}>
              My Templates
            </div>
            <div style={{fontSize:13,color:"#7a7a8a",marginTop:2}}>
              {templates.length} template{templates.length!==1?"s":""} in your library
            </div>
          </div>
          <button
            onClick={onCreateNew}
            style={{
              display:"flex",alignItems:"center",gap:8,
              padding:"10px 22px",borderRadius:10,
              background:"#0d0d0f",color:"white",
              fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,
              border:"none",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.18)",
              transition:"all .15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,.2)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.18)";}}
          >
            + New Template
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{flex:1,overflowY:"auto",padding:"32px 36px"}}>

          {/* Stats */}
          {templates.length > 0 && <StatsBar templates={templates} />}

          {/* Filter bar */}
          {templates.length > 0 && (
            <FilterBar
              search={search}      setSearch={setSearch}
              filterType={filterType} setFilterType={setFilterType}
              sortBy={sortBy}      setSortBy={setSortBy}
            />
          )}

          {/* Grid or empty state */}
          {filtered.length === 0 && templates.length > 0 ? (
            <div style={{textAlign:"center",padding:"60px 0",color:"#7a7a8a"}}>
              <div style={{fontSize:40,marginBottom:12}}>🔍</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:"#0d0d0f",marginBottom:6}}>No results found</div>
              <div style={{fontSize:14}}>Try a different search or filter</div>
            </div>
          ) : templates.length === 0 ? (
            <EmptyState onCreateNew={onCreateNew} />
          ) : (
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",
              gap:20,
            }}>
              {/* "Create new" card */}
              <button
                onClick={onCreateNew}
                style={{
                  border:"2px dashed rgba(0,0,0,.14)",borderRadius:16,
                  background:"white",cursor:"pointer",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                  padding:"48px 24px",gap:12,
                  transition:"all .18s",minHeight:320,
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.background="#fafafe";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,.14)";e.currentTarget.style.background="white";}}
              >
                <div style={{width:48,height:48,borderRadius:12,background:"#f5f4f1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>＋</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:"#0d0d0f"}}>New Template</div>
                <div style={{fontSize:13,color:"#7a7a8a",textAlign:"center",lineHeight:1.5}}>Create a new document<br/>from scratch</div>
              </button>

              {filtered.map(t => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}