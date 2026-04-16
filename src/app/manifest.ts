import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DON Recruitment - Professional Talent Acquisition",
    short_name: "DON Recruitment",
    description: "Professional recruitment services connecting businesses with top talent. Executive search, permanent placement, and talent acquisition.",
    start_url: "/",
    display: "standalone",
    background_color: "#061733",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["business", "productivity"],
  };
}
