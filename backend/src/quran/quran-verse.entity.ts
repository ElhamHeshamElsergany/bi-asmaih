import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: "quran_verses" })
@Unique("quran_verses_identity", ["surahNumber", "verseNumber", "source"])
export class QuranVerse {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "surah_number", type: "int" })
  surahNumber: number;

  @Column({ name: "verse_number", type: "int" })
  verseNumber: number;

  @Column({ name: "arabic_text", type: "text" })
  arabicText: string;

  @Column({ type: "text" })
  source: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
