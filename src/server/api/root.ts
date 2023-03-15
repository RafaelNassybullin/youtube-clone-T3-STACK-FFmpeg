import { createTRPCRouter } from "@/server/api/trpc";
import { clientRouter } from "@/server/api/routers/client";

export const appRouter = createTRPCRouter({
  client: clientRouter
});

export type AppRouter = typeof appRouter;
