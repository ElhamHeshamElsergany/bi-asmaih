import "reflect-metadata";
import { DataSource } from "typeorm";
import { databaseUrl } from "../config/env";
import { entities } from "./entities";
import { InitialSchema1740000000000 } from "./migrations/1740000000000-InitialSchema";

const url = databaseUrl();
if (!url) {
  throw new Error("DATABASE_URL is required to run migrations.");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url,
  entities,
  migrations: [InitialSchema1740000000000],
  synchronize: false,
});
