"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/new-york/ui/button";
import { supabase } from "@/config/supabase";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  onLogout: () => void; // Function to handle logout
}

export function SidebarNav({ className, items, onLogout, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  }

  

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <span>{item.title}</span>
        </Link>
      ))}
      {/* Dashboard Button */}
      <Link href="/dashboard">
        <span className={cn(buttonVariants({ variant: "ghost" }), "justify-start hover:underline")}>
          Go back to Dashboard
        </span>
      </Link>
      {/* Logout Button */}
      <button
        onClick={onLogout}
        className={cn(buttonVariants({ variant: "ghost" }), "justify-start hover:underline")}
      >
        Logout
      </button>
    </nav>
  );
}
