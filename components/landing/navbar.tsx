import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavbarAnimation } from "./navbar-animation";

export function Navbar() {
    return (
        <NavbarAnimation>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <Logo className="w-8 h-8" />
                    <span className="font-serif font-bold text-xl tracking-tight text-foreground">
                        PDF Pocket Knife
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Pricing
                    </Link>
                    <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        About
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-foreground" asChild>
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button
                        className="rounded-none bg-foreground text-background hover:bg-primary hover:text-white transition-colors"
                        asChild
                    >
                        <Link href="/dashboard">Get Started</Link>
                    </Button>
                </div>
            </div>
        </NavbarAnimation>
    );
}
