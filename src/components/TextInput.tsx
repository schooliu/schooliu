import { UseFormRegister } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

export interface TextInputProps {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: any;

  validationSchema?: RegisterOptions<any, any>;
}

export default function TextInput({ label, type = "text", register, name, errors, validationSchema }: TextInputProps) {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={name}>
        <span className="label-text text-primary">{label}</span>
      </label>
      <input {...register(name, validationSchema)} type={type} className="input input-bordered w-full input-primary" />
      {errors && errors[name]?.type === "required" && (
        <span className="text-red-500">{errors[name]?.message}</span>
      )}
    </div>
  );
}
