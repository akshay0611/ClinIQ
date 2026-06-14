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
// role from the profiles table, defaulting to 'patient'. This is the single
// place role is read, so every consumer of useAuth() gets it for free.
//
// Notes:
// - Defaulting to 'patient' mirrors the schema default (profiles.role default
//   'patient') and the existing fallback in Profile.tsx (role || "patient"),
//   so behavior stays consistent.
// - .single() resolves to { data: null, error } (it does not throw) when a
//   brand-new user has no profile row yet; the !error check handles that and
//   falls through to the patient default.
const buildUserFromSession = async (session: Session): Promise<User> => {
  const { user } = session;

  let role: UserRole = 'patient';
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!error && data?.role === 'doctor') {
    role = 'doctor';
  }

  return {
    id: user.id,
    name: user.user_metadata.full_name || user.email,
    email: user.email || '',
    role,
    profilePicture: user.user_metadata.avatar_url,
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
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setCurrentUser(await buildUserFromSession(session));
        }
      } finally {
        // Always clear the loading flag so guarded routes can never get stuck
        // on the loader, even if the role lookup fails.
        setIsLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        setCurrentUser(null);
        return;
      }

      // Supabase fires onAuthStateChange on TOKEN_REFRESHED (roughly hourly).
      // Rebuilding the user on those events would re-run the profiles role
      // lookup every time for no reason, since the identity hasn't changed.
      // Only rebuild (and re-query the role) on events that can actually
      // change who the user is or their profile data.
      if (event === 'TOKEN_REFRESHED') {
        return;
      }

      setCurrentUser(await buildUserFromSession(session));
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
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
