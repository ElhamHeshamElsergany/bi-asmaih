"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { intentCopy } from "@/content/learning";
import type { Intent } from "@/lib/types";
import { saveOnboarding, saveProgress, loadProgress } from "@/lib/storage";
import { Pattern } from "@/components/icons";

const intents = Object.keys(intentCopy) as Intent[];

export function OnboardingView() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [intent, setIntent] = useState<Intent | null>(null);

  function finish() {
    if (!intent) return;
    saveOnboarding(intent);
    saveProgress({ ...loadProgress(), intent });
    router.replace("/");
  }

  if (step === 1) {
    return (
      <section className="card hero stack" style={{ minHeight: "70vh", justifyContent: "flex-end" }}>
        <Pattern />
        <p className="kicker">ببساطة، ومن مصدر يمكنك الرجوع إليه</p>
        <h1 className="display">اعرف ربك</h1>
        <p className="lead">تعلّم أسماء الله وصفاته بطريقة بسيطة، موثوقة، وقريبة منك.</p>
        <button className="btn btn-primary" type="button" onClick={() => setStep(2)}>
          ابدأ
        </button>
      </section>
    );
  }

  return (
    <section className="stack">
      <header className="stack">
        <h1 className="page-title">إنت هنا علشان…</h1>
        <p className="quiet">نستخدم اختيارك لاقتراح البداية فقط. تقدر تغيّره وقت ما تحب.</p>
      </header>
      <div className="stack">
        {intents.map((item) => (
          <button key={item} className="choice" type="button" aria-pressed={intent === item} onClick={() => setIntent(item)}>
            {intentCopy[item].label}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" type="button" disabled={!intent} onClick={finish}>
        متابعة
      </button>
    </section>
  );
}
