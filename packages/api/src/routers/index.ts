import { publicProcedure, router } from "../index";
import { lectureRouter } from "./lecture";
import { noteRouter } from "./note";
import { subjectRouter } from "./subject";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => "OK"),
  lecture: lectureRouter,
  subject: subjectRouter,
  note: noteRouter,
});
export type AppRouter = typeof appRouter;
