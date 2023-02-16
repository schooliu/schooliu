import prismaClient from "../../../../../../../../src/utils/prismaClient";
import { notFound } from "next/navigation";

export default async function Head({
                                     params: {
                                       university,
                                       sectionSlug,
                                       sectionYearSlug,
                                       subjectSlug,
                                       quizSlug
                                     }
                                   }: { params: { university: string, sectionSlug: string, sectionYearSlug: string, subjectSlug: string, quizSlug: string } }) {
  const quiz = await prismaClient.quiz.findUnique({
    where: {
      universityID_sectionSlug_sectionYearSlug_courseSlug_slug: {
        universityID: university,
        sectionSlug: sectionSlug,
        sectionYearSlug: sectionYearSlug,
        courseSlug: subjectSlug,
        slug: quizSlug
      }
    },
    include: {
      questions: {
        include: {
          mCQ: true,
          numberAnswer: true,
          textAnswer: true,
          quiz: true
        }
      }
    }
  });

  if (!quiz) {
    notFound();
  }


  return (
    <>
      <title>{quiz.name + " - Schooliu"}</title>
    </>
  );
}
