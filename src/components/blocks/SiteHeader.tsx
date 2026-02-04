import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "@/components/blocks/LanguageSwitch";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <span className="hidden h-4 w-px bg-[var(--border)] sm:inline-block" aria-hidden="true" />
            <LanguageSwitch />
          </div>
        </div>
      </Container>
    </header>
  );
}