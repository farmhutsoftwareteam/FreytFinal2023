import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function IndexPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-black shadow">
          {/* Navigation Bar */}
          <nav className="container mx-auto px-6 py-3 mt-5 flex justify-between items-center">
            <Link href="/">
              <span className="font-semibold text-xl text-white cursor-pointer">Freyt365</span>
            </Link>
            <div className="flex items-center  space-x-4">
             
              {/* Login Button */}
              <Link href="/authentication">
                <span className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded">Login</span>
              </Link>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="flex-grow flex items-center justify-center bg-black text-white min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Freyt365</h1>
              <p className="mb-4 text-2xl">The Regional Fintech Platform that gives your logistics business the power to prosper</p>
              <Link href="/get-started">
                <span className="inline-block px-6 py-2.5 bg-orange-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">Get Started</span>
              </Link>
            </div>
          </div>
        </header>

        <main>
          {/* Main content here */}
        </main>

        <footer className="bg-white shadow mt-8">
          {/* Footer */}
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <p className="text-gray-700">© {new Date().getFullYear()} Freyt365. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy">
                <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
              </Link>
              <Link href="/terms-of-use">
                <span className="cursor-pointer hover:text-gray-600">Terms of Use</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
