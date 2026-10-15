import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AqeedahModule } from "./aqeedah/aqeedah.module";
import { AttributesModule } from "./attributes/attributes.module";
import { BooksModule } from "./books/books.module";
import { databaseUrl } from "./config/env";
import { DatabaseModule } from "./database/database.module";
import { HadithModule } from "./hadith/hadith.module";
import { HealthController } from "./health/health.controller";
import { NamesModule } from "./names/names.module";
import { ExternalProvidersModule } from "./providers/external-providers.module";
import { QuranModule } from "./quran/quran.module";

const persistence = databaseUrl()
  ? [DatabaseModule, BooksModule, AqeedahModule, NamesModule, AttributesModule, QuranModule, HadithModule]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    ExternalProvidersModule,
    ...persistence,
  ],
  controllers: [HealthController],
})
export class AppModule {}
