import Link from "next/link";
import { Logo } from "@/components/logo";
import { NavbarAnimation } from "./navbar-animation";

export function Navbar() {
  return (
    <NavbarAnimation>
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo className="w-7 h-7" />
          <span className="font-[Syne] font-extrabold text-lg tracking-tight uppercase text-foreground">
            Recast
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Features
          </Link>
          <Link href="#how-it-works" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            How It Works
          </Link>
          <Link href="#pricing" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden md:inline-flex text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 h-10 items-center px-4"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center h-10 px-5 bg-primary text-primary-foreground text-[13px] font-medium uppercase tracking-wider rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-200 min-h-[44px]"
          >
            Start Converting
          </Link>
        </div>
      </div>
    </NavbarAnimation>
  );
}
