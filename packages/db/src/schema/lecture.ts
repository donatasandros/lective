import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../helpers";
import { note } from "./note";
import { subject } from "./subject";

export const lecture = sqliteTable("lecture", {
  id: id(),
  subjectId: text("subject_id").notNull(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  createdAt: createdAt(),
});

export const lectureRelations = relations(lecture, ({ one, many }) => ({
  subject: one(subject, {
    fields: [lecture.subjectId],
    references: [subject.id],
  }),
  notes: many(note),
}));
