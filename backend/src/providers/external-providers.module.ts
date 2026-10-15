import { Injectable, Module } from "@nestjs/common";
import { AlQuranCloudProvider } from "./alquran-cloud.provider";
import { HADITH_PROVIDER, HadithProvider } from "./hadith-provider";
import { QURAN_PROVIDER } from "./quran-provider";

@Injectable()
class EmptyHadithProvider implements HadithProvider {
  readonly sourceName = "none";

  async findByReference(): Promise<null> {
    return null;
  }
}

@Module({
  providers: [
    AlQuranCloudProvider,
    { provide: QURAN_PROVIDER, useExisting: AlQuranCloudProvider },
    { provide: HADITH_PROVIDER, useClass: EmptyHadithProvider },
  ],
  exports: [QURAN_PROVIDER, HADITH_PROVIDER, AlQuranCloudProvider],
})
export class ExternalProvidersModule {}
