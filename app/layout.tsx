
import "@/styles/globals.css"
import { Metadata } from "next"
import { AuthProvider } from "@/contexts/authProvider"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { ProfileProvider} from "@/contexts/profile"
import { OrganizationProvider } from "@/contexts/organization"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "font-sans antialiased",
            fontSans.variable
          )}
        >
         {/* <AuthProvider> */}
           <ProfileProvider>
           <OrganizationProvider>
           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       
            
               <div>{children}</div>
            
           
           </ThemeProvider>
           </OrganizationProvider>
           </ProfileProvider>
           {/* </AuthProvider> */}
        </body>
      </html>
    </>
  )
}
