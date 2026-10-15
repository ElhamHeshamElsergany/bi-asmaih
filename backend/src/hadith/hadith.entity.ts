import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "hadiths" })
export class Hadith {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "arabic_text", type: "text" })
  arabicText: string;

  @Column({ type: "text", nullable: true })
  collection: string | null;

  @Column({ type: "text", nullable: true })
  reference: string | null;

  @Column({ type: "text", nullable: true })
  grading: string | null;

  @Column({ type: "text" })
  source: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
