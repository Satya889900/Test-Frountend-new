const fs = require('fs');
let content = fs.readFileSync('src/pages/BusinessLetter/PreviewPage.jsx', 'utf8');

// 1. Imports
content = content.replace(
  'import { useNavigate, useParams } from "react-router-dom";',
  'import { useNavigate, useLocation } from "react-router-dom";'
);

// 2. Component Name and State Init
content = content.replace(
  'export default function BusinessLetterEditor() {',
  'export default function PreviewPage() {'
);

const stateInit = `
  const location = useLocation();
  const { formData = EMPTY, template: stateTemplate, accentColor: stateAccentColor, pageSize: statePageSize, fontSize: stateFontSize } = location.state || {};
  
  const template = stateTemplate || LETTER_TEMPLATES[0];
  const a = stateAccentColor || template.color;
  
  const [data, setData] = useState(formData);
  const [accentColor, setAccentColor] = useState(stateAccentColor);
  const [pageSize, setPageSize] = useState(statePageSize || "A4");
  const [fontSize, setFontSize] = useState(stateFontSize || 13);
`;

content = content.replace(
  /const \{ templateId \} = useParams\(\);[\s\S]*?const a = accentColor \|\| template\.color;/,
  stateInit
);

// Remove the loading token check if it interferes, or rewrite the header correctly.
// Let's just remove the form pane (LEFT CONTENT) completely.
// The form pane starts with <div style={{ background:"#fff", borderRight:"1px solid #f1f5f9", display:"flex", flexDirection:"column", height:"calc(100vh - 66px)", overflow:"hidden" }}>
// and ends right before {/* ── PREVIEW PANE ──────────────────────────────────────────── */}

content = content.replace(
  /<div style=\{\{\s*background:"#fff",\s*borderRight:"1px solid #f1f5f9"[\s\S]*?(?=\{\/\* ── PREVIEW PANE)/,
  ''
);

// The grid currently is <div style={{ display:"grid", gridTemplateColumns:"minmax(320px,420px) 1fr", minHeight:"calc(100vh - 66px)" }}>
// Change to flex center
content = content.replace(
  '<div style={{ display:"grid", gridTemplateColumns:"minmax(320px,420px) 1fr", minHeight:"calc(100vh - 66px)" }}>',
  '<div style={{ display:"flex", justifyContent:"center", minHeight:"calc(100vh - 66px)" }}>'
);

// The "Back to Templates" button in header -> "Back to Edit"
content = content.replace(
  'onClick={() => navigate("/letter-builder")}',
  'onClick={() => navigate(-1)}'
);

content = content.replace(
  '← Templates',
  '← Edit Letter'
);

// The Preview pane styling -> make it full width or contained.
content = content.replace(
  '<div style={{ background:"#dde3ef", padding:28, overflowY:"auto", display:"flex", flexDirection:"column", alignItems:"center" }}>',
  '<div style={{ width: "100%", background:"#dde3ef", padding:28, overflowY:"auto", display:"flex", flexDirection:"column", alignItems:"center" }}>'
);

fs.writeFileSync('src/pages/BusinessLetter/PreviewPage.jsx', content);
console.log("Refactored PreviewPage!");
