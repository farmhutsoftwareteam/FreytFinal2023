import { Metadata } from "next";
import Link from "next/link";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/new-york/ui/button";
import { UserAuthForm } from "@/app/authentication/components/user-auth-form";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Sign up To Freyt 365",
  description: "Create an account or login to Freyt 365",
};

export default function AuthenticationPage() {
  return (
    <div>
      <Head>
        <meta name="suppressHydrationWarning" content="true" />
      </Head>

      <div className=" mx-auto min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Image or Decorative Panel */}
        <div className="lg:flex-1  items-center justify-center bg-orange-400 p-10 text-white hidden lg:block">
          {/* Content of the left panel */}
          <div>
            <ThemeToggle />
            <h2 className="text-4xl font-bold mb-3">Freyt 365</h2>
            <p className="mb-6">Reimagine your logistics business with tailor-made financial solutions.</p>
            <footer>From Raysun Capital</footer>
          </div>
        </div>

        {/* Right Panel - Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link href="/">
                <span className="font-semibold text-xl cursor-pointer">Freyt365</span>
              </Link>
              <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back!</h1>
              <p className="text-gray-600 mb-4">Sign in to continue</p>
            </div>

            <UserAuthForm />

            <p className="text-center text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <Link href="/terms">
                <span className="underline hover:text-blue-500">Terms of Service</span>
              </Link>{" "}
              and{" "}
              <Link href="/privacy">
                <span className="underline hover:text-blue-500">Privacy Policy</span>
              </Link>.
            </p>

            <div className="text-center">
              <Link href="/examples/authentication">
                <span className={cn(buttonVariants({ variant: "ghost" }), "text-blue-600 hover:text-blue-800")}>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
