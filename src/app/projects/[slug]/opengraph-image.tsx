import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const title = project?.title ?? "Project";
  const summary = project?.summary ?? site.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 22, color: "#737373" }}>{site.name}</div>

        <div
          style={{
            marginTop: 18,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 28,
            color: "#525252",
            maxWidth: 980,
          }}
        >
          {summary}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 64,
            fontSize: 20,
            color: "#737373",
          }}
        >
          {site.url.replace(/^https?:\/\//, "")} / projects / {slug}
        </div>
      </div>
    ),
    size
  );
}