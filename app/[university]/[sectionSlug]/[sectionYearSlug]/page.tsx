import prismaClient from "../../../../src/utils/prismaClient";
import SubjectCard from "./SubjectCard";

export default async function Page({ params }: { params: { university: string, sectionSlug: string, sectionYearSlug: string } }) {
  const courses = await prismaClient.course.findMany({
    where: {
      section: {
        slug: params.sectionYearSlug,
        section: {
          slug: params.sectionSlug,
          university: {
            id: params.university
          }
        }
      }
    }
  });
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-3xl">📚 Matières</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map(course => (
          <SubjectCard key={course.id} subject={course} university={params.university} year={params.sectionYearSlug}
                       section={params.sectionSlug} />
        ))}
      </div>
    </div>
  );
}
