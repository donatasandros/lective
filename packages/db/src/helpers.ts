import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const id = () =>
  text("id")
    .primaryKey()
    .$default(() => randomUUID());

export const createdAt = () =>
  text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull();
