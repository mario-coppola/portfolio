import { getFlagshipProject, projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";

export default function Home() {
  const flagship = getFlagshipProject();
  const otherProjects = projects.filter((project) => project.slug !== flagship?.slug);

  return (
    <Container className="space-y-12 py-10">
      <section className="space-y-4">
        <p className="text-sm text-[var(--muted-foreground)]">
          Full-Stack Web Developer
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Backend-first builder who delivers reliable end-to-end systems.
        </h1>

        <p className="max-w-2xl text-[var(--muted)]">
          I focus on data integrity, predictable workflows, and resilient delivery
          paths. The goal is systems that stay correct under real-world conditions.
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

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Problem</h2>
        <p className="max-w-2xl text-[var(--muted)]">
          External events and webhooks are noisy: providers retry, messages can
          arrive out of order, and duplicates are common. Without explicit
          idempotency and state handling, systems drift into inconsistent state
          and require manual correction.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Flagship project</h2>
          <TextLink href="/projects">All projects</TextLink>
        </div>

        {flagship ? (
          <Card className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {flagship.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">{flagship.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {flagship.stack.slice(0, 5).map((stackItem) => (
                <Badge key={stackItem}>{stackItem}</Badge>
              ))}
            </div>

            <div>
              <TextLink href={`/projects/${flagship.slug}`}>View case study</TextLink>
            </div>
          </Card>
        ) : null}
      </section>

      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="space-y-3">
            <h3 className="text-base font-semibold">Guarantees</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>Explicit state modeling and idempotency.</li>
              <li>Observability built in from day one.</li>
              <li>Clear trade-offs documented as decisions.</li>
            </ul>
          </Card>
          <Card className="space-y-3">
            <h3 className="text-base font-semibold">Non-scope</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>No hype-driven architecture or tooling.</li>
              <li>No hidden state or implicit side effects.</li>
              <li>No shortcuts that break data integrity.</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Other projects</h2>
          <TextLink href="/projects">All projects</TextLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {otherProjects.map((project) => (
            <Card key={project.slug} className="space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-[var(--foreground)]">
                  {project.title}
                </h3>
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