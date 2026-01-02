import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <Container className="space-y-12 py-10">
      <section className="space-y-4">
        <p className="text-sm text-[var(--muted-foreground)]">Full-Stack Web Developer</p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          I build lean, maintainable, product-oriented web applications.
        </h1>

        <p className="max-w-2xl text-[var(--muted)]">
          This portfolio is intentionally designed to showcase architectural thinking,
          clarity of reasoning, and product awareness — not just technical output.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary">
            Get in touch
          </ButtonLink>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Featured projects</h2>
          <TextLink href="/projects">All projects</TextLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <Card key={project.slug} className="space-y-3">
              <div className="space-y-1">
              <h3 className="font-semibold text-[var(--foreground)]">{project.title}</h3>
                <p className="text-sm text-[var(--muted)]">{project.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}