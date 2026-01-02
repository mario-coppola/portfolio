import { Container } from "@/components/ui/Container";

export function SiteFooter() {
    return (
      <footer className="border-t">
        <Container className="space-y-12 py-10">
          <p>© {new Date().getFullYear()} Mario Coppola.</p>
        </Container>
      </footer>
    );
  }