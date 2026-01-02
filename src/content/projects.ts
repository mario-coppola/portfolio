export type Project = {
    slug: string;
    title: string;
    summary: string;
    role: string;
    stack: string[];
    links?: { label: string; href: string }[];
  };
  
  export const projects: Project[] = [
    {
      slug: "portfolio",
      title: "Portfolio (this site)",
      summary:
        "SEO-first and server-first portfolio, focused on clean structure, versioned content, performance, and long-term maintainability.",
      role: "Design + Engineering",
      stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
      links: [{ label: "Repo", href: "https://github.com/mario-coppola/portfolio" }],
    },
  ];