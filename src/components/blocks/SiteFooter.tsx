import { Container } from "@/components/ui/Container";
import { TextLink } from "../ui/TextLink";

export function SiteFooter() {
    return (
      <footer className="border-t">
        <Container className="space-y-12 py-4">
          <div className="flex items-center justify-between gap-2">
            <div>
            <p className="text-sm text-[var(--muted-foreground)]">© {new Date().getFullYear()} Mario Coppola</p>
            </div>
          <div>
          <TextLink href="/privacy">Privacy</TextLink>
          </div>
          
          </div>
          
        </Container>
      </footer>
    );
  }