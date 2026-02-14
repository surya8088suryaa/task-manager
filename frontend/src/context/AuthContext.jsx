import React, { createContext, useContext, useMemo, useState } from "react";
import { clearAuth, getAuth, setAuth } from "src/utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const existing = getAuth();

  const [token, setToken] = useState(existing?.token || null);
  const [user, setUser] = useState(existing?.user || null);

  const isAuthenticated = Boolean(token);

  const login = ({ token: t, user: u }) => {
    setToken(t);
    setUser(u);
    setAuth({ token: t, user: u });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated, login, logout }),
    [token, user, isAuthenticated],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must have AuthProvider");
  return ctx;
};
