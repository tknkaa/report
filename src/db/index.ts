import { drizzle } from "drizzle-orm/libsql";

export function getDb(env: Env) {
  const db = drizzle({
    connection: {
      url: env.DATABASE_URL,
      authToken: env.DATABASE_AUTH_TOKEN,
    },
  });
  return db;
}
