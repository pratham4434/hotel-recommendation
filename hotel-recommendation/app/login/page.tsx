'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center ">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-8 w-full max-w-md text-center shadow-lg border border-yellow-500/20">
        {session ? (
          <>
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">Welcome back, {session.user?.name}!</h1>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4 border-4 border-yellow-400"
              />
            )}
            <p className="text-gray-300 mb-2">Email: {session.user?.email}</p>

            <button
              onClick={() => signOut()}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">Sign in to LuxeStay</h1>
            <p className="text-gray-300 mb-6">Discover the best hotels tailored for you</p>

            <button
              onClick={() => signIn('github')}
              className="w-full flex items-center justify-center gap-3 bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </button>

            <p className="mt-6 text-sm text-gray-400">
              Don’t have an account?{' '}
              <Link href="/register" className="text-yellow-400 font-medium hover:underline">
                Register here
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
