import type { Metadata, Viewport } from "next";
import { Amiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { RegisterServiceWorker, Shell } from "@/components/shell";
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
  title: { default: "اعرف ربك", template: "%s | اعرف ربك" },
  description: "تعلّم أسماء الله وصفاته بطريقة بسيطة، موثوقة، وقريبة منك.",
  applicationName: "اعرف ربك",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${sans.variable} ${source.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Shell>{children}</Shell>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
