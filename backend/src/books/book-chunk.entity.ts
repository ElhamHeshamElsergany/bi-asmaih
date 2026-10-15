import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "./book.entity";
import { BookSection } from "./book-section.entity";

@Entity({ name: "book_chunks" })
export class BookChunk {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Book, (book) => book.chunks, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => BookSection, (section) => section.chunks, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "section_id" })
  section: BookSection | null;

  @Column({ type: "text" })
  content: string;

  @Column({ name: "normalized_content", type: "text" })
  normalizedContent: string;

  @Column({ name: "page_start", type: "int", nullable: true })
  pageStart: number | null;

  @Column({ name: "page_end", type: "int", nullable: true })
  pageEnd: number | null;

  @Column({ type: "jsonb", default: {} })
  metadata: Record<string, unknown>;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
