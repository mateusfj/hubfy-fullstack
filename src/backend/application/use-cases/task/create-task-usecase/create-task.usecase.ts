import { IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import {
  PrismaTaskRepository,
  TaskData,
} from "@/src/backend/infra/adapters/task.repository";
import { CreateTaskSchema } from "@/src/validators/task.schema";

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskRepositoryInterface<TaskData> = new PrismaTaskRepository()
  ) {}

  async execute(data: CreateTaskSchema): Promise<IResponse<ITask>> {
    const task: ITask = await this.taskRepository.create({
      userId: data.userId,
      title: data.title,
      description: data.description,
      status: data.status,
    });

    return {
      ok: true,
      data: task,
    };
  }
}
