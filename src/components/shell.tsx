"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CompassIcon, HomeIcon, LibraryIcon, PathIcon } from "@/components/icons";
import { THEME_KEY } from "@/lib/storage";

const tabs = [
  { href: "/", label: "الرئيسية", icon: HomeIcon },
  { href: "/library", label: "الأسماء والصفات", icon: LibraryIcon },
  { href: "/discover", label: "اكتشف", icon: CompassIcon },
  { href: "/progress", label: "تقدمي", icon: PathIcon },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/library") return ["/library", "/topic", "/search"].some((prefix) => pathname.startsWith(prefix));
  if (href === "/discover") return pathname.startsWith("/discover") || pathname.startsWith("/quiz");
  return pathname.startsWith(href);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const focus = pathname.startsWith("/onboarding");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored === "dark" || stored === "light" ? stored : prefersDark ? "dark" : "light";
    setTheme(next);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_KEY, next);
  }

  return (
    <div className="app">
      <a className="skip" href="#content">
        تخطي إلى المحتوى
      </a>
      <header className="topbar">
        <Link className="brand" href="/">
          <strong>اعرف ربك</strong>
          <span>أسماء • صفات • عقيدة</span>
        </Link>
        <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "المظهر الفاتح" : "المظهر الداكن"}>
          {theme === "dark" ? "☼" : "☾"}
        </button>
      </header>
      <main id="content" className={focus ? "main is-focus" : "main"}>
        {children}
      </main>
      {focus ? null : (
        <nav className="tabbar" aria-label="التنقل الرئيسي">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const current = isActive(pathname, tab.href);
            return (
              <Link key={tab.href} className="tab" href={tab.href} aria-current={current ? "page" : undefined}>
                <Icon />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);
  return null;
}
