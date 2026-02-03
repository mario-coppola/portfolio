import Link from "next/link";
import { getFlagshipProject, projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";

export default function ProjectsPage() {
  const flagship = getFlagshipProject();
  const otherProjects = projects.filter((project) => project.slug !== flagship?.slug);

  return (
    <Container className="space-y-6 py-10">
      <header className="space-y-2">
        <div>
          <TextLink href="/">Back to home</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-2xl text-[var(--muted)]">
          A selection of projects and case studies highlighting architectural decisions,
          trade-offs, and product-oriented thinking.
        </p>

      </header>

      {flagship ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Flagship case study</h2>
          <Card className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                <Link
                  href={`/projects/${flagship.slug}`}
                  className="hover:underline"
                >
                  {flagship.title}
                </Link>
              </h3>

              <p className="text-sm text-[var(--muted)]">{flagship.summary}</p>

              <p className="text-xs text-[var(--muted-foreground)]">
                {flagship.year ? `${flagship.year} • ` : ""}
                {flagship.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {flagship.stack.slice(0, 6).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div>
              <TextLink href={`/projects/${flagship.slug}`}>View case study</TextLink>
            </div>
          </Card>
        </section>
      ) : null}

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Other projects</h2>
          <TextLink href="/projects">All projects</TextLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {otherProjects.map((project) => (
            <Card key={project.slug} className="space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-[var(--foreground)]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="text-sm text-[var(--muted)]">{project.summary}</p>

                <p className="text-xs text-[var(--muted-foreground)]">
                  {project.year ? `${project.year} • ` : ""}
                  {project.role}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 6).map((t) => (
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