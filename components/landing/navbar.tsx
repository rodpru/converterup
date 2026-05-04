"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/routing";
import { LanguageSelector } from "./language-selector";
import { NavbarAnimation } from "./navbar-animation";

export function Navbar() {
  const t = useTranslations("Navigation");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <NavbarAnimation>
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo className="w-7 h-7" />
          <span className="font-[Syne] font-extrabold text-lg tracking-tight uppercase text-foreground">
            ConverterUp
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t("features")}
          </Link>
          <Link
            href="/#how-it-works"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t("howItWorks")}
          </Link>
          <Link
            href="/tools"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t("tools")}
          </Link>
          <Link
            href="/blog"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {t("blog")}
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />
          <Link
            href="/dashboard"
            className="inline-flex items-center h-10 px-5 bg-primary text-primary-foreground text-[13px] font-medium uppercase tracking-wider rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-200 min-h-[44px]"
          >
            {t("startConverting")}
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center w-10 h-10 min-h-[44px] min-w-[44px] text-foreground"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2A2535] bg-[#0C0A12]/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {t("features")}
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {t("howItWorks")}
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {t("tools")}
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {t("blog")}
            </Link>
            <div className="pt-2 border-t border-[#2A2535]">
              <div className="py-2 flex justify-start">
                <LanguageSelector />
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-full h-12 bg-primary text-primary-foreground text-[13px] font-medium uppercase tracking-wider rounded-lg min-h-[44px]"
              >
                {t("startConverting")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </NavbarAnimation>
  );
}
