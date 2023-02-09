"use client";
import { FormEvent, useState } from "react";
import { TextAnswer } from "@prisma/client";
import AnswerDisplay from "./AnswerDisplay";

export default function({
                          question,
                          onNext
                        }: {
  question: TextAnswer;
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
    if (
      question.answers.includes(answer.toLowerCase())
    ) {
      setIsSuccess(true);
    }
  };

  const invalidText = `La réponse est ${question.answers.join(" · ")}`;

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
          type="text"
          placeholder="Tape ta réponse ici"
          className="input-bordered input-primary input w-full"
        />
      )}

      {!displaySolution && (
        <button className="btn-full btn w-full">
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

