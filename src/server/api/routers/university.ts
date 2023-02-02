import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const universityRouter = createTRPCRouter({

    /**
     * Get a university by its ID.
     */
    getById: publicProcedure
        .input(z.object({ id: z.string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
            }) }))
        .query(({ input, ctx }) => {
            return ctx.prisma.university.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    /**
     * Get all universities
     */
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.university.findMany();
    }),

    /**
     * Get number of user in a university.
     * @param id The ID of the university to get the number of users.
     */
    getUserCount: publicProcedure
        .input(z.object({ id: z.string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
            }) }))
        .query(({ input, ctx }) => {
            return ctx.prisma.user.count({
                where: {
                   university : {
                       id : input.id
                   }
                }
            });
        }),

    /**
     * Get number of courses in a university.
     * @param id The ID of the university to get the number of courses.
     */
    getCoursesCount: publicProcedure
        .input(z.object({ id: z.string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
            }) }))
        .query(({ input, ctx }) => {
            return ctx.prisma.course.count({
                where: {
                    section : {
                        section : {
                            university : {
                                id : input.id
                            }
                        }
                   }
                }
            });
        }),

    /**
     * Get number of chapters in a university.
     * @param id The ID of the university to get the number of chapters.
     */
    getChaptersCount: publicProcedure
        .input(z.object({ id: z.string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
            }) }))
        .query(({ input, ctx }) => {
            return ctx.prisma.chapter.count({
                where: {
                    course : {
                        section : {
                            section : {
                                university : {
                                    id : input.id
                                }
                            }
                       }
                    }
                }
            });
        }),
});
