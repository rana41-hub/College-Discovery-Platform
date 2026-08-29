"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Nav() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b px-4 py-3 flex justify-between items-center">
      <Link href="/colleges" className="font-bold text-lg">
        CollegeDiscovery
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link href="/colleges">Colleges</Link>

        {status === "loading" ? null : session ? (
          <>
            <Link href="/saved">Saved</Link>
            <span className="text-gray-500">{session.user?.email}</span>
            <button onClick={() => signOut()} className="underline">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Log in</Link>
            <Link href="/signup" className="bg-black text-white px-3 py-1.5 rounded-lg">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
