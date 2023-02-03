import * as  Accordion from "@radix-ui/react-accordion";
import { useState } from "react";

export default function Editor() {

  const questions = [
    {
      id: 1,
      title: "Quel est l'alcool préféré de Romain?",
      type: QuestionType.MCQ
    },
    {
      id: 2,
      title: "Quels sont les fruits préférés de Romain?",
      type: QuestionType.TextAnswer
    },
    {
      id: 3,
      title: "Quel est l'age de Romain?",
      type: QuestionType.NumberAnswer
    }
  ];


  return (
    <div className="p-6 space-y-6">
      <h1 className="font-bold text-2xl">Éditeur de quiz</h1>
      <Accordion.Root className="space-y-6" type="single" collapsible>
        {questions.map((question) => (
          <Accordion.Item value={question.id + ""} className="shadow-lg border p-10 rounded-xl space-y-4">
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between w-full">
                <div className="text-xl font-bold"><span>{question.title}</span> <span
                  className="badge badge-primary">{getQuestionTypeText(question.type)}</span>
                </div>
                <CloseIcon></CloseIcon>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="space-y-6">

              <textarea className="textarea textarea-primary w-full" placeholder="Description"></textarea>

              {question.type === QuestionType.MCQ && <MCQQuestion></MCQQuestion>}
              {question.type === QuestionType.NumberAnswer && <NumberQuestion></NumberQuestion>}
              {question.type === QuestionType.TextAnswer && <TextQuestion></TextQuestion>}
              <div className="divider"></div>
              <div className="flex justify-end">
                <button className="btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <title>delete</title>
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                  <div>Supprimer la question</div>
                </button>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}


function NumberQuestion() {
  return <>
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-primary">Réponse minimale</span>
      </label>
      <input type="number" placeholder="0" className="input input-bordered w-full input-primary" />
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-primary">Réponse maximale</span>
      </label>
      <input type="number" placeholder="99" className="input input-bordered w-full input-primary" />
    </div>

    <div className="alert">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             className="stroke-current flex-shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Utilisez la même valeur dans le champ minimale et maximale si vous souhaitez une réponse exacte.</span>
      </div>
    </div>
  </>;
}

function TextQuestion() {
  return <>
    <div className="alert">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             className="stroke-current flex-shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Utilisez plusieurs variations séparées par des points-virgules. Ex: "spiderman;spider-man;spideur-man;spider man"</span>
      </div>
    </div>
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-primary">Réponse</span>
      </label>
      <input type="text" placeholder="Réponse" className="input input-bordered w-full input-primary" />
    </div>
  </>;
}

function MCQQuestion() {

  const [answers, setAnswers] = useState<{}[]>([]);

  const addAnswer = () => {
    setAnswers([...answers, {}]);
  };

  return <>


    <div>
      {answers.length === 0 && <div className="alert">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               className="stroke-current flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Aucune réponse n'a été ajoutée.</span>
        </div>
      </div>}
      {answers.map((answer) => (
        <div className="flex items-center space-x-6">
          <input type="text" placeholder="Réponse" className="input input-bordered input-primary w-full" />
          <div className="form-control">
            <label className="label cursor-pointer space-x-4">
              <input type="checkbox" className="checkbox checkbox-success" />
              <span className="label-text">Bonne réponse</span>
            </label>
          </div>
          <button className="btn btn-ghost btn-sm">
            <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g clip-path="url(#clip0_429_11083)">
                  <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#292929" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
      ))}

    </div>


    <button onClick={() => addAnswer()} className="btn btn-primary btn-xs">Ajouter une réponse</button>


  </>;
}

enum QuestionType {
  MCQ,
  NumberAnswer,
  TextAnswer,
}

function getQuestionTypeText(type: QuestionType) {
  switch (type) {
    case QuestionType.MCQ:
      return "QCM";
    case QuestionType.NumberAnswer:
      return "Réponse numérique";
    case QuestionType.TextAnswer:
      return "Réponse textuelle";
  }
}


function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18.5861 8.0858C18.1956 7.69528 17.5624 7.69528 17.1719 8.0858L11.879 13.3787L6.58609 8.0858C6.19556 7.69528 5.5624 7.69528 5.17187 8.0858L4.46477 8.79291C4.07424 9.18343 4.07424 9.8166 4.46477 10.2071L10.8183 16.5607C11.4041 17.1465 12.3539 17.1465 12.9396 16.5607L19.2932 10.2071C19.6837 9.8166 19.6837 9.18343 19.2932 8.79291L18.5861 8.0858Z"
              fill="#000000"></path>
      </g>
    </svg>
  );
}
