import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuranVerse } from "./quran-verse.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuranVerse])],
  exports: [TypeOrmModule],
})
export class QuranModule {}
