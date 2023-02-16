"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import TextInput from "$components/TextInput";
import * as Accordion from "@radix-ui/react-accordion";
import { QuestionType } from "@prisma/client";
import NumberQuestion from "$components/quiz/editor/NumberQuestion";


type Inputs = {
  name: string,

  questions: Question[]
}

type Question = MCQQuestion | NumberQuestion | TextQuestion

type QuestionBase = {
  title: string,
  type: QuestionType
  description: string
}

type MCQQuestion = QuestionBase & {
  type: "MCQ",
  mCQ: {
    listchoice: string[]
    answers: string[]
  }
}

type NumberQuestion = QuestionBase & {
  type: "NumberAnswer",
  numberAnswer: {
    maxanswer: number
    minanswer: number
  }
}

type TextQuestion = QuestionBase & {
  type: "TextAnswer",
  textAnswer: {
    answers: string[]
  }
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


export default function QuizEditorForm() {
  const { control, register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


      <TextInput errors={errors} validationSchema={{ required: true }} register={register} name="name"
                 label="Nom du quiz"></TextInput>
      <div>
        <button type="button" onClick={() => append({
          title: "🎉 Temporary question title",
          type: "NumberAnswer",
          description: "",
          numberAnswer: {
            maxanswer: 0,
            minanswer: 0
          }
        })}>Ajouter un question Nombre
        </button>
      </div>
      <Accordion.Root className="space-y-6" type="single" collapsible>
        {fields.map((question, index) => (
          <Accordion.Item key={question.id} value={question.id} className="shadow-lg border p-10 rounded-xl space-y-4">
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between w-full">
                <div className="text-xl font-bold space-x-4">
                  <span>{question.title}</span>
                  <span className="badge badge-primary">{getQuestionTypeText(question.type)}</span>
                </div>
                <CloseIcon></CloseIcon>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="space-y-6">

              <textarea {...register(`questions.${index}.description`)} className="textarea textarea-primary w-full"
                        placeholder="Description"></textarea>

              {/*  {question.type === QuestionType.MCQ && <MCQQuestion></MCQQuestion>}*/}
              {question.type === QuestionType.NumberAnswer &&
                <NumberQuestion register={register} baseName={`questions.${index}.numberAnswer`}
                                errors={errors}></NumberQuestion>}
              {/*  {question.type === QuestionType.TextAnswer && <TextQuestion></TextQuestion>}*/}
              <div className="divider"></div>
              <div className="flex justify-end">
                <button onClick={() => remove(index)} className="btn btn-ghost btn-sm">
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
      <button type="submit" className="btn w-full">Valider</button>
    </form>
  );
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


