"use client";
import { MCQ, NumberAnswer, Question, Quiz, TextAnswer } from "@prisma/client";
import { useState } from "react";
import QuizEnd from "./QuizEnd";
import QuizQuestionsContainer from "./QuizQuestionsContainer";

export default function({
                          quiz,
                          backUrl
                        }: { quiz: (Quiz & { questions: (Question & { mCQ: MCQ | null, quiz: Quiz, numberAnswer: NumberAnswer | null, textAnswer: TextAnswer | null })[] }), backUrl: string }) {
  const questionCount = quiz.questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctQuestions, setCorrectQuestions] = useState(0);

  const onNext = (success: boolean) => {
    if (currentQuestionIndex + 1 === questionCount) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (success) {
      setCorrectQuestions(correctQuestions + 1);
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold">
        Question {currentQuestionIndex + 1}/{questionCount}
      </h2>
      <progress
        className="progress progress-primary w-full"
        value={currentQuestionIndex + 1}
        max={questionCount}
      ></progress>
      <div className="w-full rounded-3xl bg-white p-20">
        {isCompleted ?
          <QuizEnd backUrl={backUrl} correctAnswers={correctQuestions} totalQuestions={questionCount}></QuizEnd> :
          <QuizQuestionsContainer currentQuestionIndex={currentQuestionIndex} onNext={onNext}
                                  questions={quiz.questions}></QuizQuestionsContainer>}
      </div>
    </>
  );
}

