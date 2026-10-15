import { Controller, Get, Inject, Optional } from "@nestjs/common";
import { DataSource } from "typeorm";
import { databaseUrl, hetznerApiKey } from "../config/env";

@Controller("health")
export class HealthController {
  constructor(@Optional() @Inject(DataSource) private readonly dataSource?: DataSource) {}

  @Get()
  async health() {
    let database: "connected" | "not_configured" | "unavailable" = databaseUrl() ? "unavailable" : "not_configured";
    if (this.dataSource?.isInitialized) {
      try {
        await this.dataSource.query("SELECT 1");
        database = "connected";
      } catch {
        database = "unavailable";
      }
    }

    return {
      status: "ok",
      database,
      quranProvider: "alquran.cloud/quran-uthmani",
      trustedAqeedahSource: "أصول الإيمان في ضوء الكتاب والسنة",
      ask: hetznerApiKey() ? "configured" : "not_configured",
    };
  }
}
