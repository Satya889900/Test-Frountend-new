const fs = require('fs');
let content = fs.readFileSync('src/pages/BusinessLetter/EditorPage.jsx', 'utf8');

content = content.replace(
  'import { useNavigate, useParams } from "react-router-dom";',
  'import { useNavigate, useLocation } from "react-router-dom";'
);

content = content.replace(
  'const { templateId } = useParams();',
  'const location = useLocation();\n  const templateState = location.state || {};\n  const templateId = templateState.id || "min-clean";'
);

content = content.replace(
  '<div style={{ display:"grid", gridTemplateColumns:"minmax(320px,420px) 1fr", minHeight:"calc(100vh - 66px)" }}>',
  '<div style={{ display:"flex", justifyContent:"center", minHeight:"calc(100vh - 66px)", background:"#f8fafc" }}>\n<div style={{ width:"100%", maxWidth:600 }}>'
);

content = content.replace(
  /\{\/\* ── PREVIEW PANE ──────────────────────────────────────────── \*\/\}[\s\S]*?(?=<\/div>\n\s*<\/div>\n\s*<\/>)/,
  '<!-- preview removed -->'
); 

content = content.replace(
  /onClick=\{handlePrint\}[\s\S]*?Download PDF ↗/g,
  'onClick={() => navigate("/preview", { state: { formData: data, template, accentColor, pageSize, fontSize } })}\n                  style={{ padding:"8px 20px", borderRadius:9, border:"none", background:a, color:"#fff", fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>\n                  Preview Letter →'
);

fs.writeFileSync('src/pages/BusinessLetter/EditorPage.jsx', content);
console.log('Done refactoring EditorPage');
