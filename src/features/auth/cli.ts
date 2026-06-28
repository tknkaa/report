import { buildAuth } from "./config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/db/schema";

export const auth = buildAuth(
  drizzle(createClient({ url: "file::memory:" }), { schema }),
  "http://localhost:3000",
);
