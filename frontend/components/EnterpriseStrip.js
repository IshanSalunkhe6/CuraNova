export default function EnterpriseStrip() {
  const cols = [
    {
      title: "Security",
      body:
        "Multi-layer controls, SSO/SAML, granular RBAC, and optional private networking. Logs and events for audits.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-10 w-10">
          <path fill="currentColor" d="M12 22q-3.75-1.05-6.375-4T3 10V6l9-4l9 4v4q0 4.05-2.625 7T12 22Zm0-2.1q2.95-.9 4.975-3.45T19 10.025V7.1L12 4.1l-7 3v2.925q0 3.375 2.025 5.925T12 19.9Z"/>
        </svg>
      ),
    },
    {
      title: "Deployment",
      body:
        "Pick what fits: managed cloud, regional storage, or VPC/on-prem endpoints behind your firewall.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-10 w-10">
          <path fill="currentColor" d="M12 2L2 7l10 5l10-5L12 2Zm0 9L2 16l10 5l10-5l-10-5Z"/>
        </svg>
      ),
    },
    {
      title: "Customization",
      body:
        "Tune prompts, add rules, or bring your own models. Extend pipelines for your specialty and workflows.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-10 w-10">
          <path fill="currentColor" d="M3 17v4h4l11-11l-4-4L3 17Zm18-10a1 1 0 0 0 0-1.41l-2.59-2.59a1 1 0 0 0-1.41 0l-1.83 1.83l4 4L21 7Z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="enterprise" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="mb-12 text-center text-4xl font-semibold">Safe. Flexible. Built for healthcare.</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {cols.map((c, i) => (
            <div key={i} className="rounded-3xl border p-8 shadow-sm transition hover:shadow-lg">
              <div className="mb-6 text-purple-700">{c.icon}</div>
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-gray-600">{c.body}</p>
              <a className="mt-5 inline-flex items-center gap-1 text-purple-700" href="/docs">
                Learn more <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
