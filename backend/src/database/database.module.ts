import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseUrl } from "../config/env";
import { entities } from "./entities";
import { InitialSchema1740000000000 } from "./migrations/1740000000000-InitialSchema";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const url = databaseUrl();
        if (!url) {
          throw new Error("DATABASE_URL is required to connect.");
        }
        return {
          type: "postgres" as const,
          url,
          entities,
          migrations: [InitialSchema1740000000000],
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
