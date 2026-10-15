import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuranVerse } from "../quran/quran-verse.entity";
import { AqeedahTopic } from "./aqeedah-topic.entity";

@Entity({ name: "topic_quran_evidence" })
export class TopicQuranEvidence {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AqeedahTopic, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "topic_id" })
  topic: AqeedahTopic;

  @ManyToOne(() => QuranVerse, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "verse_id" })
  verse: QuranVerse;

  @Column({ type: "text", nullable: true })
  note: string | null;
}
