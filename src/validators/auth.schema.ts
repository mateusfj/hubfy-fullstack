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
