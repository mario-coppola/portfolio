import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await Promise.resolve(params);

  const project = projects.find((p) => p.slug === slug);

  const title = String(project?.title ?? "Project");
  const summary = String(project?.summary ?? site.description ?? "");
  const domain = String(site.url ?? "").replace(/^https?:\/\//, "");

  const footerLine = `${domain} / projects / ${slug}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, color: "#737373" }}>{String(site.name)}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#0a0a0a",
                maxWidth: 980,
                letterSpacing: -0.5,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.3,
                color: "#525252",
                maxWidth: 980,
              }}
            >
              {summary}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, color: "#737373" }}>{footerLine}</div>
        </div>
      </div>
    ),
    size
  );
}