import { MCQ, NumberAnswer, Question, Quiz, TextAnswer } from "@prisma/client";
import MCQQuestion from "./MCQQuestion";
import Image from "next/image";
import NumberQuestion from "./NumberQuestion";
import TextQuestion from "./TextQuestion";

export default function({
                          questions,
                          onNext,
                          currentQuestionIndex
                        }: {
  questions: (Question & {
    mCQ: MCQ | null;
    quiz: Quiz;
    numberAnswer: NumberAnswer | null;
    textAnswer: TextAnswer | null;
  })[];
  onNext: (success: boolean) => void;
  currentQuestionIndex: number;
}) {
  const question = questions[currentQuestionIndex];
  if (!question) {
    return null;
  }

  let questionComponent;
  switch (question.type) {
    case "TextAnswer":
      if (!question.textAnswer) {
        return null;
      }
      questionComponent = (
        <TextQuestion
          question={question.textAnswer}
          onNext={onNext}
        ></TextQuestion>
      );
      break;
    case "MCQ":
      if (!question.mCQ) {
        return null;
      }
      questionComponent = (
        <MCQQuestion question={question.mCQ} onNext={onNext}></MCQQuestion>
      );
      break;
    case "NumberAnswer":
      if (!question.numberAnswer) {
        return null;
      }
      questionComponent = (
        <NumberQuestion
          question={question.numberAnswer}
          onNext={onNext}
        ></NumberQuestion>
      );
      break;
  }

  return (
    <div className="space-y-4">
      {question.image && (
        <div className="flex w-full justify-center">
          <Image
            src={question.image}
            alt={question.title}
            width={200}
            height={200}
          ></Image>
        </div>
      )}
      <h1 className="text-4xl font-bold">{question.title}</h1>
      <p>{question.description}</p>
      <div className="divider"></div>
      {questionComponent}
    </div>
  );
}
