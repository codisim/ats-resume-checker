const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
];

export default function NavLinks() {
    return (
        <ul className="hidden md:flex items-center gap-1 mx-auto list-none m-0 p-0">
            {links.map((item) => (
                <li key={item.href}>
                    <a
                        href={item.href}
                        className="text-sm text-white/60 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-150"
                    >
                        {item.label}
                    </a>
                </li>
            ))}
            <li>
                <a
                    href="#map"
                    className="flex items-center gap-2 text-sm text-[#00C896] hover:bg-[#00C896]/10 px-4 py-2 rounded-full transition-all duration-150"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
                    Live users
                </a>
            </li>
        </ul>
    );
}