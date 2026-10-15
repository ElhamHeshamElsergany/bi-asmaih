import { NextRequest, NextResponse } from "next/server";
import { searchDorar } from "@/lib/dorar";

const ins = new Set(["title", "text", "both"]);

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const limitRaw = Number(request.nextUrl.searchParams.get("limit") ?? "8");
  const scope = request.nextUrl.searchParams.get("in") ?? "both";
  const highlight = request.nextUrl.searchParams.get("highlight") === "1" ? 1 : 0;

  if (q.length < 2 || q.length > 200 || !ins.has(scope) || !Number.isInteger(limitRaw) || limitRaw < 1 || limitRaw > 20) {
    return NextResponse.json(
      { ok: false, message: "لا يوجد لدينا مصدر كافٍ للإجابة على هذا السؤال حاليًا.", results: [], code: "invalid_request" },
      { status: 400 },
    );
  }

  const result = await searchDorar({
    q,
    limit: limitRaw,
    in: scope as "title" | "text" | "both",
    highlight,
  });

  return NextResponse.json(result, {
    status: result.ok ? 200 : 503,
    headers: { "Cache-Control": result.ok ? "public, max-age=300" : "no-store" },
  });
}
