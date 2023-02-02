import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import {universityRouter} from "./routers/university";
import {sectionRouter} from "./routers/section";
import {courseRouter} from "./routers/course";
import {quizRouter} from "./routers/quiz";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  university: universityRouter,
  section: sectionRouter,
  course: courseRouter,
  quiz: quizRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
