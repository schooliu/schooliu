import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const universityRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.university.findUnique({
                where: {
                    id: input.id,
                }
            });
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.university.findMany();
    }),

    getUserCount: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.user.count({
                where: {
                   university : {
                       id : input.id
                   }
                }
            });
        }),
});
