import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';
import { Snackbar } from 'react-native-paper';

interface User {
  _id: string;
  id?: string;
  email: string;
  name: string;
  phone: string;
  isAdmin: boolean;
  isRider: boolean;
  onDuty: boolean;
  pendingPayment: number;
  createdAt: string;
  updatedAt: string;
}

interface SnackbarState {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  snackbar: SnackbarState;
  hideSnackbar: () => void;
  showSnackbar: (message: string, type: 'success' | 'error') => void;
  signIn: (phone: string, password: string) => Promise<void>;
  signUp: (data: { email: string; password: string; name: string }) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: '',
    type: 'success'
  });

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({
      visible: true,
      message,
      type
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, visible: false }));
  };

  const signInAsGuest = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser({
        _id: 'guest',
        id: 'guest',
        email: 'guest@example.com',
        name: 'Guest User',
        phone: '',
        isAdmin: false,
        isRider: false,
        onDuty: false,
        pendingPayment: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      throw new Error('Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phone: string, password: string) => {
    try {
      setLoading(true);
      
      const response = await fetch('https://15.207.211.78.nip.io/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      setUser(userData);
      
      showSnackbar('Login successful!', 'success');
      router.replace('/(tabs)/dashboard');
      
    } catch (error) {
      showSnackbar(
        error instanceof Error ? error.message : 'Login failed. Please try again.',
        'error'
      );
      throw error;
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
        _id: '1',
        id: '1',
        email: data.email,
        name: data.name,
        phone: '',
        isAdmin: false,
        isRider: false,
        onDuty: false,
        pendingPayment: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signUp, 
        signInAsGuest, 
        signOut,
        snackbar,
        showSnackbar,
        hideSnackbar
      }}
    >
      {children}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={hideSnackbar}
        duration={3000}
        style={{
          backgroundColor: snackbar.type === 'success' ? '#4CAF50' : '#F44336',
        }}
        action={{
          label: 'Dismiss',
          onPress: hideSnackbar,
        }}
      >
        {snackbar.message}
      </Snackbar>
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