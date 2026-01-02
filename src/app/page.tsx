import Link from "next/link";
import { projects } from "@/content/projects";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm text-neutral-600">Full-Stack Web Developer</p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          I build lean, maintainable product-oriented web apps.
        </h1>

        <p className="max-w-2xl text-neutral-700">
        This portfolio is intentionally designed to showcase architectural thinking, clarity of reasoning, and product awareness — not just technical output.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/projects"
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            View projects
          </Link>

          <Link
            href="/contact"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Featured projects</h2>
          <Link href="/projects" className="text-sm text-neutral-600 hover:underline">
            All projects
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <article key={p.slug} className="rounded-2xl border p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-neutral-700">{p.summary}</p>
              <p className="mt-3 text-xs text-neutral-600">
                Stack: {p.stack.join(" • ")}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}