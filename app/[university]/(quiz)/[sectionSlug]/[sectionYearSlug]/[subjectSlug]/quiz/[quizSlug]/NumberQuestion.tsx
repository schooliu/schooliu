"use client";
import { FormEvent, useState } from "react";
import { NumberAnswer } from "@prisma/client";
import AnswerDisplay from "./AnswerDisplay";

export default function({
                          question,
                          onNext
                        }: {
  question: NumberAnswer;
  onNext: (success: boolean) => void;
}) {
  const [displaySolution, setDisplaySolution] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [answer, setAnswer] = useState<string | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!answer) {
      return;
    }
    setDisplaySolution(true);
    const parsedAnswer = parseInt(answer);
    if (
      parsedAnswer >= question.minanswer &&
      parsedAnswer <= question.maxanswer
    ) {
      setIsSuccess(true);
    }
  };

  const invalidText =
    question.minanswer === question.maxanswer
      ? `La réponse est ${question.minanswer}`
      : `La réponse est entre ${question.minanswer} et ${question.maxanswer}`;

  return (
    <form className="space-y-4" onSubmit={submit}>
      {displaySolution && (
        <AnswerDisplay
          isValid={isSuccess}
          invalidText={invalidText}
        ></AnswerDisplay>
      )}
      {!displaySolution && (
        <input
          onInput={(event) => setAnswer(event.currentTarget.value)}
          type="number"
          placeholder="Tape ta réponse ici"
          className="input-bordered input-primary input w-full"
        />
      )}

      {!displaySolution && (
        <button className="btn-full btn w-full" type="submit">
          Valider
        </button>
      )}

      {displaySolution && (
        <button
          className="btn-full btn w-full"
          onClick={() => onNext(isSuccess)}
        >
          Suivant
        </button>
      )}
    </form>
  );
}

