import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "@/components/blocks/LanguageSwitch";
import { SiteHeaderNav } from "./SiteHeaderNav";
const nav = [
  { href: "/projects", label: 'Projects' },
  { href: "/about", label: 'About' },
  { href: "/contact", label: 'Contact' },
];
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--background)]/70 backdrop-blur">
      <Container className="py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Mario Coppola
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <SiteHeaderNav />
            <span className="hidden h-4 w-px bg-[var(--border)] sm:inline-block" aria-hidden="true" />
            <Suspense
              fallback={
                <span className="text-sm text-[var(--muted-foreground)]">EN · IT</span>
              }
            >
              <LanguageSwitch />
            </Suspense>
          </div>
        </div>
      </Container>
    </header>
  );
}