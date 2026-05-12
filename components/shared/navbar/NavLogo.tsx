import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C896] to-[#7B61FF] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 6h10M4 9h6M4 12h8" stroke="#0A0F0D" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="14" cy="12" r="3" fill="#0A0F0D" />
          <path d="M13 12l.8.8 1.5-1.5" stroke="#00C896" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-bold text-lg text-white tracking-tight">
        resume<span className="text-[#00C896]">.</span>codisim
      </span>
    </Link>
  );
}