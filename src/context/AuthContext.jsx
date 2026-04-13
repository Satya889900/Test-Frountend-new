import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // { _id, name, email, resume }
  const [loading, setLoading] = useState(true); // fetching on mount

  // Fetch profile once on load if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    getUserProfile()
      .then(setUser)
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  /** Call after login / register to store token + set user */
  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  /** Clear everything on logout */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  /** Refresh user data from API (e.g. after profile update) */
  const refreshUser = () =>
    getUserProfile().then(setUser).catch(console.error);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
