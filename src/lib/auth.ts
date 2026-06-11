import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "#/db";
import * as schema from "#/db/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

export function getAuth(env?: Env) {
	const db = env ? getDb(env) : drizzle(new Database(":memory:"), { schema });

	return betterAuth({
		baseURL: env?.BETTER_AUTH_URL ?? "http://localhost:3000",
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

// to generate schema with better-auth cli
export const auth = getAuth();
