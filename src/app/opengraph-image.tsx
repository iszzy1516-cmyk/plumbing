import { ImageResponse } from "next/og";
import { site } from "@/config/site/site";

export const alt = `${site.name}, plumbers covering ${site.area}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b5c94", color: "#ffffff", fontSize: 88, padding: 80, textAlign: "center" }}>
      {site.name}
    </div>,
    size,
  );
}
