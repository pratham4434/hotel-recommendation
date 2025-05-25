'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>

        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="User Profile"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
        )}

        <p className="mb-2">Name: {session.user?.name}</p>
        <p className="mb-6">Email: {session.user?.email}</p>

        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
