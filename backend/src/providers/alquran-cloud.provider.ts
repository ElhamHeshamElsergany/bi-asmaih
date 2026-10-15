import { Injectable } from "@nestjs/common";
import { quranApiBaseUrl } from "../config/env";
import { QuranProvider, QuranVerseText } from "./quran-provider";

type AyahResponse = {
  data?: {
    text?: unknown;
  };
};

@Injectable()
export class AlQuranCloudProvider implements QuranProvider {
  readonly sourceName = "alquran.cloud/quran-uthmani";

  async getVerse(surahNumber: number, verseNumber: number): Promise<QuranVerseText | null> {
    if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) return null;
    if (!Number.isInteger(verseNumber) || verseNumber < 1) return null;

    const url = `${quranApiBaseUrl().replace(/\/$/, "")}/ayah/${surahNumber}:${verseNumber}/quran-uthmani`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) return null;

    const body = (await response.json()) as AyahResponse;
    const arabicText = body.data?.text;
    if (typeof arabicText !== "string" || !arabicText.trim()) return null;

    return {
      surahNumber,
      verseNumber,
      arabicText,
      source: this.sourceName,
    };
  }
}
