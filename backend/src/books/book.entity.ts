import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BookSection } from "./book-section.entity";
import { BookChunk } from "./book-chunk.entity";

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  authors: string | null;

  @Column({ type: "text", nullable: true })
  publisher: string | null;

  @Column({ type: "text", nullable: true })
  edition: string | null;

  @Column({ type: "text", default: "ar" })
  language: string;

  @Column({ name: "source_url", type: "text", nullable: true })
  sourceUrl: string | null;

  @OneToMany(() => BookSection, (section) => section.book)
  sections: BookSection[];

  @OneToMany(() => BookChunk, (chunk) => chunk.book)
  chunks: BookChunk[];

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
