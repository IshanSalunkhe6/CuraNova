"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_URL = "https://prod.spline.design/Lvc6G-MAkuJI1tSr/scene.splinecode";

export default function Hero() {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cleanup;

    // Ensure the web component is registered (layout loads the script)
    const ensureReady = () => {
      // 1) If we already created a singleton element once, just mount it
      if (window.__splineEl && window.customElements?.get("spline-viewer")) {
        attachSingleton();
        return;
      }

      // 2) If the custom element is defined but no element exists yet, create it once
      if (window.customElements?.get("spline-viewer")) {
        createSingleton();
        attachSingleton();
        return;
      }

      // 3) Not defined yet — poll briefly until the script registers the element
      const t = setInterval(() => {
        if (window.customElements?.get("spline-viewer")) {
          clearInterval(t);
          if (!window.__splineEl) createSingleton();
          attachSingleton();
        }
      }, 50);

      cleanup = () => clearInterval(t);
    };

    const createSingleton = () => {
      const el = document.createElement("spline-viewer");
      el.setAttribute("url", SPLINE_URL);
      // Keep a global reference so we reuse the SAME element across mounts
      window.__splineEl = el;
      window.__splineReady = true;
    };

    const attachSingleton = () => {
      const host = mountRef.current;
      if (!host || !window.__splineEl) return;

      // If the element is currently attached elsewhere, detach it first
      const el = window.__splineEl;
      if (el.parentNode && el.parentNode !== host) {
        el.parentNode.removeChild(el);
      }

      // Attach to this Hero container
      host.appendChild(el);
      setReady(true);
    };

    // Handle back/forward cache restores
    const onPageShow = (e) => {
      if (e.persisted) {
        // bfcache restore — element should still be alive; just reattach
        ensureReady();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    ensureReady();

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      if (cleanup) cleanup();

      // Detach but DO NOT destroy — we want to keep the same element alive
      const host = mountRef.current;
      const el = window.__splineEl;
      if (host && el && el.parentNode === host) {
        host.removeChild(el);
      }
    };
  }, []);

  return (
    <section className="relative bg-white">
      <div className="absolute inset-0 bg-dot" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium shadow-sm">
            <span className="h-2 w-2 rounded-full bg-purple-600" />
            Built for clinicians & medical students
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            The medical AI toolkit by <span className="text-gradient">CuraNova</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg text-gray-600">
            Analyze documents faster and ask grounded questions on your own material.
            Start with our disease highlighter and RAG chatbot—more tools coming soon.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#tools" className="btn btn-primary">Explore tools</a>
            <a href="/docs" className="btn btn-outline">Documentation</a>
          </div>
        </div>

        <div className="relative z-0 overflow-hidden rounded-3xl border bg-white shadow-lg">
          <div className="aspect-[16/12] w-full">
            {/* We still show a skeleton on very first visit, then the same element is reused. */}
            <div ref={mountRef} className="h-full w-full" />
            {!ready && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple-50 via-fuchsia-50 to-cyan-50" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
