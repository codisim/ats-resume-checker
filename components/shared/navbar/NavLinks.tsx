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
          className="text-sm text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-full hover:bg-foreground/10 transition-colors"
        >
          {l.label}
        </a>
      ))}
      <a
        href="#map"
        className="flex items-center gap-1.5 text-sm text-[#00C896] px-3 py-1.5 rounded-full hover:bg-[#00C896]/10 transition-colors"
      >
        <span className="size-1.5 rounded-full bg-[#00C896] animate-pulse" />
        Live users
      </a>
    </nav>
  );
}
