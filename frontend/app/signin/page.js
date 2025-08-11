"use client";

import { useState } from "react";
import { api } from "@/lib/api";

function Brand() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <img src="/curalogo.jpg" alt="CuraNova"
           className="h-12 w-12 rounded-xl shadow ring-1 ring-white/40 object-cover" />
      <div className="text-2xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
          CuraNova
        </span>
      </div>
    </div>
  );
}

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await api("/auth/signin", { method: "POST", body: form });
      // Force a full reload so the server sees the cookie on the very next request
      window.location.href = "/";
    } catch (e) {
      setErr(e.message || "Sign in failed");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/curasignin.jpg')" }}>
      <div className="min-h-screen bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border bg-white/90 p-8 shadow-xl">
              <Brand />
              <h1 className="mb-2 text-center text-2xl font-semibold">
                Log in 
              </h1>
              <p className="mb-6 text-center text-sm text-gray-600">Use your email and password to continue.</p>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="you@example.com" required />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <input type="password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="••••••••" required />
                </div>

                {err && <p className="text-sm text-red-600">{err}</p>}

                <button type="submit" disabled={loading}
                  className="mt-2 w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white shadow hover:bg-purple-700 disabled:opacity-60">
                  {loading ? "Signing in…" : "Log in with email"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="font-medium text-purple-700 hover:underline">Sign up</a>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">Secure by design • HIPAA-friendly workflows</p>
          </div>
        </div>
      </div>
    </main>
  );
}
