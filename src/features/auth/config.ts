import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { getDb } from "@/db";
import * as schema from "@/db/schema";

export function buildAuth(db: DB, baseURL: string) {
  return betterAuth({
    baseURL,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),
    plugins: [tanstackStartCookies()],
    emailAndPassword: {
      enabled: true,
    },
  });
}

export function getAuth(env: Env) {
  return buildAuth(getDb(env), env.BETTER_AUTH_URL);
}
