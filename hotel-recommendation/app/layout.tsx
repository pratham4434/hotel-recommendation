import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import SessionWrapper from "./SessionWrapper"; // ✅ your client wrapper for SessionProvider
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeStay - Hotel Recommendations",
  description: "Find your perfect stay with LuxeStay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-200`}>
        <SessionWrapper>
          <Navbar />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8">{children}</main>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
