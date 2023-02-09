import prismaClient from "../../../../../../../../src/utils/prismaClient";
import { notFound } from "next/navigation";
import QuizMainBlock from "./QuizMainBlock";

export default async function QuizPage({
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
      <h1 className="text-center text-xl font-bold">{quiz.name}</h1>
      <QuizMainBlock backUrl={`/${university}/${sectionSlug}/${sectionYearSlug}/${subjectSlug}`}
                     quiz={quiz}></QuizMainBlock>
      <div>
        {/*<header className="m-auto max-w-5xl p-4">*/}
        {/*  <div className="flex justify-end ">*/}
        {/*    <Link href={`/${university}/${sectionSlug}/${sectionYearSlug}/${subjectSlug}`}*/}
        {/*          className="btn">Abandonner</Link>*/}
        {/*  </div>*/}
        {/*  <div className="flex flex-col justify-center space-y-4">*/}
        {/*    <h1 className="text-center text-xl font-bold">{quiz.name}</h1>*/}
        {/*    /!*<h2 className="text-center text-3xl font-bold">*!/*/}
        {/*    /!*  Question {currentQuestionIndex + 1}/{questionCount}*!/*/}
        {/*    /!*</h2>*!/*/}
        {/*    /!*<progress*!/*/}
        {/*    /!*  className="progress progress-primary w-full"*!/*/}
        {/*    /!*  value={currentQuestionIndex + 1}*!/*/}
        {/*    /!*  max={questionCount}*!/*/}
        {/*    /!*></progress>*!/*/}
        {/*  </div>*/}
        {/*</header>*/}
        {/*{completed && (*/}
        {/*  <main className="m-auto max-w-5xl space-y-6 rounded-xl bg-white p-10">*/}
        {/*    <h1 className="text-4xl font-bold">Félicitations !</h1>*/}
        {/*    <p className="text-xl">*/}
        {/*      Vous avez terminé cet exercice. Vous pouvez le refaire autant de fois*/}
        {/*      que vous le souhaitez.*/}
        {/*    </p>*/}
        {/*    <div className="flex justify-end">*/}
        {/*      <Link href={`/${university}/${section}/${year}/${subject}`} className="btn-full btn">*/}
        {/*        Terminer*/}
        {/*      </Link>*/}
        {/*    </div>*/}
        {/*  </main>*/}
        {/*)}*/}
        {/*{!completed && currentQuestion && (*/}
        {/*  <Question*/}
        {/*    onNext={nextQuestion}*/}
        {/*    question={currentQuestion}*/}
        {/*  ></Question>*/}
        {/*)}*/}
      </div>
    </>
  );
}
