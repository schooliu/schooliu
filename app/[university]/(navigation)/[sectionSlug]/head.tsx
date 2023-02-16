import { notFound } from "next/navigation";
import prismaClient from "../../../../src/utils/prismaClient";

export default async function Head({ params }: { params: { university: string, sectionSlug: string, subjectSlug: string } }) {
  const section = await prismaClient.section.findUnique({
    where: {
      universityID_slug: {
        slug: params.sectionSlug,
        universityID: params.university
      }
    }
  });
  if (!section) {
    notFound();
  }
  return (
    <>
      <title>{section.name + " - Schooliu"}</title>
    </>
  );
}
