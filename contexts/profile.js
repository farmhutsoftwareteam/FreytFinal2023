"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const ProfileContext = createContext(null);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

 
  

  async function fetchUserProfile() {
    try {
      const { data: user, error } = await supabase.auth.getUser();

      if (error) throw error;

      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.user?.id)
          .single();

        if (profileError) throw profileError;

        setProfile(profileData);
       
        
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
