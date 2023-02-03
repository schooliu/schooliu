import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const courseRouter = createTRPCRouter({

    /**
     * Get a course by its ID.
     */
    getById: publicProcedure
        .input(z.object({ id: z.number({
                required_error: "ID is required",
                invalid_type_error: "ID must be an integer",
            }).int("ID must be an integer")
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.course.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    /**
     * Get all courses from a SectionYear
     * @param sectionYearId The ID of the section year to get courses for.
     */
    getCoursesBySectionYearId: publicProcedure
        .input(z.object({ id: z.number({
                required_error: "ID is required",
                invalid_type_error: "ID must be an integer",
            }).int("ID must be an integer")
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.course.findMany({
                where: {
                    section: {
                        id : input.id
                    },
                },
            });
        }),

    /**
     * Get all courses from a UnivID, section slug and sectionyear slug
     * @param univId The ID of the university to get courses for.
     * @param sectionSlug The slug of the section to get courses for.
     * @param sectionYearSlug The slug of the section year to get courses for.
     */
    getCoursesByUnivSectionSectionYear: publicProcedure
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
            })
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.course.findMany({
                where: {
                    section: {
                        slug : input.sectionYearSlug,
                        section : {
                            slug : input.sectionSlug,
                            university : {
                                id : input.univID
                            }
                        }
                    }
                },
            });
        }),

    /**
     * Get a course by UnivId, section slug, sectionyear slug and course slug
     * @param univId The ID of the university of the course.
     * @param sectionSlug The slug of the section of the course.
     * @param sectionYearSlug The slug of the section year of the course.
     * @param courseSlug The slug of the course to get.
     */
    getCourseBySlugs: publicProcedure
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
            return ctx.prisma.course.findUnique({
                where: {
                    universityID_sectionSlug_sectionYearSlug_slug: {
                        universityID: input.univID,
                        sectionSlug: input.sectionSlug,
                        sectionYearSlug: input.sectionYearSlug,
                        slug: input.courseSlug
                    }
                },
            });
        }),

});
