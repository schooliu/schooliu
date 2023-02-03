import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const quizRouter = createTRPCRouter({

    /**
     * Get a quiz by its ID.
     */
    getById: publicProcedure
        .input(z.object({ id: z.number({
                required_error: "ID is required",
                invalid_type_error: "ID must be an integer",
            }).int("ID must be an integer")
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.quiz.findUnique({
                where: {
                    id: input.id,
                },
                select: {
                    id: true,
                    name: true,
                    questions : {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            image : true,
                            type : true,
                            mCQ : true,
                            numberAnswer : true,
                            textAnswer : true,
                        }
                    }
                },
            });
        }),

    /**
     * Get all quiz from a Course id
     * @param courseID The ID of the course to get quiz for.
     */
    getAllQuizBySectionYearId: publicProcedure
        .input(z.object({ courseID: z.number({
                required_error: "courseID is required",
                invalid_type_error: "courseID must be an integer",
            }).int("courseID must be an integer")
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.quiz.findMany({
                where: {
                    course: {
                        id : input.courseID
                    },
                },
            });
        }),


    /**
     * Get all quiz from a UnivID, section slug, sectionyear slug, course slug and quiz slug
     * @param univID The ID of the university of the quiz.
     * @param sectionSlug The slug of the section of the quiz.
     * @param sectionYearSlug The slug of the section year of the quiz.
     * @param courseSlug The slug of the course of the quiz.
     * @param quizSlug The slug of the quiz.
     */
    getQuizBySlugs: publicProcedure
        .input(z.object({ univID: z.string({
                required_error: "univID is required",
                invalid_type_error: "univID must be a string",
            }),
            sectionSlug: z.string({
                required_error: "sectionSlug is required",
                invalid_type_error: "sectionSlug must be a string",
            }),
            sectionYearSlug: z.string({
                required_error: "sectionYearSlug is required",
                invalid_type_error: "sectionYearSlug must be a string",
            }),
            courseSlug: z.string({
                required_error: "courseSlug is required",
                invalid_type_error: "courseSlug must be a string",
            }),
            quizSlug: z.string({
                required_error: "quizSlug is required",
                invalid_type_error: "quizSlug must be a string",
            })
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.quiz.findUnique({
                where: {
                    universityID_sectionSlug_sectionYearSlug_courseSlug_slug: {
                        universityID: input.univID,
                        sectionSlug: input.sectionSlug,
                        sectionYearSlug: input.sectionYearSlug,
                        courseSlug: input.courseSlug,
                        slug: input.quizSlug,
                    }
                },
                select: {
                    id: true,
                    name: true,
                    questions : {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            image : true,
                            type : true,
                            mCQ : true,
                            numberAnswer : true,
                            textAnswer : true,
                        }
                    }
                },
            });
        }),

    /**
     * Get all quiz from a UnivID, section slug, sectionyear slug and course slug
     * @param univID The ID of the university of the quiz.
     * @param sectionSlug The slug of the section of the quiz.
     * @param sectionYearSlug The slug of the section year of the quiz.
     * @param courseSlug The slug of the course of the quiz.
     */
    getAllQuizBySlugs: publicProcedure
        .input(z.object({ univID: z.string({
                required_error: "univID is required",
                invalid_type_error: "univID must be a string",
            }),
            sectionSlug: z.string({
                required_error: "sectionSlug is required",
                invalid_type_error: "sectionSlug must be a string",
            }),
            sectionYearSlug: z.string({
                required_error: "sectionYearSlug is required",
                invalid_type_error: "sectionYearSlug must be a string",
            }),
            courseSlug: z.string({
                required_error: "courseSlug is required",
                invalid_type_error: "courseSlug must be a string",
            })
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.quiz.findMany({
                where: {
                    course : {
                        slug : input.courseSlug,
                        section: {
                            slug:  input.sectionYearSlug,
                            section : {
                                slug: input.sectionSlug,
                                university: {
                                    id: input.univID
                                }
                            },
                        },
                    },
                },
            });
        }),

});
