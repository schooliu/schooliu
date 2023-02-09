import Link from "next/link";
import prismaClient from "../../../../../src/utils/prismaClient";
import { redirect } from "next/navigation";
import ExerciceCard from "./ExerciceCard";

export default async function Page({ params }: { params: { university: string, sectionSlug: string, sectionYearSlug: string, subjectSlug: string } }) {
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
    <div className="space-y-4">
      <h1 className="flex items-center space-x-4 text-xl font-bold">
        <Link href={`/${params.university}/${params.sectionSlug}/${params.sectionYearSlug}`}>
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
              d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" />
          </svg>
        </Link>
        <div>{course.title}</div>
      </h1>
      <div className="divider"></div>
      <h1 className="font-bold text-3xl">📝 Chapitres</h1>

      <div className="alert shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               className="stroke-current flex-shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>À venir...</span>
        </div>
      </div>
      {/*<div className="space-y-4">*/}
      {/*    {chapters.map((chapter) => (*/}
      {/*        <ChapterCard chapter={chapter} subject={subject as string} university={university as string}/>*/}
      {/*    ))}*/}
      {/*</div>*/}


      <div className="divider"></div>
      <h1 className="font-bold text-3xl">📝 Exercices</h1>
      <div className="space-y-4">
        {course.quiz.map(quiz => (
          <ExerciceCard key={quiz.id}
                        pathBase={`/${params.university}/${params.sectionSlug}/${params.sectionYearSlug}/${params.subjectSlug}`}
                        quiz={quiz}></ExerciceCard>
        ))}

      </div>

    </div>
  );
}
