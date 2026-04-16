'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { extractErrorMessage } from '@/lib/api';

type PublicRole = 'Worker' | 'Client';
type UserRole = PublicRole | 'IT Vendor' | 'Gig Vendor' | 'Admin';

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
  onboardingCompleted: boolean;
  progressPercentage?: number;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: PublicRole;
  phone?: string;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const data = (await authService.me()) as User;
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const data = (await authService.login(credentials)) as User;
      setUser(data);
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    try {
      const response = (await authService.register(data)) as User;
      setUser(response);
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}
