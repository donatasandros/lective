import { db } from "@lective/db";
import { subject } from "@lective/db/schema/subject";
import z from "zod";
import { publicProcedure, router } from "../index";

export const subjectRouter = router({
  getMany: publicProcedure.query(async () => await db.query.subject.findMany()),
  create: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(
    async ({ input }) =>
      await db.insert(subject).values({
        name: input.name,
      })
  ),
});
