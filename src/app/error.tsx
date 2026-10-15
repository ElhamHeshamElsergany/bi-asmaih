"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="card stack">
      <h1 className="page-title">تعذّر فتح الصفحة</h1>
      <p>صار خلل في العرض. المحتوى المحفوظ في المصادر لم يتغير.</p>
      <button className="btn btn-primary" type="button" onClick={reset}>
        حاول مرة أخرى
      </button>
    </section>
  );
}
