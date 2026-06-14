import { buildAuth } from "#/lib/auth";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "#/db/schema";

export const auth = buildAuth(
  drizzle(new Database(":memory:"), { schema }),
  "http://localhost:3000",
);
