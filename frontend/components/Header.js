"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { api } from "@/lib/api";

export default function Header({ user }) {
  const pathname = usePathname();
  const isHidden =
    pathname === "/signin" ||
    pathname === "/signup" ||
    (pathname && pathname.startsWith("/tools/curascan"));

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Stable outside-click handler (satisfies hooks linter)
  const onDocClick = useCallback((e) => {
    const el = menuRef.current;
    if (!el) return;
    if (!el.contains(e.target)) setOpen(false);
  }, []);

  // Only attach listener when menu is open AND header is visible
  useEffect(() => {
    if (!open || isHidden) return;
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, isHidden, onDocClick]);

  async function onSignOut() {
    try {
      await api("/auth/signout", { method: "POST" });
      setOpen(false);
      window.location.href = "/signin";
    } catch {
      // no-op
    }
  }

  // ❗ Return AFTER hooks are declared so hook order stays stable
  if (isHidden) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/curalogo.jpg"
            alt="CuraNova Logo"
            width={40}
            height={40}
            priority
            className="rounded-md"
          />
          <span className="font-bold tracking-tight bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent group-hover:opacity-90">
            CuraNova
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#tools" className="hover:text-gray-900">Tools</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#docs" className="hover:text-gray-900">Docs</a>
        </nav>

        {/* Right side - Only show if logged in */}
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(v => !v)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Account menu"
            >
              <UserIcon className="h-5 w-5 text-gray-800" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white shadow-lg p-3">
                <div className="mb-2 text-sm text-gray-600 truncate">
                  {user.email}
                </div>
                <button
                  onClick={onSignOut}
                  className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
