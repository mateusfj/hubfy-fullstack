import { z } from "zod";

import { TaskStatus } from "@/src/types/ITask";
import { querySchema } from "./query.schema";

export const createTaskSchema = z.object({
  userId: z.number().int().positive(),
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
  status: z.enum(TaskStatus, { message: "Campo obrigatório" }),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

export type ResponseTaskSchema = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

export const listTasksQuerySchema = querySchema.extend({
  status: z.enum(TaskStatus).optional(),
});

export type ListTasksQuerySchema = z.infer<typeof listTasksQuerySchema>;
