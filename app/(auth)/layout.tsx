import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0C0A12] flex flex-col items-center justify-center px-4 relative">
      {/* Mesh gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#0D9488]/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-[#7C3AED]/[0.04] rounded-full blur-[100px]" />
      </div>
      <Link href="/" className="flex items-center gap-2.5 mb-10 relative z-10">
        <Logo className="w-7 h-7" />
        <span className="font-[Syne] font-extrabold text-lg tracking-tight uppercase text-[#EDEDEF]">
          ConverterUp
        </span>
      </Link>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
