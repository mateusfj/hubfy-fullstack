import { IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import {
  PrismaTaskRepository,
  TaskData,
} from "@/src/backend/infra/adapters/task.repository";
import { NotFoundError } from "@/src/backend/shared/errors/error";

export class GetTaskUseCase {
  constructor(
    private taskRepository: TaskRepositoryInterface<TaskData> = new PrismaTaskRepository()
  ) {}

  async execute(id: string): Promise<IResponse<ITask>> {
    const task: ITask | null = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundError("Tarefa não encontrada");
    }

    return {
      ok: true,
      data: task,
    };
  }
}
