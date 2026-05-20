import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <div className="size-8 rounded-lg bg-gradient-to-br from-[#00C896] to-[#7B61FF] grid place-items-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 5h10M3 8h6M3 11h8" stroke="#0A0F0D" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="13" cy="11" r="3" fill="#0A0F0D" />
          <path d="M12 11l.8.8 1.5-1.5" stroke="#00C896" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-semibold text-[15px] text-slate-900 tracking-tight">
        atsResume
      </span>
    </Link>
  );
}
