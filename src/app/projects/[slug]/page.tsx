import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const title = project.title;
  const description = project.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      type: "article",
    },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <Container className="space-y-8 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <TextLink href="/projects">← Back to projects</TextLink>
          {project.year ? <Badge>{project.year}</Badge> : null}
          <Badge>{project.role}</Badge>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-2xl text-[var(--muted)]">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {project.links?.length ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.links.map((l) => (
              <ButtonLink key={l.href} href={l.href} external variant="secondary" size="sm">
                {l.label}
              </ButtonLink>
            ))}
          </div>
        ) : null}
      </header>

      <div className="grid gap-4">
        {project.context ? (
          <Card>
            <Section title="What it is">
              <p className="text-[var(--muted)]">{project.context}</p>
            </Section>
          </Card>
        ) : null}

        {project.problem ? (
          <Card>
            <Section title="Why this is hard">
              <p className="text-[var(--muted)]">{project.problem}</p>
            </Section>
          </Card>
        ) : null}

        {project.decisions?.length ? (
          <Card>
            <Section title="Safety design">
              <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                {project.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Section>
          </Card>
        ) : null}

        {project.tradeoffs?.length ? (
          <Card>
            <Section title="Trade-offs">
              <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                {project.tradeoffs.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Section>
          </Card>
        ) : null}

        {project.outcome?.length ? (
          <Card>
            <Section title="What you get">
              <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                {project.outcome.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </Section>
          </Card>
        ) : null}
      </div>

      <Card>
        <Section title="Working with webhooks and external events?">
          <p className="text-[var(--muted)]">
            If you need webhook or external event processing that stays correct under
            retries, duplicates, and out-of-order delivery, I can help.
          </p>
          <ButtonLink href={"/contact"} variant="primary">
            Get in touch
          </ButtonLink>
        </Section>
      </Card>
    </Container>
  );
}