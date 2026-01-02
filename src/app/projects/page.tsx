import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

      <p className="max-w-2xl text-neutral-700">
        A selection of projects and case studies that highlight architectural
        decisions, trade-offs, and product-oriented thinking.
      </p>

      <div className="grid gap-4">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="rounded-2xl border p-4"
          >
            <h2 className="font-semibold">{project.title}</h2>

            <p className="mt-1 text-sm text-neutral-700">
              {project.summary}
            </p>

            <p className="mt-3 text-xs text-neutral-600">
              Role: {project.role} • Stack: {project.stack.join(" • ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}