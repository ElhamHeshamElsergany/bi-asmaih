"use client";

import { useEffect, useState } from "react";
import type { ProgressState } from "@/lib/types";
import { emptyProgress, loadOnboarding, loadProgress, saveProgress } from "@/lib/storage";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadProgress();
    const onboarding = loadOnboarding();
    setProgress(onboarding ? { ...stored, intent: onboarding.intent } : stored);
    setReady(true);
  }, []);

  function update(change: (current: ProgressState) => ProgressState) {
    setProgress((current) => {
      const next = change(current);
      saveProgress(next);
      return next;
    });
  }

  return { progress, ready, update };
}
