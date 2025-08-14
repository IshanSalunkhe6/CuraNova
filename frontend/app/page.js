import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ValueGrid from "@/components/ValueGrid";
import EnterpriseStrip from "@/components/EnterpriseStrip";
import SiteFooter from "@/components/SiteFooter";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  const API_HOST = process.env.BACKEND_URL || "http://127.0.0.1:8000";

  const meRes = await fetch(`${API_HOST}/api/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  }).catch(() => null);

  let me = null;
  if (meRes && meRes.ok) {
    const data = await meRes.json();
    me = data?.user || null;
  }

  if (!me) redirect("/signin");

  return (
    <>
      <Hero />

      <section id="tools" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Tools</h2>
            <a href="/all-tools" className="text-sm text-purple-700 hover:underline">
              View all
            </a>
          </div>

          <div className="grid gap-6 items-stretch sm:grid-cols-2">
            <ProductCard
              title="CuraScan"
              subtitle="Disease Extraction"
              description="Highlight disease terms instantly from clinical notes or PDFs."
              href="/tools/curascan"   // ← internal embed page
              tag="NLP"
              image="/curascan1.jpg"
            />
            <ProductCard
              title="CuraChat"
              subtitle="Medical RAG Chatbot"
              description="Ask grounded questions on your uploaded medical documents. Sources cited with page links."
              href={process.env.NEXT_PUBLIC_CURACHAT_URL}
              tag="RAG"
              image="/curachat.jpg"
            />

          </div>
        </div>
      </section>

      <ValueGrid />
      <EnterpriseStrip />
      <section id="about" className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12" />
      </section>
      <SiteFooter />
    </>
  );
}
