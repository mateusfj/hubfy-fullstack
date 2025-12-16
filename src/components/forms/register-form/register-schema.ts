"use client";
import { z } from "zod";

export const registerSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    email: z.email("E-mail inválido"),
    name: z.string().min(1, "Nome é obrigatório"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;
