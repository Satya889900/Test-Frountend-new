import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ─── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({ baseURL: BASE_URL });

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-redirect on 401 Unauthorized
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ─── AUTH ─────────────────────────────────────────────────────────────────────

/**
 * Register a new user
 * @param {{ name: string, email: string, password: string }} data
 */
export const registerUser = (data) =>
  api.post("/api/users/register", data).then((r) => r.data);

/**
 * Login a user
 * @param {{ email: string, password: string }} data
 */
export const loginUser = (data) =>
  api.post("/api/users/login", data).then((r) => r.data);

// ─── PROFILE ──────────────────────────────────────────────────────────────────

/**
 * Get logged-in user's profile
 * Requires: token in localStorage
 */
export const getUserProfile = () =>
  api.get("/api/users/profile").then((r) => r.data);

/**
 * Update user profile (all fields optional)
 * @param {{ name?: string, email?: string, password?: string }} data
 */
export const updateUserProfile = (data) =>
  api.put("/api/users/profile", data).then((r) => r.data);

// ─── RESUME ───────────────────────────────────────────────────────────────────

/**
 * Upload a new resume (PDF/DOC/DOCX/XLS/XLSX)
 * @param {File} file - The file from <input type="file">
 */
export const createResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return api
    .post("/api/users/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
};

/**
 * Get current user's resume info
 */
export const getResume = () =>
  api.get("/api/users/resume").then((r) => r.data);

/**
 * Replace / update existing resume with a new file
 * @param {File} file - The new file from <input type="file">
 */
export const updateResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return api
    .put("/api/users/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
};

/**
 * Delete the current user's resume
 */
export const deleteResume = () =>
  api.delete("/api/users/resume").then((r) => r.data);

/**
 * Get a signed download URL for the resume
 */
export const downloadResume = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/users/resume/download`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Download failed");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  
  let filename = "resume";
  const contentDisposition = response.headers.get("content-disposition");
  if (contentDisposition && contentDisposition.includes("filename=")) {
    filename = contentDisposition.split("filename=")[1].replace(/["']/g, "");
  }

  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export default api;
