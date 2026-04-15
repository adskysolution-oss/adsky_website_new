'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  profileImage?: string;
  onboardingCompleted: boolean;
  progressPercentage?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, role: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem('token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return Boolean(localStorage.getItem('token'));
  });
  const router = useRouter();

  const fetchUser = useCallback(async (tk: string) => {
    try {
      const res = await authApi.get('/profile', {
        headers: { Authorization: `Bearer ${tk}` },
      });
      setUser(res.data);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setToken(null);
      setUser(null);
    }
  }, []);

  const hydrateUser = useCallback(async (tk: string) => {
    try {
      await fetchUser(tk);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUser]);

  useEffect(() => {
    if (!token) {
      return;
    }

    void hydrateUser(token);
  }, [hydrateUser, token]);

  const login = useCallback(async (newToken: string, role: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', role);
    setToken(newToken);
    setIsLoading(true);
    await fetchUser(newToken);
    setIsLoading(false);
  }, [fetchUser]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    setIsLoading(false);
    router.push('/login');
  }, [router]);

  const refreshUser = useCallback(async () => {
    const tk = localStorage.getItem('token');
    if (tk) await fetchUser(tk);
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
