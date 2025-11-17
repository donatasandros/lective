import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "../helpers";
import { lecture } from "./lecture";

export const note = sqliteTable("note", {
  id: id(),
  lectureId: text("lecture_id").notNull(),
  content: text("content").notNull(),
  tags: text("tags"),
});

export const lectureRelations = relations(note, ({ one }) => ({
  lecture: one(lecture, {
    fields: [note.lectureId],
    references: [lecture.id],
  }),
}));
