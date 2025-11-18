import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../helpers";

export const subject = sqliteTable("subject", {
  id: id(),
  name: text("text").notNull(),
  createdAt: createdAt(),
});

export const subjectRelations = relations(subject, ({ many }) => ({
  lectures: many(lecture),
}));

export const lecture = sqliteTable("lecture", {
  id: id(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subject.id),
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

export const note = sqliteTable("note", {
  id: id(),
  lectureId: text("lecture_id")
    .notNull()
    .references(() => lecture.id),
  content: text("content").notNull(),
  tags: text("tags"),
});

export const noteRelations = relations(note, ({ one }) => ({
  lecture: one(lecture, {
    fields: [note.lectureId],
    references: [lecture.id],
  }),
}));
