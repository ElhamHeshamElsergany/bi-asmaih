"use client";

import { useProgress } from "@/components/use-progress";

export function TopicActions({ slug }: { slug: string }) {
  const { progress, ready, update } = useProgress();
  const saved = progress.bookmarks.includes(slug);
  const read = progress.read.includes(slug);

  if (!ready) return null;

  return (
    <div className="cluster">
      <button
        className="btn btn-ghost"
        type="button"
        onClick={() =>
          update((current) => ({
            ...current,
            bookmarks: saved ? current.bookmarks.filter((item) => item !== slug) : [...current.bookmarks, slug],
          }))
        }
      >
        {saved ? "محفوظ في مكتبتي" : "احفظ في مكتبتي"}
      </button>
      <button
        className="btn btn-soft"
        type="button"
        onClick={() =>
          update((current) => ({
            ...current,
            read: read ? current.read : [...current.read, slug],
          }))
        }
      >
        {read ? "أتممت الخلاصة" : "أتممت هذه الخلاصة"}
      </button>
    </div>
  );
}
