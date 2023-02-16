import { UseFormRegister } from "react-hook-form/dist/types/form";
import TextInput from "$components/TextInput";

export interface Props {
  register: UseFormRegister<any>;
  baseName: string;
  errors?: any;
}

export default function NumberQuestion({ register, baseName }: Props) {
  return <>

    <TextInput type="number" label="Réponse minimale" validationSchema={{ required: true }} register={register}
               name={`${baseName}.minanswer`}></TextInput>
    <TextInput type="number" label="Réponse maximale" validationSchema={{ required: true }} register={register}
               name={`${baseName}.maxanswer`}></TextInput>

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
