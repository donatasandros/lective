import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
// biome-ignore lint/performance/noNamespaceImport: ignore
import * as schema from "./schema";

const client = createClient({
  url: process.env.DATABASE_URL || "",
});

export const db = drizzle({ client, schema });
