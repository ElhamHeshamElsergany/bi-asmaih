import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";
import { BookChunk } from "./book-chunk.entity";

export type SectionLevel = "chapter" | "section" | "subsection";

@Entity({ name: "book_sections" })
export class BookSection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Book, (book) => book.sections, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @ManyToOne(() => BookSection, (section) => section.children, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent: BookSection | null;

  @OneToMany(() => BookSection, (section) => section.parent)
  children: BookSection[];

  @Column({ type: "text" })
  level: SectionLevel;

  @Column({ type: "text" })
  title: string;

  @Column({ name: "order_index", type: "int" })
  orderIndex: number;

  @Column({ name: "page_start", type: "int", nullable: true })
  pageStart: number | null;

  @Column({ name: "page_end", type: "int", nullable: true })
  pageEnd: number | null;

  @OneToMany(() => BookChunk, (chunk) => chunk.section)
  chunks: BookChunk[];

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
