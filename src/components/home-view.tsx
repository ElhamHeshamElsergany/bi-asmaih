"use client";

import Link from "next/link";
import { featured, intentCopy, pathSteps } from "@/content/learning";
import { getTopic, topics } from "@/content/topics";
import { minutesLabel } from "@/lib/arabic";
import { pagePath } from "@/lib/site";
import { saveOnboarding } from "@/lib/storage";
import type { Intent } from "@/lib/types";
import { ArchIcon, ArrowIcon, BookIcon, CheckIcon, ClockIcon, Pattern, QuestionIcon, SearchIcon } from "@/components/icons";
import { SourceBadge } from "@/components/source-badge";
import { useProgress } from "@/components/use-progress";

const intents = Object.keys(intentCopy) as Intent[];
const nameCount = topics.filter((topic) => topic.type === "name").length;
const attributeCount = topics.filter((topic) => topic.type === "attribute").length;
const husna = getTopic("husna");
const heroVerse = husna?.evidence.find((item) => item.reference === "الأعراف: 180");

const quickLinks = [
  { href: "/library?type=name", title: "أسماء الله", hint: `${nameCount} مواد مشروحة`, icon: ArchIcon },
  { href: "/library?type=attribute", title: "صفات الله", hint: `${attributeCount} مواد مشروحة`, icon: BookIcon },
  { href: "/discover#sayings", title: "عبارات شائعة", hint: "هل هي صحيحة؟", icon: QuestionIcon },
  { href: "/discover#quiz", title: "اختبر فهمك", hint: "أسئلة قصيرة", icon: CheckIcon },
];

const audiences = [
  {
    kicker: "لطالب العلم",
    title: "القواعد ونص الكتاب",
    body: "كيف يثبت الاسم؟ ولماذا الأسماء توقيفية؟ اقرأ القاعدة ثم ارجع إلى نص الكتاب ورقم الصفحة.",
    href: "/topic/tawqifi",
    cta: "ابدأ بالقواعد",
  },
  {
    kicker: "لكل مسلم",
    title: "اعرف ربك خطوة بخطوة",
    body: "اسم واحد في دقيقة: معنى مبسط، ثم آية أو حديث، ثم ما تتعلمه منه في حياتك.",
    href: "/topic/iman-billah",
    cta: "ابدأ من الأساس",
  },
];

export function HomeView({ featuredIndex }: { featuredIndex: number }) {
  const { progress, ready, update } = useProgress();
  const card = featured[featuredIndex] ?? featured[0];
  const topic = getTopic(card.slug);
  const intent = progress.intent ? intentCopy[progress.intent] : null;
  const isDone = (step: (typeof pathSteps)[number]) =>
    progress.path.includes(step.id) || progress.read.some((slug) => step.href.endsWith(slug));
  const doneCount = pathSteps.filter(isDone).length;
  const nextStep = pathSteps.find((step) => !isDone(step)) ?? pathSteps[0];

  function chooseIntent(value: Intent) {
    saveOnboarding(value);
    update((current) => ({ ...current, intent: value }));
  }

  return (
    <div className="stack home">
      <section className="verse-hero stack">
        <Pattern />
        {heroVerse ? (
          <figure className="verse">
            <blockquote>﴿{heroVerse.text}﴾</blockquote>
            <figcaption>{heroVerse.reference}</figcaption>
          </figure>
        ) : null}
        <h1 className="page-title">اعرف ربك بأسمائه وصفاته</h1>
        <p className="lead">خلاصة قصيرة، ثم الدليل من القرآن والسنة، ثم نص الكتاب ورقم الصفحة.</p>
        <form className="search" action={pagePath("/search")} role="search">
          <label className="sr-only" htmlFor="home-search">
            ابحث عن اسم أو صفة
          </label>
          <input id="home-search" name="q" placeholder="ابحث: الرحمن، العليم، السمع…" enterKeyHint="search" />
          <button className="btn btn-primary" type="submit" aria-label="بحث">
            <SearchIcon />
          </button>
        </form>
      </section>

      <ul className="trust" aria-label="منهجنا">
        <li>
          <CheckIcon /> موثّق بالكتاب والصفحة
        </li>
        <li>
          <BookIcon /> {topics.length} مادة مشروحة
        </li>
        <li>
          <ClockIcon /> دقيقتان أو أقل للمادة
        </li>
      </ul>

      {ready && !intent ? (
        <section className="card stack">
          <p className="kicker">مرحبًا بك</p>
          <h2>من أين تحب أن تبدأ؟</h2>
          <div className="intent-grid">
            {intents.map((item) => (
              <button key={item} className="choice" type="button" onClick={() => chooseIntent(item)}>
                {intentCopy[item].label}
              </button>
            ))}
          </div>
          <p className="meta">اختيارك لاقتراح البداية فقط، وتستطيع تغييره من صفحة «تقدمي».</p>
        </section>
      ) : null}

      {intent ? (
        <Link className="card card-link suggestion" href={intent.href}>
          <span className="stack tight">
            <span className="kicker">مقترح لك: {intent.label}</span>
            <strong>{intent.hint}</strong>
          </span>
          <ArrowIcon />
        </Link>
      ) : null}

      {topic ? (
        <article className="card hero stack">
          <Pattern />
          <div className="cluster">
            <span className="type-pill">سؤال اليوم</span>
            <span className="meta">{minutesLabel(topic.estimatedMinutes)}</span>
          </div>
          <h2 className="question">{card.question}</h2>
          <p className="label-draft">صياغة مبسطة من نص الكتاب، وليست نص المصدر.</p>
          <p>{card.summary}</p>
          {topic.evidence[0] ? (
            <figure className="evidence">
              <blockquote className="source-text">{topic.evidence[0].text}</blockquote>
              <figcaption className="meta">{topic.evidence[0].reference}</figcaption>
            </figure>
          ) : null}
          <div className="cluster">
            <Link className="btn btn-primary" href={`/topic/${topic.slug}`}>
              تعمّق أكثر
            </Link>
            <SourceBadge books={topic.bookReferences} />
          </div>
        </article>
      ) : null}

      <nav className="quick-grid" aria-label="أقسام">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} className="quick" href={item.href}>
              <span className="quick-icon">
                <Icon />
              </span>
              <strong>{item.title}</strong>
              <span className="meta">{item.hint}</span>
            </Link>
          );
        })}
      </nav>

      <section className="stack">
        <h2>طريقان للتعلّم</h2>
        <div className="audience-grid">
          {audiences.map((item) => (
            <Link key={item.kicker} className="card card-link audience" href={item.href}>
              <span className="stack tight">
                <span className="kicker">{item.kicker}</span>
                <strong>{item.title}</strong>
                <span className="quiet">{item.body}</span>
                <span className="text-btn">{item.cta}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="card stack">
        <div className="cluster spread">
          <p className="kicker">مسار التعلّم</p>
          {ready ? (
            <span className="meta">
              {doneCount} من {pathSteps.length}
            </span>
          ) : null}
        </div>
        <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={pathSteps.length} aria-valuenow={ready ? doneCount : 0} aria-label="تقدّم المسار">
          <span style={{ width: `${ready ? (doneCount / pathSteps.length) * 100 : 0}%` }} />
        </div>
        <h2>{nextStep.title}</h2>
        <div className="cluster">
          <Link className="btn btn-soft" href={nextStep.href}>
            {doneCount > 0 ? "أكمل المسار" : "ابدأ المسار"}
          </Link>
          <Link className="text-btn" href="/progress">
            كل الخطوات
          </Link>
        </div>
      </section>
    </div>
  );
}
