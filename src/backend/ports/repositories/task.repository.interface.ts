import { ITask } from "@/src/types/ITask";
import { ListTasksQuerySchema } from "@/src/validators/task.schema";

export type ListTasksRepositoryResult = {
  tasks: ITask[];
  total: number;
};

export interface TaskRepositoryInterface<T> {
  findOne: (id: string) => Promise<ITask | null>;
  findAll: () => Promise<ITask[]>;
  findAllByUser: (
    userId: number,
    filters: ListTasksQuerySchema
  ) => Promise<ListTasksRepositoryResult>;
  create: (data: T) => Promise<ITask>;
  update: (id: string, data: T) => Promise<ITask>;
  delete: (id: string) => Promise<void>;
}
