import { NextResponse } from "next/server";

import {
  ErrorMapperResponse,
  mapError,
} from "@/src/backend/shared/errors/error-mapper";
import { IResponse } from "@/src/types/Response/IResponse";
import { ITask } from "@/src/types/ITask";
import {
  CreateTaskSchema,
  createTaskSchema,
} from "@/src/validators/task.schema";
import { CreateTaskUseCase } from "@/src/backend/application/use-cases/task/create-task-usecase/create-task.usecase";
import { ListTasksUseCase } from "@/src/backend/application/use-cases/task/list-tasks-usecase/list-tasks.usecase";
import { authGuard } from "@/src/backend/infra/auth/guard/auth-guard";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await authGuard(req);

    const body = await req.json();

    const data: CreateTaskSchema = createTaskSchema.parse(body);

    const createTaskUseCase = new CreateTaskUseCase();

    const response: IResponse<ITask> = await createTaskUseCase.execute(data);

    return NextResponse.json({
      message: "Tarefa criada com sucesso",
      task: response.data,
    });
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const userId: number = authGuard(req);

    const listTasksUseCase = new ListTasksUseCase();
    const response: IResponse<ITask[]> = await listTasksUseCase.execute(
      Number(userId)
    );

    return NextResponse.json({
      tasks: response.data,
    });
  } catch (error: unknown) {
    const mappedError: ErrorMapperResponse = mapError(error);

    return NextResponse.json(mappedError.body, {
      status: mappedError.statusCode,
    });
  }
}
