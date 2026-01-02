import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
  
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return { title: "Project not found" };
    }
  
    const title = project.title;
    const description = project.summary;
  
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
      },
    };
  }

export default async function ProjectPage({ params }: PageProps) {
    
const { slug } = await params;
    
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-neutral-600">
          {project.year ? `${project.year} • ` : ""}
          {project.role}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-2xl text-neutral-700">{project.summary}</p>

        <p className="text-sm text-neutral-600">
          Stack: {project.stack.join(" • ")}
        </p>

        {project.links?.length ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-neutral-50"
                target="_blank"
                rel="noreferrer"
              >
                {l.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {project.context ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Context</h2>
          <p className="text-neutral-700">{project.context}</p>
        </section>
      ) : null}

      {project.problem ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Problem</h2>
          <p className="text-neutral-700">{project.problem}</p>
        </section>
      ) : null}

      {project.decisions?.length ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Key decisions</h2>
          <ul className="list-disc space-y-1 pl-5 text-neutral-700">
            {project.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.tradeoffs?.length ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Trade-offs</h2>
          <ul className="list-disc space-y-1 pl-5 text-neutral-700">
            {project.tradeoffs.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.outcome?.length ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Outcome</h2>
          <ul className="list-disc space-y-1 pl-5 text-neutral-700">
            {project.outcome.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}