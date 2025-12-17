import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import {
  PrismaTaskRepository,
  TaskData,
} from "@/src/backend/infra/adapters/task.repository";
import { NotFoundError } from "@/src/backend/shared/errors/error";
import { ITask } from "@/src/types/ITask";

export class DeleteTaskUseCase {
  constructor(
    private taskRepository: TaskRepositoryInterface<TaskData> = new PrismaTaskRepository()
  ) {}

  async execute(id: string): Promise<void> {
    const existingTask: ITask | null = await this.taskRepository.findOne(id);

    if (!existingTask) {
      throw new NotFoundError("Tarefa não encontrada");
    }

    await this.taskRepository.delete(id);
  }
}
