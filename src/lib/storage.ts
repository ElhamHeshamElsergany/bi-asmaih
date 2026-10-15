import type { Intent, ProgressState } from "@/lib/types";

const ONBOARD_KEY = "irab-onboarding";
const PROGRESS_KEY = "irab-progress";
export const THEME_KEY = "irab-theme";

export const emptyProgress: ProgressState = {
  intent: null,
  read: [],
  bookmarks: [],
  quizzes: {},
  path: [],
};

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function loadOnboarding(): { intent: Intent } | null {
  const value = readJson<{ intent?: Intent }>(ONBOARD_KEY);
  if (!value?.intent) return null;
  return { intent: value.intent };
}

export function saveOnboarding(intent: Intent) {
  window.localStorage.setItem(ONBOARD_KEY, JSON.stringify({ intent, at: new Date().toISOString() }));
}

export function loadProgress(): ProgressState {
  const value = readJson<ProgressState>(PROGRESS_KEY);
  if (!value) return emptyProgress;
  return {
    intent: value.intent ?? null,
    read: value.read ?? [],
    bookmarks: value.bookmarks ?? [],
    quizzes: value.quizzes ?? {},
    path: value.path ?? [],
  };
}

export function saveProgress(progress: ProgressState) {
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
