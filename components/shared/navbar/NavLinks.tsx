const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-1 mx-auto">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          {l.label}
        </a>
      ))}
      <a
        href="#map"
        className="flex items-center gap-1.5 text-sm text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors"
      >
        <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
        Live users
      </a>
    </nav>
  );
}
