import { z } from "zod";

import { TaskStatus } from "@/src/types/ITask";

export const createTaskSchema = z.object({
  userId: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional().default(TaskStatus.PENDING),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
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
