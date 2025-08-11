// app/layout.js
import "./globals.css";
import AppShell from "@/components/AppShell";
import { cookies } from "next/headers";
import Script from "next/script";

export const metadata = {
  title: "MedAI",
  description: "AI tools for medical students & doctors",
  icons: {
  icon: "/curalogo.jpg",
},
};

export default async function RootLayout({ children }) {
  // Resolve user on the server so Header can show the avatar menu
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  const API_HOST = process.env.BACKEND_URL || "http://127.0.0.1:8000";

  let user = null;
  try {
    const meRes = await fetch(`${API_HOST}/api/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (meRes.ok) {
      const data = await meRes.json();
      user = data?.user || null;
    }
  } catch {
    user = null;
  }

  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Load Spline viewer once globally */}
        <Script
          src="https://unpkg.com/@splinetool/viewer@1.10.44/build/spline-viewer.js"
          type="module"
          strategy="afterInteractive"
        />
        <AppShell user={user}>{children}</AppShell>
      </body>
    </html>
  );
}
