import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export type ResponseRegisterSchema = {
  id: number;
  name: string;
  email: string;
};

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type ResponseLoginSchema = {
  id: number;
  name: string;
  email: string;
  token: string;
};
