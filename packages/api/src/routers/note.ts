import { db } from "@lective/db";
import { note } from "@lective/db/schema/index";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import z from "zod";
import { publicProcedure, router } from "../index";

export const noteRouter = router({
  getOneByLectureId: publicProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ input }) => {
      const foundNote = await db.query.note.findFirst({
        where: eq(note.lectureId, input.id),
      });

      if (!foundNote) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }

      return foundNote;
    }),
  create: publicProcedure
    .input(z.object({ lectureId: z.uuid(), content: z.string().min(1) }))
    .mutation(async ({ input }) => {
      console.log(input);

      await db
        .update(note)
        .set({
          lectureId: input.lectureId,
          content: input.content,
        })
        .where(eq(note.lectureId, input.lectureId));
    }),
});
