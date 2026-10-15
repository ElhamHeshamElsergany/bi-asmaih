import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { hetznerApiBaseUrl, hetznerApiKey, hetznerModel } from "../config/env";
import { loadBookPassages } from "./passages";
import { retrievePassages } from "./retrieve";

export const INSUFFICIENT_ANSWER = "لم أجد في المصادر المتاحة ما يكفي للإجابة عن هذا السؤال.";

const SYSTEM_PROMPT = `أنت تجيب في تطبيق «اعرف ربك».
أجب بالعربية فقط، وبشرح مبسط، اعتمادًا على السياق المرفق حصرًا.
السياق مقاطع من كتاب «أصول الإيمان في ضوء الكتاب والسنة» وقد راجعه المشرف.
لا تستخدم أي معلومة من خارج السياق.
لا تخترع أسماء الله ولا صفاته ولا أحكامًا ولا آيات ولا أحاديث ولا درجات أحاديث ولا آراء.
لا تكمل نصًا مبتورًا أو منقوصًا في السياق.
إذا لم يكف السياق للإجابة عن السؤال فقل هذه الجملة فقط دون زيادة:
${INSUFFICIENT_ANSWER}`;

export type AskSource = {
  book: string;
  page: number;
  section: string;
  excerpt: string;
  label: "النص من المصدر";
};

export type AskResponse = {
  answer: string;
  answerLabel: "شرح مبسط";
  sources: AskSource[];
};

@Injectable()
export class AskService {
  private readonly passages = loadBookPassages();

  async ask(question: string): Promise<AskResponse> {
    const matches = retrievePassages(question, this.passages);
    if (matches.length === 0) {
      return { answer: INSUFFICIENT_ANSWER, answerLabel: "شرح مبسط", sources: [] };
    }

    const key = hetznerApiKey();
    if (!key) {
      throw new ServiceUnavailableException("خدمة الشرح غير مهيأة على الخادم.");
    }

    const context = matches
      .map((passage, index) => `[${index + 1}] ${passage.section}، ص ${passage.page}\n${passage.excerpt}`)
      .join("\n\n");

    const answer = await this.complete(key, `السؤال:\n${question}\n\nالسياق:\n${context}`);
    if (!answer || isInsufficient(answer)) {
      return { answer: INSUFFICIENT_ANSWER, answerLabel: "شرح مبسط", sources: [] };
    }

    return {
      answer,
      answerLabel: "شرح مبسط",
      sources: matches.map((passage) => ({
        book: passage.book,
        page: passage.page,
        section: passage.section,
        excerpt: passage.excerpt,
        label: "النص من المصدر" as const,
      })),
    };
  }

  private async complete(key: string, user: string): Promise<string> {
    const response = await fetch(`${hetznerApiBaseUrl()}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: hetznerModel(),
        temperature: 0.2,
        max_tokens: 900,
        chat_template_kwargs: { enable_thinking: false },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: user },
        ],
      }),
    });

    if (!response.ok) {
      throw new ServiceUnavailableException("تعذر الوصول إلى خدمة الشرح.");
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    return stripReasoning(payload.choices?.[0]?.message?.content ?? "").trim();
  }
}

function stripReasoning(value: string): string {
  return value.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

function isInsufficient(answer: string): boolean {
  const compact = answer.replace(/\s+/g, " ").trim();
  return compact === INSUFFICIENT_ANSWER || compact.startsWith(INSUFFICIENT_ANSWER);
}
