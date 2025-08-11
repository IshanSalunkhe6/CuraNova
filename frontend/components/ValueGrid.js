export default function ValueGrid() {
  const items = [
    {
      title: "Lightning-fast insight",
      body: "Extract diseases, meds, and entities from docs in seconds. Zero waiting, zero friction.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="currentColor" d="M13 2L3 14h7l-1 8l11-13h-7l0-7z"/>
        </svg>
      ),
      tone: "from-purple-100 to-purple-50",
    },
    {
      title: "Privacy-first",
      body: "No data used to train shared models. Log retention controls and audit trails.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="currentColor" d="M12 2a6 6 0 0 0-6 6v2H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-1V8a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4v2H8V8a4 4 0 0 1 4-4Z"/>
        </svg>
      ),
      tone: "from-green-100 to-green-50",
    },
    {
      title: "Upload from anywhere",
      body: "PDFs, images, notes. CuraNova normalizes formats and preserves citations.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="currentColor" d="M12 3l4 4h-3v6h-2V7H8l4-4Zm-7 9h2v7h12v-7h2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7Z"/>
        </svg>
      ),
      tone: "from-fuchsia-100 to-fuchsia-50",
    },
    {
      title: "HIPAA-friendly workflow",
      body: "Optional PHI redaction, regional storage, and strict access controls.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="currentColor" d="M12 22q-3.75-1.05-6.375-4T3 10V6l9-4l9 4v4q0 4.05-2.625 7T12 22Zm0-2.125q2.925-.9 4.962-3.475T19 10.025V7.1L12 4.1l-7 3v3q0 3.4 2.038 5.975T12 19.875ZM11 17v-3H8v-2h3V9h2v3h3v2h-3v3h-2Z"/>
        </svg>
      ),
      tone: "from-cyan-100 to-cyan-50",
    },
    {
      title: "Cited answers",
      body: "Every response links to page + line. No more guessing where it came from.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="currentColor" d="M17 3H7a2 2 0 0 0-2 2v14l7-3l7 3V5a2 2 0 0 0-2-2Z"/>
        </svg>
      ),
      tone: "from-amber-100 to-amber-50",
    },
    {
      title: "Team-ready",
      body: "Invite colleagues, set roles, and manage usage with project-level keys.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
          <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm0 2q-4 0-6 1.5T4 19v1h16v-1q0-2-2-3.5T12 14Z"/>
        </svg>
      ),
      tone: "from-sky-100 to-sky-50",
    },
  ];

  return (
    <section id="why" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Why choose <span className="text-gradient">CuraNova</span>?</h2>
          <p className="mt-3 text-gray-600">Automated AI tools tailored for clinicians, research teams, and medical students.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={i}
              className={`rounded-3xl border bg-gradient-to-br ${it.tone} p-6 shadow-sm transition-transform hover:-translate-y-1`}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">{it.icon}</div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
