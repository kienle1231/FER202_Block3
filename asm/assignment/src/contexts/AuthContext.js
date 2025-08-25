import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const BASE_URL = 'http://localhost:3001';

export const AuthContext = createContext({
  user: null,
  redirectAfterLogin: '/',
  login: async () => {},
  logout: () => {},
  register: async () => {},
  setRedirectAfterLogin: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState('/');

  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${BASE_URL}/accounts?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    if (!res.ok) throw new Error('Login failed');
    const accounts = await res.json();
    const found = accounts[0];
    if (!found) throw new Error('Invalid email or password');
    setUser({ id: found.id, name: found.name || found.username, email: found.email });
    return found;
  }, []);

  const register = useCallback(async (data) => {
    // Lấy danh sách account để tính id kế tiếp
    const listRes = await fetch(`${BASE_URL}/accounts`);
    if (!listRes.ok) throw new Error('Fetch accounts failed');
    const accounts = await listRes.json();
    const maxId = accounts.reduce((m, a) => (a.id > m ? a.id : m), 0);
    const payload = {
      id: maxId + 1,
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password,
      question: data.question,
      answer: data.answer,
      avatar: data.avatar || '',
      wishlist: [],
    };
    const res = await fetch(`${BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Register failed');
    const created = await res.json();
    setUser({ id: created.id, name: created.name || created.username, email: created.email });
    return created;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    redirectAfterLogin,
    setRedirectAfterLogin,
    login,
    logout,
    register,
  }), [user, redirectAfterLogin, login, logout, register]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


