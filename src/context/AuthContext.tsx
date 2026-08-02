import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Builds the app-level User from a Supabase session and resolves the user's
// role from the profiles table, defaulting to 'patient'.
const buildUserFromSession = async (session: Session): Promise<User> => {
  const { user } = session;

  let role: UserRole = 'patient';
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!error && data?.role === 'doctor') {
      role = 'doctor';
    }
  } catch (e) {
    console.warn('Could not fetch user profile role, defaulting to patient', e);
  }

  return {
    id: user.id,
    name: user.user_metadata?.full_name || user.email || 'User',
    email: user.email || '',
    role,
    profilePicture: user.user_metadata?.avatar_url,
    preferences: {
      theme: 'light',
      notifications: true,
    },
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await supabase.auth.getSession();
        if (res?.data?.session) {
          setCurrentUser(await buildUserFromSession(res.data.session));
        }
      } catch (err) {
        console.warn('AuthContext: Session resolution handled safely', err);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    try {
      const res = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!session) {
          setCurrentUser(null);
          return;
        }

        if (event === 'TOKEN_REFRESHED') {
          return;
        }

        try {
          setCurrentUser(await buildUserFromSession(session));
        } catch (err) {
          console.warn('AuthContext: Listener build user error', err);
        }
      });

      return () => {
        res?.data?.subscription?.unsubscribe();
      };
    } catch (err) {
      console.warn('AuthContext: Listener subscription error', err);
    }
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Logout warning', err);
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, logout }}
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
