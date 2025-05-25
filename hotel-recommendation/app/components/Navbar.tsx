'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between shadow-lg border-b border-gray-700">
      {/* Left: App Name or Logo */}
      <div
        className="text-2xl font-bold text-yellow-400 cursor-pointer"
        onClick={() => router.push('/')}
      >
        LuxeStay
      </div>

      {/* Right: Avatar & Dropdown */}
      <div className="relative">
        {session?.user ? (
          <>
            <Image
              src={session.user.image || '/placeholder.svg'}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer border border-gray-500"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 shadow-lg rounded-lg z-50 w-32 p-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded px-3 py-2"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-400 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
