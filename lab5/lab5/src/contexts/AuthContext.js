import React, { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }, [user]);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


