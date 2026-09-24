import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { absoluteUrl, SEO } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F3F5F6",
    theme_color: "#1A1A3F",
    lang: "en-US",
    categories: ["business", "utilities"],
    icons: [
      {
        src: absoluteUrl(SITE.logoRaster),
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: absoluteUrl(SITE.logoMark),
        sizes: "112x112",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
