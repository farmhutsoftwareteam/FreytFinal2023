"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check active session and set it
    const currentSession = supabase.auth.getSession();
    setSession(currentSession);

   
    
  }, []);

  useEffect(() => {
    if (session) {
      // If there is a session, redirect to the dashboard
      router.push('/dashboard');
    } else {
      // If no session, redirect to authentication page
      router.push('/authentication');
    }
  }, [session, router]);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};
