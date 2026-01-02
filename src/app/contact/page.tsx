import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export default function ContactPage() {
  return (
    <Container className="space-y-6 py-10">
      <header className="space-y-2">
        <div>
          <TextLink href="/">Back to home</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      </header>

      <div className="space-y-4">
        <p className="max-w-2xl text-[var(--muted)]">
          If you want to discuss a project, collaboration, or just exchange ideas,
          feel free to reach out.
        </p>

        <p className="max-w-2xl text-[var(--muted)]">
          Contact details and links will be added here once the public identity
          is fully defined.
        </p>
      </div>
    </Container>
  );
}