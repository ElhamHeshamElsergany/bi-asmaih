import { AqeedahCategory } from "../aqeedah/aqeedah-category.entity";
import { AqeedahTopic } from "../aqeedah/aqeedah-topic.entity";
import { TopicHadithEvidence } from "../aqeedah/topic-hadith-evidence.entity";
import { TopicQuranEvidence } from "../aqeedah/topic-quran-evidence.entity";
import { AllahAttribute } from "../attributes/allah-attribute.entity";
import { NameAttributeLink } from "../attributes/name-attribute-link.entity";
import { Book } from "../books/book.entity";
import { BookChunk } from "../books/book-chunk.entity";
import { BookSection } from "../books/book-section.entity";
import { Hadith } from "../hadith/hadith.entity";
import { AllahName } from "../names/allah-name.entity";
import { QuranVerse } from "../quran/quran-verse.entity";

export const entities = [
  Book,
  BookSection,
  BookChunk,
  AqeedahCategory,
  AqeedahTopic,
  AllahName,
  AllahAttribute,
  NameAttributeLink,
  QuranVerse,
  Hadith,
  TopicQuranEvidence,
  TopicHadithEvidence,
];
