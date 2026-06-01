import Link from "next/link";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  // { label: "Case studies", href: "/case-studies" },
];

export default function NavLinks() {
  return (
    <nav className="mx-auto hidden items-center gap-1 md:flex">
      {links.map((l) =>
        l.href.startsWith("#") ? (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {l.label}
          </a>
        ) : (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {l.label}
          </Link>
        )
      )}
      <a
        href="#map"
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-emerald-700 transition-colors hover:bg-emerald-50/80 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
      >
        <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
        Live users
      </a>
    </nav>
  );
}
