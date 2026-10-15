import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AllahName } from "../names/allah-name.entity";
import { AllahAttribute } from "./allah-attribute.entity";

@Entity({ name: "allah_name_attributes" })
export class NameAttributeLink {
  @PrimaryColumn({ name: "name_id", type: "uuid" })
  nameId: string;

  @PrimaryColumn({ name: "attribute_id", type: "uuid" })
  attributeId: string;

  @ManyToOne(() => AllahName, { onDelete: "CASCADE" })
  @JoinColumn({ name: "name_id" })
  name: AllahName;

  @ManyToOne(() => AllahAttribute, { onDelete: "CASCADE" })
  @JoinColumn({ name: "attribute_id" })
  attribute: AllahAttribute;

  @Column({ name: "source_reference", type: "text" })
  sourceReference: string;

  @Column({ name: "book_page", type: "int", nullable: true })
  bookPage: number | null;
}
