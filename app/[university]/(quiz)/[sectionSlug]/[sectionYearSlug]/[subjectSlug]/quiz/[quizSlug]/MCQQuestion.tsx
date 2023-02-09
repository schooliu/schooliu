"use client";
import { MCQ } from "@prisma/client";
import { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";

export default function MCQQuestion({
                                      question,
                                      onNext
                                    }: {
  question: MCQ;
  onNext: (success: boolean) => void;
}) {

  useEffect(() => {
    return () => {
      setDisplaySolution(false);
      setSelectedAnswersIndex([]);
      setIsSuccess(false);
    };
  }, [question]);
  // check if only one answer is true
  const isSingleChoice =
    question.answers.filter((answer) => answer).length === 1;

  const [displaySolution, setDisplaySolution] = useState(false);

  const [selectedAnswersIndex, setSelectedAnswersIndex] = useState<number[]>(
    []
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const submit = (indexes: number[]) => {
    setDisplaySolution(true);
    const success = question.answers.every((answer, index) => {
      if (answer) {
        return indexes.includes(index);
      } else {
        return !indexes.includes(index);
      }
    });
    setIsSuccess(success);

  };


  const description = isSingleChoice ? "Une seule réponse possible" : "Select multiple answers";

  return (
    <div className="space-y-4">
      <div className="italic">{description}</div>

      {displaySolution && (
        <AnswerDisplay isValid={isSuccess}></AnswerDisplay>
      )}


      {question.listchoice.map((answer, index) => {
        if (isSingleChoice) {
          return (
            <SingleAnswerButton
              key={answer}
              name={answer}
              onClick={() => {
                submit([index]);
              }}
              isValid={question.answers[index] ?? false}
              displaySolution={displaySolution}
            ></SingleAnswerButton>
          );
        } else {
          return (
            <MultipleAnswerButton
              isSelected={selectedAnswersIndex.includes(index)}
              name={answer}
              key={answer}
              onClick={() => {
                if (selectedAnswersIndex.includes(index)) {
                  setSelectedAnswersIndex(
                    selectedAnswersIndex.filter((i) => i !== index)
                  );
                } else {
                  setSelectedAnswersIndex([...selectedAnswersIndex, index]);
                }
              }}
              isValid={question.answers[index] ?? false}
              displaySolution={displaySolution}
            ></MultipleAnswerButton>
          );
        }
      })}

      {(!displaySolution && !isSingleChoice) &&
        <button className="btn-full btn w-full" onClick={() => submit(selectedAnswersIndex)}>Valider</button>}

      {displaySolution && (
        <button className="btn-full btn w-full" onClick={() => onNext(isSuccess)}>
          Suivant
        </button>
      )}
    </div>
  );
}

function SingleAnswerButton({
                              name,
                              onClick,
                              isValid,
                              displaySolution
                            }: {
  name: string;
  onClick: () => void;
  isValid: boolean;
  displaySolution: boolean;
}) {
  if (displaySolution) {
    return (
      <div
        className={
          "rounded-lg border-2 p-4 text-center font-bold " +
          (isValid
            ? "border-green-500 text-green-500"
            : "border-red-500 text-red-500")
        }
      >
        {name}
      </div>
    );
  } else {
    return (
      <button className="btn-lg btn w-full" onClick={onClick}>
        {name}
      </button>
    );
  }
}

function MultipleAnswerButton({
                                name,
                                onClick,
                                isValid,
                                displaySolution,
                                isSelected
                              }: {
  name: string;
  onClick: () => void;
  isValid: boolean;
  displaySolution: boolean;
  isSelected: boolean;
}) {
  if (displaySolution) {
    return (
      <div
        className={
          "rounded-lg border-2 p-4 text-center font-bold " +
          (isValid
            ? "border-green-500 text-green-500"
            : "border-red-500 text-red-500")
        }
      >
        {name}
      </div>
    );
  } else {
    return <button className={"btn-lg btn w-full " + (isSelected ? "btn-primary" : "btn-outline")}
                   onClick={onClick}>{name}</button>;
  }
}
