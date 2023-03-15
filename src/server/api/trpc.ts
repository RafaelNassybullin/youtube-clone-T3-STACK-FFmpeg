import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { prisma } from "@/server/data/db";

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts
  return {
    prisma,
    req,
    res
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
