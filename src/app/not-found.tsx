import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card stack">
      <h1 className="page-title">ما لقينا الصفحة</h1>
      <p>المادة المطلوبة غير موجودة في النسخة الحالية.</p>
      <Link className="btn btn-primary" href="/">
        الرجوع للرئيسية
      </Link>
    </section>
  );
}
