"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getLangFromSearchParams, t } from "@/content/i18n";
import { siteHeaderContent } from "@/content/siteheader";

export function SiteHeaderNav() {
  const sp = useSearchParams();
  const lang = getLangFromSearchParams(Object.fromEntries(sp.entries()));
  const content = t(siteHeaderContent, lang);

  const nav = [
    { href: "/projects", label: content.navLabels.projects },
    { href: "/about", label: content.navLabels.about },
    { href: "/contact", label: content.navLabels.contact },
  ];

  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm">
      {nav.map((item) => (
        <Link key={item.href} href={item.href} className="hover:underline">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}