import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card stack">
      <h1 className="page-title">لم نجد هذه الصفحة</h1>
      <p>المادة المطلوبة غير موجودة في النسخة الحالية.</p>
      <div className="cluster">
        <Link className="btn btn-primary" href="/">
          الرجوع للرئيسية
        </Link>
        <Link className="btn btn-ghost" href="/library">
          تصفّح الأسماء والصفات
        </Link>
      </div>
    </section>
  );
}
