import { useRouter } from "next/router";
import { api } from "../../../../../../../utils/api";
import { FormEvent, useMemo, useState } from "react";
import { MCQ, NumberAnswer, QuestionType, TextAnswer } from "@prisma/client";
import Link from "next/link";

export default () => {
  const router = useRouter();
  const { university, section, year, subject, exercice } = router.query;

  const { data } = api.quiz.getQuizBySlugs.useQuery({
    univID: university as string,
    sectionSlug: section as string,
    sectionYearSlug: year as string,
    courseSlug: subject as string,
    quizSlug: exercice as string
  });

  const name = data?.name;
  const questions = data?.questions ?? [];
  const questionCount = questions.length;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);


  const [completed, setCompleted] = useState(false);

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questionCount) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <header className="m-auto max-w-5xl p-4">
        <div className="flex justify-end ">
          <Link href={`/${university}/${section}/${year}/${subject}`} className="btn">Abandonner</Link>
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-center text-xl font-bold">{name}</h1>
          <h2 className="text-center text-3xl font-bold">
            Question {currentQuestionIndex + 1}/{questionCount}
          </h2>
          <progress
            className="progress progress-primary w-full"
            value={currentQuestionIndex + 1}
            max={questionCount}
          ></progress>
        </div>
      </header>
      {completed && (
        <main className="m-auto max-w-5xl space-y-6 rounded-xl bg-white p-10">
          <h1 className="text-4xl font-bold">Félicitations !</h1>
          <p className="text-xl">
            Vous avez terminé cet exercice. Vous pouvez le refaire autant de fois
            que vous le souhaitez.
          </p>
          <div className="flex justify-end">
            <Link href={`/${university}/${section}/${year}/${subject}`} className="btn-full btn">
              Terminer
            </Link>
          </div>
        </main>
      )}
      {!completed && currentQuestion && (
        <Question
          onNext={nextQuestion}
          question={currentQuestion}
        ></Question>
      )}
    </div>
  );
};

function Question({
                    question,
                    onNext
                  }: {
  question: {
    mCQ: MCQ | null;
    numberAnswer: NumberAnswer | null;
    textAnswer: TextAnswer | null;
    id: number;
    type: QuestionType;
    image: string | null;
    title: string;
    description: string;
  };
  onNext: () => void;
}) {
  const { type } = question;

  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
  };

  const questionComponent = useMemo(() => {
    setSubmitted(false);
    switch (type) {
      case "MCQ":
        if (question.mCQ === null) return null;
        return <MCQQuestion onSubmit={submit} question={question.mCQ} />;
      case "NumberAnswer":
        if (question.numberAnswer === null) return null;
        return (
          <NumberQuestion onSubmit={submit} question={question.numberAnswer} />
        );
      case "TextAnswer":
        if (question.textAnswer === null) return null;
        return (
          <TextQuestion onSubmit={submit} question={question.textAnswer} />
        );

      default:
        return null;
    }
  }, [question, type]);

  return (
    <main className="m-auto max-w-5xl space-y-6 rounded-xl bg-white p-10">
      {/*<div className="relative w-full aspect-video rounded-xl overflow-hidden">*/}
      {/*  <Image*/}
      {/*    fill*/}
      {/*    className="object-contain"*/}
      {/*    src="/subjects/math.jpg"*/}
      {/*    alt="maths"*/}
      {/*  ></Image>*/}
      {/*</div>*/}

      <h1 className="text-4xl font-bold">{question.title}</h1>

      {questionComponent}
      {submitted && (
        <div className="flex justify-end">
          <button onClick={onNext} className="btn-full btn">
            Suivant
          </button>
        </div>
      )}
    </main>
  );
}

function NumberQuestion({
                          question,
                          onSubmit
                        }: {
  question: NumberAnswer;
  onSubmit: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (answer === "") return;
    if (submitted) return;
    setSubmitted(true);
    const parsedAnswer = parseFloat(answer);

    if (
      question.minanswer <= parsedAnswer &&
      parsedAnswer <= question.maxanswer
    ) {
      setIsCorrect(true);
    }
    onSubmit();
  };

  return (
    <div className="space-y-4">
      {submitted && (
        <div className="flex flex-col justify-center text-center">
          {isCorrect ? (
            <>
              <svg
                className="h-20 fill-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>trophy</title>
                <path
                  d="M18 2C17.1 2 16 3 16 4H8C8 3 6.9 2 6 2H2V11C2 12 3 13 4 13H6.2C6.6 15 7.9 16.7 11 17V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V17C16.1 16.7 17.4 15 17.8 13H20C21 13 22 12 22 11V2H18M6 11H4V4H6V11M20 11H18V4H20V11Z" />
              </svg>
              <span className="text-2xl font-bold">Bonne réponse !</span>
            </>
          ) : (
            <>
              <svg
                className="h-20 fill-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>emoticon-cry-outline</title>
                <path
                  d="M7.57,20C6.23,20 5.14,18.91 5.14,17.57C5.14,16.5 6.32,14.5 7.57,12.81C8.82,14.5 10,16.5 10,17.57A2.43,2.43 0 0,1 7.57,20M12,2A10,10 0 0,0 2,12C2,13.75 2.45,15.38 3.24,16.81C3.4,16 3.81,15.07 4.31,14.17C4.11,13.5 4,12.75 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C11.76,20 11.53,20 11.29,19.96C10.82,20.7 10.14,21.28 9.34,21.63C10.19,21.87 11.08,22 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,14C11.59,14 11.19,14.04 10.81,14.12C11.16,14.75 11.47,15.4 11.69,16C11.79,16 11.89,16 12,16C13.25,16 14.32,16.5 14.77,17.23L16.19,15.81C15.29,14.72 13.75,14 12,14M15.5,8C14.7,8 14,8.7 14,9.5C14,10.3 14.7,11 15.5,11C16.3,11 17,10.3 17,9.5C17,8.7 16.3,8 15.5,8M10,9.5C10,8.7 9.3,8 8.5,8C7.7,8 7,8.7 7,9.5C7,10.3 7.7,11 8.5,11C9.3,11 10,10.3 10,9.5" />
              </svg>
              <span className="text-2xl font-bold">Mauvaise réponse !</span>
              {question.minanswer !== question.maxanswer && (
                <span>
                  La réponse est comprise entre {question.minanswer} et{" "}
                  {question.maxanswer}
                </span>
              )}
              {question.minanswer === question.maxanswer && (
                <span>La réponse est {question.minanswer}</span>
              )}
            </>
          )}
        </div>
      )}

      <form className="space-y-4" onSubmit={submit}>
        <input
          onInput={(event) => setAnswer(event.currentTarget.value)}
          type="number"
          placeholder="Tape ta réponse ici"
          className="input-bordered input-primary input w-full"
        />
        {!submitted && (
          <button type="submit" className="btn">
            Valider
          </button>
        )}
      </form>
    </div>
  );
}

function MCQQuestion({
                       question: { listchoice, answers },
                       onSubmit
                     }: {
  question: MCQ;
  onSubmit: () => void;
}) {
  // check if only one answer is true
  const isSingleChoice = answers.filter((answer) => answer).length === 1;

  const submit = (selectedIndexes: number[]) => {
    if (submitted) return;
    let correct = true;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i]) {
        if (!selectedIndexes.includes(i)) {
          correct = false;
          break;
        }
      } else {
        if (selectedIndexes.includes(i)) {
          correct = false;
          break;
        }
      }
    }
    setSubmitted(true);
    setIsCorrect(correct);
    onSubmit();
  };

  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (isSingleChoice) {
    return (
      <div className="space-y-4">
        {submitted && (
          <div className="flex flex-col justify-center text-center">
            {isCorrect ? (
              <>
                <svg
                  className="h-20 fill-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>trophy</title>
                  <path
                    d="M18 2C17.1 2 16 3 16 4H8C8 3 6.9 2 6 2H2V11C2 12 3 13 4 13H6.2C6.6 15 7.9 16.7 11 17V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V17C16.1 16.7 17.4 15 17.8 13H20C21 13 22 12 22 11V2H18M6 11H4V4H6V11M20 11H18V4H20V11Z" />
                </svg>
                <span className="text-2xl font-bold">Bonne réponse !</span>
              </>
            ) : (
              <>
                <svg
                  className="h-20 fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>emoticon-cry-outline</title>
                  <path
                    d="M7.57,20C6.23,20 5.14,18.91 5.14,17.57C5.14,16.5 6.32,14.5 7.57,12.81C8.82,14.5 10,16.5 10,17.57A2.43,2.43 0 0,1 7.57,20M12,2A10,10 0 0,0 2,12C2,13.75 2.45,15.38 3.24,16.81C3.4,16 3.81,15.07 4.31,14.17C4.11,13.5 4,12.75 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C11.76,20 11.53,20 11.29,19.96C10.82,20.7 10.14,21.28 9.34,21.63C10.19,21.87 11.08,22 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,14C11.59,14 11.19,14.04 10.81,14.12C11.16,14.75 11.47,15.4 11.69,16C11.79,16 11.89,16 12,16C13.25,16 14.32,16.5 14.77,17.23L16.19,15.81C15.29,14.72 13.75,14 12,14M15.5,8C14.7,8 14,8.7 14,9.5C14,10.3 14.7,11 15.5,11C16.3,11 17,10.3 17,9.5C17,8.7 16.3,8 15.5,8M10,9.5C10,8.7 9.3,8 8.5,8C7.7,8 7,8.7 7,9.5C7,10.3 7.7,11 8.5,11C9.3,11 10,10.3 10,9.5" />
                </svg>
                <span className="text-2xl font-bold">Mauvaise réponse !</span>
              </>
            )}
          </div>
        )}

        {listchoice.map((choice, index) => (
          <button
            onClick={() => submit([index])}
            key={choice}
            className={
              "btn-lg btn w-full " +
              (submitted ? (answers[index] ? "btn-success" : "btn-error") : "")
            }
          >
            {choice}
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        {submitted && (
          <div className="flex flex-col justify-center text-center">
            {isCorrect ? (
              <>
                <svg
                  className="h-20 fill-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>trophy</title>
                  <path
                    d="M18 2C17.1 2 16 3 16 4H8C8 3 6.9 2 6 2H2V11C2 12 3 13 4 13H6.2C6.6 15 7.9 16.7 11 17V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V17C16.1 16.7 17.4 15 17.8 13H20C21 13 22 12 22 11V2H18M6 11H4V4H6V11M20 11H18V4H20V11Z" />
                </svg>
                <span className="text-2xl font-bold">Bonne réponse !</span>
              </>
            ) : (
              <>
                <svg
                  className="h-20 fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>emoticon-cry-outline</title>
                  <path
                    d="M7.57,20C6.23,20 5.14,18.91 5.14,17.57C5.14,16.5 6.32,14.5 7.57,12.81C8.82,14.5 10,16.5 10,17.57A2.43,2.43 0 0,1 7.57,20M12,2A10,10 0 0,0 2,12C2,13.75 2.45,15.38 3.24,16.81C3.4,16 3.81,15.07 4.31,14.17C4.11,13.5 4,12.75 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C11.76,20 11.53,20 11.29,19.96C10.82,20.7 10.14,21.28 9.34,21.63C10.19,21.87 11.08,22 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,14C11.59,14 11.19,14.04 10.81,14.12C11.16,14.75 11.47,15.4 11.69,16C11.79,16 11.89,16 12,16C13.25,16 14.32,16.5 14.77,17.23L16.19,15.81C15.29,14.72 13.75,14 12,14M15.5,8C14.7,8 14,8.7 14,9.5C14,10.3 14.7,11 15.5,11C16.3,11 17,10.3 17,9.5C17,8.7 16.3,8 15.5,8M10,9.5C10,8.7 9.3,8 8.5,8C7.7,8 7,8.7 7,9.5C7,10.3 7.7,11 8.5,11C9.3,11 10,10.3 10,9.5" />
                </svg>
                <span className="text-2xl font-bold">Mauvaise réponse !</span>
              </>
            )}
          </div>
        )}

        {listchoice.map((choice, index) => (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Remember me</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

function TextQuestion({
                        question,
                        onSubmit
                      }: {
  question: TextAnswer;
  onSubmit: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (answer === "") return;
    if (submitted) return;
    setSubmitted(true);

    if (question.answers.includes(answer)) {
      setIsCorrect(true);
    }
    onSubmit();
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      {submitted && (
        <div className="flex flex-col justify-center text-center">
          {isCorrect ? (
            <>
              <svg
                className="h-20 fill-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>trophy</title>
                <path
                  d="M18 2C17.1 2 16 3 16 4H8C8 3 6.9 2 6 2H2V11C2 12 3 13 4 13H6.2C6.6 15 7.9 16.7 11 17V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V17C16.1 16.7 17.4 15 17.8 13H20C21 13 22 12 22 11V2H18M6 11H4V4H6V11M20 11H18V4H20V11Z" />
              </svg>
              <span className="text-2xl font-bold">Bonne réponse !</span>
            </>
          ) : (
            <>
              <svg
                className="h-20 fill-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>emoticon-cry-outline</title>
                <path
                  d="M7.57,20C6.23,20 5.14,18.91 5.14,17.57C5.14,16.5 6.32,14.5 7.57,12.81C8.82,14.5 10,16.5 10,17.57A2.43,2.43 0 0,1 7.57,20M12,2A10,10 0 0,0 2,12C2,13.75 2.45,15.38 3.24,16.81C3.4,16 3.81,15.07 4.31,14.17C4.11,13.5 4,12.75 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20C11.76,20 11.53,20 11.29,19.96C10.82,20.7 10.14,21.28 9.34,21.63C10.19,21.87 11.08,22 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,14C11.59,14 11.19,14.04 10.81,14.12C11.16,14.75 11.47,15.4 11.69,16C11.79,16 11.89,16 12,16C13.25,16 14.32,16.5 14.77,17.23L16.19,15.81C15.29,14.72 13.75,14 12,14M15.5,8C14.7,8 14,8.7 14,9.5C14,10.3 14.7,11 15.5,11C16.3,11 17,10.3 17,9.5C17,8.7 16.3,8 15.5,8M10,9.5C10,8.7 9.3,8 8.5,8C7.7,8 7,8.7 7,9.5C7,10.3 7.7,11 8.5,11C9.3,11 10,10.3 10,9.5" />
              </svg>
              <span className="text-2xl font-bold">Mauvaise réponse !</span>
              <span>La réponse est {question.answers[0]}</span>
            </>
          )}
        </div>
      )}

      <input
        onInput={(event) => setAnswer(event.currentTarget.value)}
        type="text"
        placeholder="Tape ta réponse ici"
        className="input-bordered input-primary input w-full"
      />
      {!submitted && (
        <button type="submit" className="btn">
          Valider
        </button>
      )}
    </form>
  );
}
