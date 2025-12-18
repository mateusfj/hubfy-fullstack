import { ApiListResponse, IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import { TaskRepositoryInterface } from "@/src/backend/ports/repositories/task.repository.interface";
import { TaskData } from "@/src/backend/infra/adapters/task.repository";
import { ListTasksQuerySchema } from "@/src/validators/task.schema";

export class ListTasksUseCase {
  constructor(private taskRepository: TaskRepositoryInterface<TaskData>) {}

  async execute(
    userId: number,
    params: ListTasksQuerySchema = {}
  ): Promise<IResponse<ApiListResponse<"tasks", ITask>>> {
    const { tasks, total } = await this.taskRepository.findAllByUser(
      userId,
      params
    );

    return {
      ok: true,
      data: {
        tasks,
        meta: {
          total,
        },
      },
    };
  }
}
