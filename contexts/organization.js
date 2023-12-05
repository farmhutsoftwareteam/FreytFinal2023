"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase'; // Import your Supabase client
import { useProfile } from './profile';

const OrganizationContext = createContext(null);

export function useOrganization() {
  return useContext(OrganizationContext);
}

export function OrganizationProvider({  children }) {
const profile = useProfile();

const userId = profile?.id ;
console.log(userId)
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    async function fetchOrganization() {
      try {
        const { data: organizationData, error } = await supabase
          .from('organization')
          .select('*')
          .eq('createdBy', userId)
          .single(); // Assuming one organization per user

        if (error) throw error;

        setOrganization(organizationData);
        console.log(organizationData);
        
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    }

    if (userId) {
      fetchOrganization();
    }
  }, [userId]);

  return (
    <OrganizationContext.Provider value={organization}>
      {children}
    </OrganizationContext.Provider>
  );
}
