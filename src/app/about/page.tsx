import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export default function AboutPage() {
  return (
    <Container className="space-y-6 py-10">
      <header className="space-y-2">
        <div>
          <TextLink href="/">Back to home</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      </header>

      <div className="space-y-4">
        <p className="max-w-2xl text-[var(--muted)]">
          I work through small, intentional steps and defensible decisions.
          My focus is on building web applications that balance technical
          correctness with product needs.
        </p>

        <p className="max-w-2xl text-[var(--muted)]">
          I care deeply about performance, SEO, accessibility, and long-term
          maintainability. Code quality matters, but only insofar as it helps
          deliver a better product and reduces future complexity.
        </p>
      </div>
    </Container>
  );
}