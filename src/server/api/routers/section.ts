import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const sectionRouter = createTRPCRouter({

    /**
     * Get a section by its ID.
     * @param id The ID of the section to get.
     */
    getSectionById: publicProcedure
        .input(z.object({ id: z.number({
                required_error: "ID is required",
                invalid_type_error: "ID must be an integer",
            }).int("ID must be an integer")
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.section.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),


    /**
     * Get all sections by their university ID.
     * @param universityId The ID of the university to get sections for.
     */
    getSectionsByUniversityId: publicProcedure
        .input(z.object({ id: z.string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
            }) }))
        .query(({ input, ctx }) => {
            return ctx.prisma.section.findMany({
                where: {
                    university: {
                        id : input.id
                    },
                },
            });
        }),


    /**
     * Get a section by its slug and university ID.
     * @param slug The slug of the section to get.
     * @param universityId The ID of the university to get the section for.
     */
    getSectionByUnivSectionSlugs: publicProcedure
        .input(z.object({ univID: z.string({
                required_error: "univID is required",
                invalid_type_error: "univID must be a string",
            }),
            sectionSlug: z.string({
                required_error: "Section Slug is required",
                invalid_type_error: "Section Slug must be a string",
            })
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.section.findUnique({
                where: {
                    universityID_slug: {
                        universityID: input.univID,
                        slug: input.sectionSlug
                    },
                },
            });
        }),


    /**
     * Get a SectionYear by its ID.
     * @param id The ID of the SectionYear to get.
     */
    getSectionYearById: publicProcedure
        .input(z.object({ id: z.number({
                required_error: "ID is required",
                invalid_type_error: "ID must be an integer",
            }).int("ID must be an integer")  }))
        .query(({ input, ctx }) => {
            return ctx.prisma.sectionYear.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),

    /**
     * Get all SectionYears by their section ID.
     * @param sectionId The ID of the section to get SectionYears for.
     */
    getSectionYearsBySectionId: publicProcedure
        .input(z.object({ id: z.number({
                required_error: "ID is required",
                invalid_type_error: "ID must be an integer",
            }).int("ID must be an integer") }))
        .query(({ input, ctx }) => {
            return ctx.prisma.sectionYear.findMany({
                where: {
                    section: {
                        id : input.id
                    },
                },
            });
        }),

    /**
     * Get a SectionYear by its section slug and university ID.
     */
    getSectionsYearByUnivSectionSlugs: publicProcedure
        .input(z.object({ univID: z.string({
                required_error: "univID is required",
                invalid_type_error: "univID must be a string",
            }),
            sectionSlug: z.string({
                required_error: "sectionSlug is required",
                invalid_type_error: "sectionSlug must be a string",
            })
        }))
        .query(({ input, ctx }) => {
            return ctx.prisma.sectionYear.findMany({
                where: {
                    section: {
                        slug:  input.sectionSlug,
                        university: {
                            id: input.univID
                        }
                    },
                },
            });
        }),


    /**
     * Get a SectionYear by its university ID, section slug and its slug.
     */
    getSectionYearByUnivSectionSectionYearSlugs: publicProcedure
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
            return ctx.prisma.sectionYear.findUnique({
                where: {
                    universityID_sectionSlug_slug: {
                        universityID: input.univID,
                        sectionSlug: input.sectionSlug,
                        slug: input.sectionYearSlug
                    }
                },
            });
        }),
});
