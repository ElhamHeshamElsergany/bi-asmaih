export type TopicType = "name" | "attribute" | "concept";

export type EvidenceType = "quran" | "hadith" | "athar";

export type SimplifiedWording = {
  text: string;
  kind: "simplified-draft";
};

export type Evidence = {
  type: EvidenceType;
  text: string;
  reference: string;
  source: string;
};

export type BookReference = {
  bookTitle: string;
  page: number;
  excerpt: string;
};

export type DorarReference = {
  title: string;
  url: string;
  sourceText: string;
  fetchedAt: string;
};

export type Topic = {
  id: string;
  slug: string;
  type: TopicType;
  titleArabic: string;
  question: string;
  estimatedMinutes: number;
  shortExplanation: SimplifiedWording;
  detailedExplanation: SimplifiedWording;
  deepExplanation: SimplifiedWording;
  lessons: SimplifiedWording[];
  emptyLesson?: string;
  evidence: Evidence[];
  relatedTopics: string[];
  bookReferences: BookReference[];
  dorarReferences: DorarReference[];
  sourceVerified: boolean;
  tags: string[];
  searchKeywords: string[];
  scopeNote?: string;
};

export type Intent = "foundation" | "names" | "review" | "deep";

export type ProgressState = {
  intent: Intent | null;
  read: string[];
  bookmarks: string[];
  quizzes: Record<string, boolean>;
  path: string[];
};
