import type { Metadata, Viewport } from "next";
import { Amiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { RegisterServiceWorker, Shell } from "@/components/shell";
import { absoluteUrl, metadataOrigin, site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const source = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-source",
});

export const metadata: Metadata = {
  metadataBase: new URL(metadataOrigin()),
  title: { default: `${site.name} | تعلّم أسماء الله الحسنى وصفاته من مصدر موثوق`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  category: "education",
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#12110f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `try{var t=localStorage.getItem("irab-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: site.name,
      description: site.description,
      inLanguage: "ar",
      publisher: { "@id": absoluteUrl("/#org") },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/search?q={search_term_string}") },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": absoluteUrl("/#org"),
      name: site.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon-512.png"),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${sans.variable} ${source.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={websiteSchema} />
        <Shell>{children}</Shell>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
