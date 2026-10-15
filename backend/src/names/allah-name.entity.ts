import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "../books/book.entity";

@Entity({ name: "allah_names" })
export class AllahName {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  slug: string;

  @Column({ name: "name_arabic", type: "text" })
  nameArabic: string;

  @Column({ type: "text", nullable: true })
  meaning: string | null;

  @Column({ type: "text", nullable: true })
  explanation: string | null;

  @Column({ type: "text", nullable: true })
  evidence: string | null;

  @Column({ name: "source_reference", type: "text", nullable: true })
  sourceReference: string | null;

  @Column({ name: "book_page", type: "int", nullable: true })
  bookPage: number | null;

  @ManyToOne(() => Book, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "book_id" })
  book: Book | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
