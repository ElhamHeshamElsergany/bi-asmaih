import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "اعرف ربك",
    short_name: "اعرف ربك",
    description: "تعلّم أسماء الله وصفاته بطريقة بسيطة، موثوقة، وقريبة منك.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: "#f3efe7",
    theme_color: "#1e6b56",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
