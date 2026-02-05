import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#525252",
            maxWidth: 900,
          }}
        >
          {site.description}
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
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}