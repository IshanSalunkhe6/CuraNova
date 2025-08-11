"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function AppShell({ user, children }) {
  const pathname = usePathname();

  // Hide header (and remove top padding) on auth pages and the CuraScan embed
  const hideHeader =
    pathname === "/signin" ||
    pathname === "/signup" ||
    (pathname && pathname.startsWith("/tools/curascan"));

  return (
    <>
      {!hideHeader && <Header user={user} />}
      <main className={hideHeader ? "" : "pt-16"}>{children}</main>
    </>
  );
}
