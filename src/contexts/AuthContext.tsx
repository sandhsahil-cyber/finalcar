import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserRole } from '@/data/dummyData';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  team_id: string | null;
  avatar_initials: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (data: { email: string; password: string; full_name: string; role: UserRole; team_id?: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data as UserProfile | null;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted && currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          const userProfile = await fetchProfile(currentSession.user.id);
          if (mounted) setProfile(userProfile);
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        const userProfile = await fetchProfile(newSession.user.id);
        if (mounted) setProfile(userProfile);
      } else {
        setProfile(null);
      }

      if (event === 'SIGNED_IN') {
        setShowLoginModal(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const login = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        const userProfile = await fetchProfile(data.user.id);
        setProfile(userProfile);
      }

      return {};
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred' };
    }
  }, [fetchProfile]);

  const signup = useCallback(async (data: {
    email: string;
    password: string;
    full_name: string;
    role: UserRole;
    team_id?: string;
  }): Promise<{ error?: string }> => {
    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke('auth-signup', {
        body: {
          email: data.email,
          password: data.password,
          full_name: data.full_name,
          role: data.role,
          team_id: data.team_id || null,
        },
      });

      if (fnError) {
        return { error: fnError.message || 'Signup failed' };
      }

      if (fnData?.error) {
        return { error: fnData.error };
      }

      // Auto-login after signup
      const loginResult = await login(data.email, data.password);
      return loginResult;
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred' };
    }
  }, [login]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      isLoading,
      isAuthenticated: !!user && !!profile,
      showLoginModal,
      setShowLoginModal,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
