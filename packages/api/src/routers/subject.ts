import { db } from "@lective/db";
import { subject } from "@lective/db/schema/index";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { publicProcedure, router } from "../index";

export const subjectRouter = router({
  getMany: publicProcedure.query(
    async () =>
      await db.query.subject.findMany({
        with: {
          lectures: {
            columns: {
              id: true,
            },
          },
        },
      })
  ),
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const [createdSubject] = await db
        .insert(subject)
        .values({
          name: input.name,
        })
        .returning();

      if (!createdSubject) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create subject",
        });
      }

      return createdSubject;
    }),
});
