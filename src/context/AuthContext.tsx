import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock auth for demo purposes
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  preferences: {
    theme: 'light',
    notifications: true,
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (for demo)
    const storedUser = localStorage.getItem('cliniq_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo, we'll just set the mock user
      setCurrentUser(MOCK_USER);
      localStorage.setItem('cliniq_user', JSON.stringify(MOCK_USER));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // For demo, create a new user based on the mock
      const newUser = { ...MOCK_USER, name, email };
      setCurrentUser(newUser);
      localStorage.setItem('cliniq_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cliniq_user');
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};