"use client";

import { useTransition, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Globe, ChevronDown, Check } from "lucide-react";

export function LanguageSelector() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function onSelectChange(nextLocale: string) {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  const languages = [
    { code: "en", label: "EN", full: "English" },
    { code: "pt", label: "PT", full: "Português" },
    { code: "es", label: "ES", full: "Español" },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex justify-center md:justify-start items-center gap-1.5 h-10 px-3 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg min-h-[44px] w-full md:w-auto"
      >
        <Globe className="w-4 h-4" />
        <span>{languages.find((l) => l.code === locale)?.label || "EN"}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 md:right-0 mt-2 w-36 origin-top-right md:origin-top-right rounded-xl bg-[#0C0A12]/95 backdrop-blur-md border border-[#2A2535] shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectChange(lang.code)}
                className={`group flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#2A2535]/50 ${
                  locale === lang.code
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.full}
                {locale === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
