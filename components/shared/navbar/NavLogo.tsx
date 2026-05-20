import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <div className="grid size-8 place-items-center rounded-full border border-white/35 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 5h10M3 8h6M3 11h8" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" className="dark:stroke-white" />
          <circle cx="13" cy="11" r="3" fill="#0f172a" className="dark:fill-white" />
          <path d="M12 11l.8.8 1.5-1.5" stroke="#00C896" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-semibold text-[15px] text-slate-900 tracking-tight dark:text-white">
        atsResume
      </span>
    </Link>
  );
}
