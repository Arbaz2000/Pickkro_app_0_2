import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: { email: string; password: string; name: string }) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signInAsGuest = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser({
        id: 'guest',
        email: 'guest@example.com',
        name: 'Guest User',
      });
      
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      throw new Error('Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        id: '1',
        email,
        name: 'John Doe',
      });
      
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: { email: string; password: string; name: string }) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      setUser({
        id: '1',
        email: data.email,
        name: data.name,
      });
      
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    router.replace('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInAsGuest, signOut }}>
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