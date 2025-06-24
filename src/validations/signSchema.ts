import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, introduce una dirección de email válida." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Por favor, introduce una dirección de email válida.",
      }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
