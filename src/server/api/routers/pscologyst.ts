import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const psychologistRouter = createTRPCRouter({
  getPsychologists: protectedProcedure.query(({ ctx }) => {
    const psychologist = ctx.db.psychologist.findMany({});
    return psychologist;
  }),
});
