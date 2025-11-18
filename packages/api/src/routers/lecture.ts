import { db } from "@lective/db";
import { lecture } from "@lective/db/schema/index";
import { eq } from "drizzle-orm";
import z from "zod";
import { publicProcedure, router } from "../index";

export const lectureRouter = router({
  getManyBySubjectId: publicProcedure.input(z.object({ id: z.uuid() })).query(
    async ({ input }) =>
      await db.query.lecture.findMany({
        where: eq(lecture.subjectId, input.id),
      })
  ),
  getOneById: publicProcedure.input(z.object({ id: z.uuid() })).query(
    async ({ input }) =>
      await db.query.lecture.findFirst({
        where: eq(lecture.id, input.id),
        with: {
          notes: true,
        },
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
