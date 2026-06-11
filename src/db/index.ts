import { drizzle } from "drizzle-orm/d1";

export function getDb(env: Env) {
	const db = drizzle(env.DB);
	return db;
}
