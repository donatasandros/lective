import { db } from "@lective/db";
import { lecture, note } from "@lective/db/schema/index";
import { eq } from "drizzle-orm";
import z from "zod";
import { publicProcedure, router } from "../index";

export const noteRouter = router({
  getOneByLectureId: publicProcedure.input(z.object({ id: z.uuid() })).query(
    async ({ input }) =>
      await db.query.note.findFirst({
        where: eq(note.lectureId, input.id),
      })
  ),
  create: publicProcedure
    .input(z.object({ subjectId: z.uuid(), title: z.string().min(1) }))
    .mutation(
      async ({ input }) =>
        await db.insert(lecture).values({
          date: new Date().toDateString(),
          subjectId: input.subjectId,
          title: input.title,
        })
    ),
});
