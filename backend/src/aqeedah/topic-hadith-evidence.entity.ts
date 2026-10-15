import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hadith } from "../hadith/hadith.entity";
import { AqeedahTopic } from "./aqeedah-topic.entity";

@Entity({ name: "topic_hadith_evidence" })
export class TopicHadithEvidence {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AqeedahTopic, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "topic_id" })
  topic: AqeedahTopic;

  @ManyToOne(() => Hadith, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "hadith_id" })
  hadith: Hadith;

  @Column({ type: "text", nullable: true })
  note: string | null;
}
