import { IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import {
  PrismaTaskRepository,
  TaskData,
} from "@/src/backend/infra/adapters/task.repository";

export class ListTasksUseCase {
  constructor(
    private taskRepository: TaskRepositoryInterface<TaskData> = new PrismaTaskRepository()
  ) {}

  async execute(userId: number): Promise<IResponse<ITask[]>> {
    const tasks: ITask[] = await this.taskRepository.findAllByUser(userId);

    return {
      ok: true,
      data: tasks,
    };
  }
}
