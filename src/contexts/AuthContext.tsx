'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

interface AuthData {
  user: string;
  expiresAt: number;
}

const AUTH_STORAGE_KEY = 'letmedemo_auth';
const TTL_DAYS = 7; // Authentication will last for 7 days

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredAuth(): AuthData | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;

    const authData: AuthData = JSON.parse(stored);
    
    // Check if the stored auth has expired
    if (authData.expiresAt < Date.now()) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return authData;
  } catch {
    // Handle any localStorage errors
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
    const storedAuth = getStoredAuth();
    if (storedAuth) {
      setIsAuthenticated(true);
      setUser(storedAuth.user);
    }
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUser(username);

        // Store auth data with expiration
        const expiresAt = Date.now() + (TTL_DAYS * 24 * 60 * 60 * 1000); // Current time + TTL in milliseconds
        const authData: AuthData = {
          user: username,
          expiresAt,
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/sign-out', { method: 'POST' });
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Only render children after component is mounted
  if (!mounted) {
    return null; // or a loading spinner/placeholder
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 