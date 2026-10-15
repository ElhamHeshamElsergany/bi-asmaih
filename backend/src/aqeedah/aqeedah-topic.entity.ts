import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "../books/book.entity";
import { AqeedahCategory } from "./aqeedah-category.entity";

@Entity({ name: "aqeedah_topics" })
export class AqeedahTopic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AqeedahCategory, (category) => category.topics, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category: AqeedahCategory | null;

  @Column({ type: "text", unique: true })
  slug: string;

  @Column({ name: "title_arabic", type: "text" })
  titleArabic: string;

  @Column({ name: "original_text", type: "text", nullable: true })
  originalText: string | null;

  @Column({ name: "simplified_explanation", type: "text", nullable: true })
  simplifiedExplanation: string | null;

  @ManyToOne(() => Book, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "book_id" })
  book: Book | null;

  @Column({ name: "page_start", type: "int", nullable: true })
  pageStart: number | null;

  @Column({ name: "page_end", type: "int", nullable: true })
  pageEnd: number | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
