import { db } from "@lective/db";
import { subject } from "@lective/db/schema/index";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
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
  getOneById: publicProcedure
    .input(z.object({ id: z.uuid() }))
    .query(async ({ input }) => {
      const foundSubject = await db.query.subject.findFirst({
        where: eq(subject.id, input.id),
        with: {
          lectures: true,
        },
      });

      if (!foundSubject) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subject not found",
        });
      }

      return foundSubject;
    }),
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
