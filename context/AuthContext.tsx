'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, UserRole } from '@/types/database';

interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  signInWithOAuth: (provider: 'github' | 'google') => Promise<void>;
  isAdmin: boolean;
  isArtist: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('sk_user_session');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default simulated customer session for instant demo preview
        const demoCustomer: Profile = {
          id: 'usr-customer-1',
          email: 'collector@skartwork.com',
          full_name: 'SK Art Collector',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
          role: 'customer',
          phone: '+2349072994416',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setUser(demoCustomer);
        localStorage.setItem('sk_user_session', JSON.stringify(demoCustomer));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, role: UserRole = 'customer') => {
    let profile: Profile;

    if (role === 'admin') {
      profile = {
        id: 'usr-admin-master',
        email: 'abdulmajeedojewale@gmail.com',
        full_name: 'Abdulmajeed Olasunkanmi O. (Founder)',
        avatar_url: '/founder.jpg',
        role: 'admin',
        phone: '+2349072994416',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } else if (role === 'artist') {
      profile = {
        id: 'usr-artist-1',
        email: email.includes('@') ? email : 'elena.rostova@skartwork.com',
        full_name: 'Elena Rostova (Artist)',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
        role: 'artist',
        phone: '+2348123456789',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } else {
      profile = {
        id: `usr-cust-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        role: 'customer',
        phone: '+2349072994416',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    setUser(profile);
    localStorage.setItem('sk_user_session', JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sk_user_session');
  };

  const signInWithOAuth = async (provider: 'github' | 'google') => {
    login(`creator.${provider}@skartwork.com`, 'customer');
  };

  const isAdmin = user?.role === 'admin';
  const isArtist = user?.role === 'artist';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signInWithOAuth, isAdmin, isArtist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

