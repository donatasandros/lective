import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../helpers";

export const subject = sqliteTable("subject", {
  id: id(),
  name: text("text").notNull(),
  createdAt: createdAt(),
});
