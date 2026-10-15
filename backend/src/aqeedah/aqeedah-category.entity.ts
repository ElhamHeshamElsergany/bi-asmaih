import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AqeedahTopic } from "./aqeedah-topic.entity";

@Entity({ name: "aqeedah_categories" })
export class AqeedahCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  slug: string;

  @Column({ name: "title_arabic", type: "text" })
  titleArabic: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ name: "order_index", type: "int", default: 0 })
  orderIndex: number;

  @OneToMany(() => AqeedahTopic, (topic) => topic.category)
  topics: AqeedahTopic[];

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
