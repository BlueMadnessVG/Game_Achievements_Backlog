import { z } from "zod";

export const schema = z
  .object({
    userName: z.string().min(1, "User name is required"),
    email: z.string().email("Invalid Email").min(1, "Email is required"),
    password: z.string().min(5, "Password have to be longer than 5 characters"),
    confirmPassword: z
      .string()
      .min(5, "Password confirmation have to be longer than 5 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Invalid Passwords",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof schema>;
