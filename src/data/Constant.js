// Compatibility shim:
// Some imports (or cached dev-server requests) may reference `src/data/Constant.js`.
// The source of truth lives in `Constant.jsx` (it exports both tokens + JSX components).
export * from "./Constant.jsx";

