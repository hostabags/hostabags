import { z } from "zod";

export const createHostSchema = z.object({
  email: z.string().email({ message: "Email inválido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string(),
  ownerName: z.string().min(3, { message: "El nombre del propietario es requerido." }),
  ownerSurname: z.string().optional(),
  hostName: z.string().min(3, { message: "El nombre del establecimiento es requerido." }),
  address: z.string().min(1, { message: "La dirección es requerida." }),
  description: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

export type CreateHostSchema = z.infer<typeof createHostSchema>; 