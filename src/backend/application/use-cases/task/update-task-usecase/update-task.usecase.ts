import { IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import {
  PrismaTaskRepository,
  TaskData,
} from "@/src/backend/infra/adapters/task.repository";
import { UpdateTaskSchema } from "@/src/validators/task.schema";
import { NotFoundError } from "@/src/backend/shared/errors/error";

export class UpdateTaskUseCase {
  constructor(
    private taskRepository: TaskRepositoryInterface<TaskData> = new PrismaTaskRepository()
  ) {}

  async execute(id: string, data: UpdateTaskSchema): Promise<IResponse<ITask>> {
    const existingTask: ITask | null = await this.taskRepository.findOne(id);

    if (!existingTask) {
      throw new NotFoundError("Tarefa não encontrada");
    }

    const updatedTask: ITask = await this.taskRepository.update(id, {
      userId: Number(existingTask.userId),
      title: data.title ?? existingTask.title,
      description: data.description ?? existingTask.description,
      status: data.status ?? existingTask.status,
    });

    return {
      ok: true,
      data: updatedTask,
    };
  }
}
