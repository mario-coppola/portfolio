"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getLangFromSearchParams } from "@/content/i18n";
import { cn } from "@/lib/cn";

type LangOption = {
  code: "en" | "it";
  label: string;
};

const options: LangOption[] = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
];

export function LanguageSwitch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const currentLang = getLangFromSearchParams(currentParams);

  const buildHref = (nextLang: LangOption["code"]) => {
    const params = new URLSearchParams(currentParams);
    params.set("lang", nextLang);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {options.map((option, index) => {
        const isActive = option.code === currentLang;
        const className = cn(
          "underline-offset-4 transition-colors duration-200",
          "text-[var(--muted)] hover:text-[var(--muted-foreground)] hover:underline",
          isActive && "font-semibold text-[var(--foreground)] underline"
        );

        return (
          <div key={option.code} className="flex items-center gap-2">
            <Link href={buildHref(option.code)} className={className}>
              {option.label}
            </Link>
            {index < options.length - 1 ? (
              <span className="text-[var(--muted-foreground)]">/</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
