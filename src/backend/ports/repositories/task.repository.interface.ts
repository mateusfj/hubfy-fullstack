import { ITask } from "@/src/types/ITask";

export interface TaskRepositoryInterface<T> {
  findOne: (id: string) => Promise<ITask | null>;
  findAll: () => Promise<ITask[]>;
  findAllByUser: (userId: number) => Promise<ITask[]>;
  create: (data: T) => Promise<ITask>;
  update: (id: string, data: T) => Promise<ITask>;
  delete: (id: string) => Promise<void>;
}
