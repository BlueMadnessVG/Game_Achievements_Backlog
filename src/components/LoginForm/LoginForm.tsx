import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "../../models";
import { InputForm } from "../../utility/Form";

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        name="userName"
        control={control}
        label="UserName"
        type="text"
        error={errors.userName}
      />
      <InputForm
        name="email"
        control={control}
        label="Email"
        type="email"
        error={errors.email}
      />
      <InputForm
        name="password"
        control={control}
        label="Password"
        type="password"
        error={errors.password}
      />
      <InputForm
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword}
      />
      <button type="submit"> Submit </button>
    </form>
  );
}

export default LoginForm;
