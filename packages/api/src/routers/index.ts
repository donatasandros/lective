import { publicProcedure, router } from "../index";
import { lectureRouter } from "./lecture";
import { subjectRouter } from "./subject";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => "OK"),
  lecture: lectureRouter,
  subject: subjectRouter,
});
export type AppRouter = typeof appRouter;
