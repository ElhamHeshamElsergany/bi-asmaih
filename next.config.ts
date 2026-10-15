import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/bi-asmaih";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Parallel build workers race when writing the app path manifest on Windows
  // and drop routes. One worker keeps the export and the Bonto build complete.
  experimental: { webpackBuildWorker: false },
  ...(githubPages
    ? {
        output: "export",
        ...(pagesBasePath ? { basePath: pagesBasePath } : {}),
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        output: "standalone",
        async headers() {
          return [
            {
              source: "/sw.js",
              headers: [
                { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
                { key: "Service-Worker-Allowed", value: "/" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
