import Link from "next/link";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";

export default function ProjectsPage() {
  return (
    <Container className="space-y-6 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-2xl text-neutral-700">
          A selection of projects and case studies highlighting architectural decisions,
          trade-offs, and product-oriented thinking.
        </p>
        <div>
          <TextLink href="/">Back to home</TextLink>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.slug} className="space-y-3">
            <div className="space-y-1">
              <h2 className="font-semibold text-neutral-900">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:underline"
                >
                  {project.title}
                </Link>
              </h2>

              <p className="text-sm text-neutral-700">{project.summary}</p>

              <p className="text-xs text-neutral-600">
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
    </Container>
  );
}