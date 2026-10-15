export type QuranVerseText = {
  surahNumber: number;
  verseNumber: number;
  arabicText: string;
  source: string;
};

export interface QuranProvider {
  readonly sourceName: string;
  getVerse(surahNumber: number, verseNumber: number): Promise<QuranVerseText | null>;
}

export const QURAN_PROVIDER = Symbol("QURAN_PROVIDER");
