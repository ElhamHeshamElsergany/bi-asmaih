import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv();

export function optionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function databaseUrl(): string | undefined {
  return optionalEnv("DATABASE_URL");
}

export function quranApiBaseUrl(): string {
  return optionalEnv("QURAN_API_BASE_URL") ?? "https://api.alquran.cloud/v1";
}

export function frontendOrigins(): string[] {
  const raw = optionalEnv("FRONTEND_ORIGIN") ?? "http://localhost:3000,http://localhost:3001";
  return raw.split(",").map((origin) => origin.trim()).filter(Boolean);
}

export function listenPort(): number {
  const port = Number(optionalEnv("PORT") ?? "4000");
  return Number.isInteger(port) && port > 0 ? port : 4000;
}
