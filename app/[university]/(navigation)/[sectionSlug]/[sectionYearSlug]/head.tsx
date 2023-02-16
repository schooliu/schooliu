import prismaClient from "../../../../../src/utils/prismaClient";
import { notFound } from "next/navigation";

export default async function Head({ params }: { params: { university: string, sectionSlug: string, sectionYearSlug: string } }) {
  const sectionYear = await prismaClient.sectionYear.findUnique({
    where: {
      universityID_sectionSlug_slug: {
        sectionSlug: params.sectionSlug,
        slug: params.sectionYearSlug,
        universityID: params.university
      }
    }
  });

  if (!sectionYear) {
    notFound();
  }
  return (
    <>
      <title>{sectionYear.name + " - Schooliu"}</title>
    </>
  );
}
