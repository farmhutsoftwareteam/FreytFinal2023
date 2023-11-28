"use client"
import * as React from "react"
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/config/supabase'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
const router = useRouter()

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          afterLogin();
        }
      }
    );

 
  }, []);

  function afterLogin() {
    console.log("User has logged in.");
    router.push('/dashboard');
    // Additional actions after login
  }

  return (
    <>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa, variables :  { default : { colors : { brand: 'orange' , brandAccent:  'orange'}}} }}
        
        view="sign_in"
        providers={['google']}
      />
    </>
  )
}
