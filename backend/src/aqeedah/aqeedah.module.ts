import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AqeedahCategory } from "./aqeedah-category.entity";
import { AqeedahTopic } from "./aqeedah-topic.entity";
import { TopicHadithEvidence } from "./topic-hadith-evidence.entity";
import { TopicQuranEvidence } from "./topic-quran-evidence.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AqeedahCategory, AqeedahTopic, TopicQuranEvidence, TopicHadithEvidence])],
  exports: [TypeOrmModule],
})
export class AqeedahModule {}
