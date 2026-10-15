import { NextResponse } from "next/server";

// Dorar Al-Sunniyyah is paused. Their Aqeedah API requires a private token,
// so the app does not call it. Religious content stays on the approved book.
// To restore it later, wire this route back to searchDorar in src/lib/dorar.ts.

export function GET() {
  return NextResponse.json(
    {
      ok: false,
      code: "dorar_disabled",
      message: "تكامل الدرر السنية متوقف لأنه يحتاج رمز وصول. المصدر المعتمد حاليًا هو الكتاب.",
      results: [],
    },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
