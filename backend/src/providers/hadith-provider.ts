export type HadithText = {
  arabicText: string;
  collection: string | null;
  reference: string | null;
  grading: string | null;
  source: string;
};

export interface HadithProvider {
  readonly sourceName: string;
  findByReference(collection: string, reference: string): Promise<HadithText | null>;
}

export const HADITH_PROVIDER = Symbol("HADITH_PROVIDER");
