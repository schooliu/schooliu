"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../../../../../../src/components/TextInput";


type Inputs = {
  example: string,
  exampleRequired: string,
};


export default function QuizEditorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>


      <TextInput errors={errors} validationSchema={{ required: true }} register={register} name="example"
                 label="Nom du quiz"></TextInput>


      <button>Submit</button>
    </form>
  );
}
