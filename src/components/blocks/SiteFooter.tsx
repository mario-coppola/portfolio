import { Container } from "@/components/ui/Container";

export function SiteFooter() {
    return (
      <footer className="border-t">
        <Container className="space-y-12 py-4">
          <p className="text-sm text-[var(--muted-foreground)]">© {new Date().getFullYear()} Mario Coppola</p>
        </Container>
      </footer>
    );
  }