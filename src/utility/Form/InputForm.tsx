import "./InputForm.css";
import { FormValues } from "../../models";
import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

function InputForm({ name, control, label, type, error }: Props) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`from-control ${error && "isInvalid"}`}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

export default InputForm;
