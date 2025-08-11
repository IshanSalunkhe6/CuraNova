export default function SiteFooter() {
  const cols = {
    Products: ["CuraScan", "CuraChat", "API & SDK"],
    Solutions: ["Hospitals", "Research", "Education", "Compliance"],
    Resources: ["Docs", "Changelog", "Status", "Contact"],
    Company: ["About", "Careers", "Privacy", "Terms"],
  };

  return (
    <footer className="mt-10 border-t bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-gradient text-2xl font-bold">CuraNova</h3>
          <p className="mt-3 text-sm text-gray-300">
            AI tools that respect clinical workflows and privacy.
          </p>
          <form className="mt-6 space-y-2">
            <label className="text-sm text-gray-300">Email Address</label>
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none placeholder:text-gray-400"
                placeholder="you@hospital.org"
              />
              <button className="absolute right-1 top-1 rounded-lg bg-purple-600 px-3 py-1 text-sm font-medium hover:bg-purple-700">
                Join
              </button>
            </div>
            <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
          </form>
        </div>

        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">{title}</h4>
            <ul className="mt-3 space-y-2 text-gray-400">
              {links.map((l) => (
                <li key={l}><a className="hover:text-white" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CuraNova. All rights reserved.
      </div>
    </footer>
  );
}
