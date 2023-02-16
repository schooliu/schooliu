import prismaClient from "../../../../../../src/utils/prismaClient";
import { redirect } from "next/navigation";

export default async function Head({ params }: { params: { university: string, sectionSlug: string, sectionYearSlug: string, subjectSlug: string } }) {
  const course = await prismaClient.course.findUnique({
    where: {
      universityID_sectionSlug_sectionYearSlug_slug: {
        sectionSlug: params.sectionSlug,
        sectionYearSlug: params.sectionYearSlug,
        slug: params.subjectSlug,
        universityID: params.university
      }
    },
    include: {
      quiz: true,
      chapters: true
    }
  });

  if (!course) {
    redirect(`/${params.university}/${params.sectionSlug}/${params.sectionYearSlug}`);
  }

  return (
    <>
      <title>{course.title + " - Schooliu"}</title>
    </>
  );


}
